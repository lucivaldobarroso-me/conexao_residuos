create table if not exists public.rss_history (
  id text primary key,
  client_id text not null,
  timestamp bigint not null,
  action text not null,
  description text not null,
  icon text not null,
  color text,
  target_tab text,
  target_group_id text check (target_group_id in ('A', 'B', 'C', 'D', 'E')),
  created_at timestamptz not null default now()
);

create index if not exists rss_history_client_timestamp_idx
  on public.rss_history (client_id, timestamp desc);

alter table public.rss_history enable row level security;

revoke all on table public.rss_history from anon;
revoke all on table public.rss_history from authenticated;

drop policy if exists "Allow anonymous history sync" on public.rss_history;

create table if not exists public.questions (
  id serial primary key,
  title varchar(255) not null,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  correct_option char(1) not null check (correct_option in ('A', 'B', 'C')),
  explanation text not null
);

alter table public.questions enable row level security;

drop policy if exists "Allow anonymous question reads" on public.questions;

create policy "Allow anonymous question reads"
  on public.questions
  for select
  to anon
  using (true);

create unique index if not exists questions_title_key
  on public.questions (title);

create table if not exists public.quiz_participants (
  id uuid primary key default gen_random_uuid(),
  participant_name text not null,
  profession text not null,
  cpf_mask text not null,
  cpf_hash text not null unique,
  attempt_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.quiz_participants(id) on delete cascade,
  question_count integer not null check (question_count > 0),
  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions > 0),
  percentage integer not null check (percentage >= 0 and percentage <= 100),
  duration_seconds integer not null check (duration_seconds >= 0),
  completed_at timestamptz not null default now()
);

create index if not exists quiz_attempts_ranking_idx
  on public.quiz_attempts (
    question_count,
    percentage desc,
    score desc,
    duration_seconds asc,
    completed_at asc
  );

alter table public.quiz_participants enable row level security;
alter table public.quiz_attempts enable row level security;

revoke all on table public.quiz_participants from anon;
revoke all on table public.quiz_participants from authenticated;
revoke all on table public.quiz_attempts from anon;
revoke all on table public.quiz_attempts from authenticated;

drop policy if exists "Allow anonymous participant reads" on public.quiz_participants;
drop policy if exists "Allow anonymous participant inserts" on public.quiz_participants;
drop policy if exists "Allow anonymous participant updates" on public.quiz_participants;
drop policy if exists "Allow anonymous attempt reads" on public.quiz_attempts;
drop policy if exists "Allow anonymous attempt inserts" on public.quiz_attempts;

create or replace function public.get_quiz_public_stats()
returns table (
  participant_count bigint,
  attempt_count bigint,
  average_percentage integer,
  most_used_question_count integer
)
language sql
stable
security definer
set search_path = public
as $$
  with top_mode as (
    select question_count
    from public.quiz_attempts
    group by question_count
    order by count(*) desc, question_count asc
    limit 1
  )
  select
    (select count(*) from public.quiz_participants) as participant_count,
    (select count(*) from public.quiz_attempts) as attempt_count,
    coalesce((select round(avg(percentage))::integer from public.quiz_attempts), 0) as average_percentage,
    (select question_count from top_mode) as most_used_question_count;
$$;

grant execute on function public.get_quiz_public_stats() to anon;
grant execute on function public.get_quiz_public_stats() to authenticated;

create or replace function public.find_quiz_participant_by_cpf_hash(p_cpf_hash text)
returns table (
  id uuid,
  participant_name text,
  profession text,
  cpf_mask text,
  attempt_count integer
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if p_cpf_hash !~ '^[a-f0-9]{64}$' then
    return;
  end if;

  return query
  select
    qp.id,
    qp.participant_name,
    qp.profession,
    qp.cpf_mask,
    qp.attempt_count
  from public.quiz_participants qp
  where qp.cpf_hash = p_cpf_hash
  limit 1;
end;
$$;

create or replace function public.create_quiz_participant(
  p_participant_name text,
  p_profession text,
  p_cpf_mask text,
  p_cpf_hash text
)
returns table (
  id uuid,
  participant_name text,
  profession text,
  cpf_mask text,
  attempt_count integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  safe_name text := left(trim(p_participant_name), 120);
  safe_profession text := left(trim(p_profession), 80);
begin
  if safe_name = '' or safe_profession = '' then
    raise exception 'Nome e profissao sao obrigatorios.';
  end if;

  if p_cpf_mask !~ '^[0-9]{3}\.\*\*\*\.\*\*\*-[0-9]{2}$' or p_cpf_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'CPF invalido.';
  end if;

  return query
  select
    qp.id,
    qp.participant_name,
    qp.profession,
    qp.cpf_mask,
    qp.attempt_count
  from public.quiz_participants qp
  where qp.cpf_hash = p_cpf_hash
  limit 1;

  if found then
    return;
  end if;

  return query
  insert into public.quiz_participants (
    participant_name,
    profession,
    cpf_mask,
    cpf_hash
  )
  values (
    safe_name,
    safe_profession,
    p_cpf_mask,
    p_cpf_hash
  )
  returning
    quiz_participants.id,
    quiz_participants.participant_name,
    quiz_participants.profession,
    quiz_participants.cpf_mask,
    quiz_participants.attempt_count;
end;
$$;

create or replace function public.save_quiz_attempt(
  p_participant_id uuid,
  p_question_count integer,
  p_score integer,
  p_total_questions integer,
  p_percentage integer,
  p_duration_seconds integer
)
returns table (
  id uuid,
  participant_name text,
  profession text,
  cpf_mask text,
  attempt_count integer
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_question_count <= 0
    or p_total_questions <= 0
    or p_score < 0
    or p_score > p_total_questions
    or p_percentage < 0
    or p_percentage > 100
    or p_duration_seconds < 0
  then
    raise exception 'Resultado invalido.';
  end if;

  if not exists (
    select 1
    from public.quiz_participants qp
    where qp.id = p_participant_id
  ) then
    raise exception 'Participante nao encontrado.';
  end if;

  insert into public.quiz_attempts (
    participant_id,
    question_count,
    score,
    total_questions,
    percentage,
    duration_seconds
  )
  values (
    p_participant_id,
    p_question_count,
    p_score,
    p_total_questions,
    p_percentage,
    p_duration_seconds
  );

  return query
  update public.quiz_participants qp
  set
    attempt_count = qp.attempt_count + 1,
    updated_at = now()
  where qp.id = p_participant_id
  returning
    qp.id,
    qp.participant_name,
    qp.profession,
    qp.cpf_mask,
    qp.attempt_count;
end;
$$;

create or replace function public.get_quiz_leaderboard(
  p_question_count integer,
  p_limit integer default 10
)
returns table (
  id uuid,
  participant_name text,
  profession text,
  cpf_mask text,
  score integer,
  total_questions integer,
  percentage integer,
  duration_seconds integer,
  completed_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  safe_limit integer := least(greatest(coalesce(p_limit, 10), 1), 50);
begin
  if p_question_count <= 0 then
    return;
  end if;

  return query
  select
    qa.id,
    qp.participant_name,
    qp.profession,
    qp.cpf_mask,
    qa.score,
    qa.total_questions,
    qa.percentage,
    qa.duration_seconds,
    qa.completed_at
  from public.quiz_attempts qa
  join public.quiz_participants qp on qp.id = qa.participant_id
  where qa.question_count = p_question_count
  order by
    qa.percentage desc,
    qa.score desc,
    qa.duration_seconds asc,
    qa.completed_at asc
  limit safe_limit;
end;
$$;

grant execute on function public.find_quiz_participant_by_cpf_hash(text) to anon;
grant execute on function public.find_quiz_participant_by_cpf_hash(text) to authenticated;
grant execute on function public.create_quiz_participant(text, text, text, text) to anon;
grant execute on function public.create_quiz_participant(text, text, text, text) to authenticated;
grant execute on function public.save_quiz_attempt(uuid, integer, integer, integer, integer, integer) to anon;
grant execute on function public.save_quiz_attempt(uuid, integer, integer, integer, integer, integer) to authenticated;
grant execute on function public.get_quiz_leaderboard(integer, integer) to anon;
grant execute on function public.get_quiz_leaderboard(integer, integer) to authenticated;
