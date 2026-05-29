-- Posts table for the press/news/blog system
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null,
  post_type text not null check (post_type in ('press_release', 'article', 'spotlight', 'event_recap')),
  cover_image_url text,
  author text default 'Sultanate of Amexem',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);
create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_type_idx on public.posts (post_type);

-- Auto-update updated_at on row updates
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

-- Row Level Security: public can read only published posts
alter table public.posts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

-- Authenticated users (admin) can do everything
drop policy if exists "Authenticated can manage posts" on public.posts;
create policy "Authenticated can manage posts"
  on public.posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
