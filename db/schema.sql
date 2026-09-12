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

CREATE TABLE IF NOT EXISTS price_list (
  id          text PRIMARY KEY,
  description text NOT NULL,
  unit_price  numeric(10,2) NOT NULL,
  category    text NOT NULL DEFAULT 'General',
  sort_order  integer NOT NULL DEFAULT 0,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS price_list_sort_idx ON price_list (sort_order, description);

INSERT INTO price_list (id, description, unit_price, category, sort_order) VALUES
  ('pl_faucet', 'Faucet replacement', 175, 'Plumbing', 10),
  ('pl_toilet', 'Toilet repair or replacement', 285, 'Plumbing', 20),
  ('pl_drain', 'Drain clearing', 145, 'Plumbing', 30),
  ('pl_leak', 'Leak detection and repair', 195, 'Plumbing', 40),
  ('pl_shutoff', 'Shut-off valve replacement', 165, 'Plumbing', 50),
  ('el_outlet', 'Outlet / switch replacement', 120, 'Electrical', 10),
  ('el_fan', 'Ceiling fan installation', 175, 'Electrical', 20),
  ('el_light', 'Light fixture installation', 85, 'Electrical', 30),
  ('el_gfci', 'GFCI outlet installation', 145, 'Electrical', 40),
  ('el_doorbell', 'Doorbell / smart switch', 125, 'Electrical', 50),
  ('ca_door', 'Interior door replacement', 320, 'Carpentry', 10),
  ('ca_cabinet', 'Cabinet repair', 185, 'Carpentry', 20),
  ('ca_trim', 'Crown molding / trim (per 10 ft)', 240, 'Carpentry', 30),
  ('ca_shelf', 'Custom shelving / built-in', 195, 'Carpentry', 40),
  ('dw_patch', 'Drywall patch (under 4 sq ft)', 225, 'Drywall', 10),
  ('dw_texture', 'Texture matching', 95, 'Drywall', 20),
  ('dw_paint', 'Interior paint (small room)', 350, 'Drywall', 30),
  ('dw_caulk', 'Bathroom / kitchen caulking', 145, 'Drywall', 40),
  ('fl_tile', 'Tile repair', 220, 'Flooring', 10),
  ('fl_lvp', 'LVP plank replacement', 165, 'Flooring', 20),
  ('fl_sub', 'Subfloor repair', 240, 'Flooring', 30),
  ('fe_board', 'Fence board replacement (each)', 65, 'Fence & Gate', 10),
  ('fe_post', 'Fence post replacement', 185, 'Fence & Gate', 20),
  ('fe_gate', 'Gate alignment and hardware', 220, 'Fence & Gate', 30),
  ('tv_mount', 'TV mounting (standard, drywall)', 185, 'TV & Smart Home', 10),
  ('tv_cords', 'In-wall cord concealment', 95, 'TV & Smart Home', 20),
  ('tv_camera', 'Doorbell camera install', 105, 'TV & Smart Home', 30),
  ('as_ikea', 'Furniture assembly', 120, 'Assembly', 10),
  ('as_bed', 'Bed frame assembly', 95, 'Assembly', 20),
  ('pw_drive', 'Driveway / sidewalk wash', 175, 'Pressure Washing', 10),
  ('pw_house', 'House exterior wash', 280, 'Pressure Washing', 20),
  ('mn_weather', 'Weatherstripping (per door)', 120, 'Maintenance', 10),
  ('mn_gutter', 'Gutter cleaning', 165, 'Maintenance', 20),
  ('mn_filter', 'AC filter replacement', 45, 'Maintenance', 30),
  ('mn_trip', 'Trip / diagnostic fee (credited if booked)', 49, 'General', 10)
ON CONFLICT (id) DO NOTHING;

