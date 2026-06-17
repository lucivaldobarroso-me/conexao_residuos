revoke all on table public.quiz_participants from anon;
revoke all on table public.quiz_participants from authenticated;
revoke all on table public.quiz_attempts from anon;
revoke all on table public.quiz_attempts from authenticated;

drop policy if exists "Allow anonymous participant reads" on public.quiz_participants;
drop policy if exists "Allow anonymous participant inserts" on public.quiz_participants;
drop policy if exists "Allow anonymous participant updates" on public.quiz_participants;
drop policy if exists "Allow anonymous attempt reads" on public.quiz_attempts;
drop policy if exists "Allow anonymous attempt inserts" on public.quiz_attempts;

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
