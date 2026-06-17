create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

revoke all on table public.admin_users from anon;
revoke all on table public.admin_users from authenticated;

create or replace function public.is_current_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
  );
$$;

create or replace function public.get_admin_dashboard()
returns table (
  participant_count bigint,
  attempt_count bigint,
  average_percentage integer,
  average_duration_seconds integer,
  best_percentage integer
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_current_admin() then
    raise exception 'Acesso negado.';
  end if;

  return query
  select
    count(distinct qp.id) as participant_count,
    count(qa.id) as attempt_count,
    coalesce(round(avg(qa.percentage))::integer, 0) as average_percentage,
    coalesce(round(avg(qa.duration_seconds))::integer, 0) as average_duration_seconds,
    coalesce(max(qa.percentage), 0) as best_percentage
  from public.quiz_participants qp
  left join public.quiz_attempts qa on qa.participant_id = qp.id;
end;
$$;

create or replace function public.get_admin_participants(p_limit integer default 200)
returns table (
  id uuid,
  participant_name text,
  profession text,
  cpf_mask text,
  attempt_count integer,
  created_at timestamptz,
  updated_at timestamptz,
  last_attempt_at timestamptz,
  best_percentage integer
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  safe_limit integer := least(greatest(coalesce(p_limit, 200), 1), 1000);
begin
  if not public.is_current_admin() then
    raise exception 'Acesso negado.';
  end if;

  return query
  select
    qp.id,
    qp.participant_name,
    qp.profession,
    qp.cpf_mask,
    qp.attempt_count,
    qp.created_at,
    qp.updated_at,
    max(qa.completed_at) as last_attempt_at,
    max(qa.percentage) as best_percentage
  from public.quiz_participants qp
  left join public.quiz_attempts qa on qa.participant_id = qp.id
  group by qp.id
  order by qp.updated_at desc, qp.created_at desc
  limit safe_limit;
end;
$$;

create or replace function public.get_admin_attempts(p_limit integer default 500)
returns table (
  id uuid,
  participant_name text,
  profession text,
  cpf_mask text,
  question_count integer,
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
  safe_limit integer := least(greatest(coalesce(p_limit, 500), 1), 2000);
begin
  if not public.is_current_admin() then
    raise exception 'Acesso negado.';
  end if;

  return query
  select
    qa.id,
    qp.participant_name,
    qp.profession,
    qp.cpf_mask,
    qa.question_count,
    qa.score,
    qa.total_questions,
    qa.percentage,
    qa.duration_seconds,
    qa.completed_at
  from public.quiz_attempts qa
  join public.quiz_participants qp on qp.id = qa.participant_id
  order by qa.completed_at desc
  limit safe_limit;
end;
$$;

grant execute on function public.is_current_admin() to authenticated;
grant execute on function public.get_admin_dashboard() to authenticated;
grant execute on function public.get_admin_participants(integer) to authenticated;
grant execute on function public.get_admin_attempts(integer) to authenticated;
