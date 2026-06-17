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
