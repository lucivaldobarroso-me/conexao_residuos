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
