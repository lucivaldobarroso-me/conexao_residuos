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
