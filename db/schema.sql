-- Houston Handy Pros — Neon Postgres schema
-- Applied automatically on first request when DATABASE_URL is set.
-- You can also run this in the Neon SQL Editor.

CREATE TABLE IF NOT EXISTS bookings (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service          text NOT NULL,
  description      text,
  preferred_date   date,
  preferred_time   text,
  address          text,
  customer_name    text NOT NULL,
  customer_email   text NOT NULL,
  customer_phone   text,
  is_emergency     boolean DEFAULT false,
  status           text NOT NULL DEFAULT 'new'
                     CHECK (status IN ('new','scheduled','in_progress','complete','cancelled')),
  assigned_tech    text,
  notes            text,
  amount           numeric(10,2),
  source           text DEFAULT 'book',
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customers (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL,
  email            text UNIQUE NOT NULL,
  phone            text,
  address          text,
  neighborhood     text,
  maintenance_plan text CHECK (maintenance_plan IN ('none','essential','pro','property_manager')),
  notes            text,
  created_at       timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  email      text NOT NULL,
  phone      text,
  service    text,
  message    text NOT NULL,
  source     text DEFAULT 'contact',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bookings_status_idx     ON bookings (status);
CREATE INDEX IF NOT EXISTS bookings_email_idx      ON bookings (customer_email);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS customers_email_idx     ON customers (email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx    ON contact_messages (created_at DESC);
