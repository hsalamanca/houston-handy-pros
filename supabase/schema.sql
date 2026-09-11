-- Houston Handy Pros — Supabase Schema
-- 1. Restore the paused project: https://supabase.com/dashboard/project/ajgmichfufztwwypepax
-- 2. Run this entire file in the SQL Editor
-- Public forms INSERT via the API using SUPABASE_SERVICE_ROLE_KEY (never the anon key in the browser).

-- ─── BOOKINGS ────────────────────────────────────────────────────────────────
create table if not exists public.bookings (
  id               uuid primary key default gen_random_uuid(),
  service          text not null,
  description      text,
  preferred_date   date,
  preferred_time   text,
  address          text,
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text,
  is_emergency     boolean default false,
  status           text not null default 'new'
                     check (status in ('new','scheduled','in_progress','complete','cancelled')),
  assigned_tech    text,
  notes            text,
  amount           numeric(10,2),
  source           text default 'book',
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

alter table public.bookings add column if not exists source text default 'book';

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at
  before update on public.bookings
  for each row execute procedure public.set_updated_at();

-- ─── CUSTOMERS ───────────────────────────────────────────────────────────────
create table if not exists public.customers (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text unique not null,
  phone            text,
  address          text,
  neighborhood     text,
  maintenance_plan text check (maintenance_plan in ('none','essential','pro','property_manager')),
  notes            text,
  created_at       timestamptz default now()
);

-- ─── CONTACT MESSAGES ────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  service    text,
  message    text not null,
  source     text default 'contact',
  created_at timestamptz default now()
);

alter table public.contact_messages add column if not exists source text default 'contact';

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────
alter table public.bookings enable row level security;
alter table public.customers enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can create a booking" on public.bookings;
drop policy if exists "Anyone can create a contact message" on public.contact_messages;

create policy "Anyone can create a booking"
  on public.bookings for insert
  with check (true);

create policy "Anyone can create a contact message"
  on public.contact_messages for insert
  with check (true);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────
create index if not exists bookings_status_idx      on public.bookings (status);
create index if not exists bookings_email_idx       on public.bookings (customer_email);
create index if not exists bookings_created_at_idx  on public.bookings (created_at desc);
create index if not exists customers_email_idx      on public.customers (email);
create index if not exists leads_created_at_idx     on public.contact_messages (created_at desc);
