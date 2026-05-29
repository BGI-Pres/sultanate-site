-- Safe migration: adds missing columns to existing posts table
-- Run this if you got "column 'published_at' does not exist" from the first migration

-- Add columns one at a time, only if they don't exist
alter table public.posts add column if not exists slug text;
alter table public.posts add column if not exists title text;
alter table public.posts add column if not exists excerpt text;
alter table public.posts add column if not exists body text;
alter table public.posts add column if not exists post_type text;
alter table public.posts add column if not exists cover_image_url text;
alter table public.posts add column if not exists author text default 'Sultanate of Amexem';
alter table public.posts add column if not exists published boolean not null default false;
alter table public.posts add column if not exists published_at timestamptz;
alter table public.posts add column if not exists created_at timestamptz not null default now();
alter table public.posts add column if not exists updated_at timestamptz not null default now();

-- Add unique constraint on slug (only if not already)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'posts_slug_key'
  ) then
    alter table public.posts add constraint posts_slug_key unique (slug);
  end if;
end$$;

-- Add check constraint on post_type (drop and recreate to ensure latest values)
alter table public.posts drop constraint if exists posts_post_type_check;
alter table public.posts add constraint posts_post_type_check
  check (post_type in ('press_release', 'article', 'spotlight', 'event_recap'));

-- Indexes
create index if not exists posts_published_idx on public.posts (published, published_at desc);
create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_type_idx on public.posts (post_type);

-- Auto-update updated_at trigger
create or replace function public.posts_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_updated_at_trigger on public.posts;
create trigger posts_updated_at_trigger
  before update on public.posts
  for each row execute function public.posts_set_updated_at();

-- RLS
alter table public.posts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

drop policy if exists "Authenticated can manage posts" on public.posts;
create policy "Authenticated can manage posts"
  on public.posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
