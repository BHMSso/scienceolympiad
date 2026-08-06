-- ============================================================
-- BHMS SCI OLY — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- QUESTIONS ---------------------------------------------------
create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event_name text,
  question text not null,
  answer text,
  answered boolean not null default false,
  created_at timestamptz not null default now(),
  answered_at timestamptz
);

alter table questions enable row level security;

-- Anyone can submit a question
create policy "Public can insert questions"
  on questions for insert
  to anon
  with check (true);

-- Anyone can read questions (site filters to answered=true on the public page;
-- admin page reads all questions, but only the admin can log in to see that page)
create policy "Public can read questions"
  on questions for select
  to anon
  using (true);

-- Only logged-in users can update (i.e. answer) questions
create policy "Authenticated can update questions"
  on questions for update
  to authenticated
  using (true)
  with check (true);


-- RESOURCES -----------------------------------------------------
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null,
  title text not null,
  type text not null default 'text', -- 'text' | 'pdf' | 'image'
  description text,
  file_url text,
  created_at timestamptz not null default now()
);

alter table resources enable row level security;

create policy "Public can read resources"
  on resources for select
  to anon
  using (true);

create policy "Authenticated can insert resources"
  on resources for insert
  to authenticated
  with check (true);

create policy "Authenticated can delete resources"
  on resources for delete
  to authenticated
  using (true);

-- ============================================================
-- STORAGE BUCKET
-- Do this part in the dashboard, not SQL:
-- Storage → New bucket → name it exactly "resources" → toggle "Public bucket" ON
-- ============================================================

-- Storage policies (run after creating the bucket above)
create policy "Public can view resource files"
  on storage.objects for select
  to anon
  using (bucket_id = 'resources');

create policy "Authenticated can upload resource files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'resources');
