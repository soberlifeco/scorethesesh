-- All Seshed Out: run this once in the Supabase SQL editor.
-- Both tables have row level security ON with NO policies, so only the
-- server (service role key) can read or write them. The browser can't.

create table if not exists public.seshed_out_purchases (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  stripe_session_id text not null unique,
  amount_total integer,
  currency text,
  customer_name text,
  shipping_name text,
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

create index if not exists seshed_out_purchases_email_idx
  on public.seshed_out_purchases (email);

alter table public.seshed_out_purchases enable row level security;

create table if not exists public.seshed_out_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  task_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, task_id)
);

alter table public.seshed_out_progress enable row level security;

-- Also create a PRIVATE Storage bucket named: seshed-out-videos
-- (Storage -> New bucket -> leave "Public bucket" OFF), then upload:
--   intro.mp4, deep-dive-1.mp4, deep-dive-2.mp4, deep-dive-3.mp4, survival-guide.pdf
