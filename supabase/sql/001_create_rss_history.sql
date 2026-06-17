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
