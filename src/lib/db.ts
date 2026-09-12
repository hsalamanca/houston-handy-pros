import { neon } from '@neondatabase/serverless';
import type { Booking, BookingStatus, Customer, Lead, PriceListItem } from '@/lib/types';
import { parseQuoteItems, quoteTotal } from '@/lib/quote';
import { clip } from '@/lib/html';
import { mapPriceItem } from '@/lib/price-list';

export type { Booking, BookingStatus, Customer, Lead, PriceListItem };

export function databaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.NEON_DATABASE_URL
  );
}

export function dbConfigured(): boolean {
  return Boolean(databaseUrl());
}

export class DbError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = 'DbError';
    this.status = status;
  }
}

function sql() {
  const url = databaseUrl();
  if (!url) throw new DbError('DATABASE_NOT_CONFIGURED', 503);
  return neon(url, { fetchOptions: { cache: 'no-store' } });
}

let schemaReady: Promise<void> | null = null;

async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = applySchema().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

const PRICE_SEED: Array<[string, string, number, string, number]> = [
  ['pl_faucet', 'Faucet replacement', 175, 'Plumbing', 10],
  ['pl_toilet', 'Toilet repair or replacement', 285, 'Plumbing', 20],
  ['pl_drain', 'Drain clearing', 145, 'Plumbing', 30],
  ['pl_leak', 'Leak detection and repair', 195, 'Plumbing', 40],
  ['pl_shutoff', 'Shut-off valve replacement', 165, 'Plumbing', 50],
  ['el_outlet', 'Outlet / switch replacement', 120, 'Electrical', 10],
  ['el_fan', 'Ceiling fan installation', 175, 'Electrical', 20],
  ['el_light', 'Light fixture installation', 85, 'Electrical', 30],
  ['el_gfci', 'GFCI outlet installation', 145, 'Electrical', 40],
  ['el_doorbell', 'Doorbell / smart switch', 125, 'Electrical', 50],
  ['ca_door', 'Interior door replacement', 320, 'Carpentry', 10],
  ['ca_cabinet', 'Cabinet repair', 185, 'Carpentry', 20],
  ['ca_trim', 'Crown molding / trim (per 10 ft)', 240, 'Carpentry', 30],
  ['ca_shelf', 'Custom shelving / built-in', 195, 'Carpentry', 40],
  ['dw_patch', 'Drywall patch (under 4 sq ft)', 225, 'Drywall', 10],
  ['dw_texture', 'Texture matching', 95, 'Drywall', 20],
  ['dw_paint', 'Interior paint (small room)', 350, 'Drywall', 30],
  ['dw_caulk', 'Bathroom / kitchen caulking', 145, 'Drywall', 40],
  ['fl_tile', 'Tile repair', 220, 'Flooring', 10],
  ['fl_lvp', 'LVP plank replacement', 165, 'Flooring', 20],
  ['fl_sub', 'Subfloor repair', 240, 'Flooring', 30],
  ['fe_board', 'Fence board replacement (each)', 65, 'Fence & Gate', 10],
  ['fe_post', 'Fence post replacement', 185, 'Fence & Gate', 20],
  ['fe_gate', 'Gate alignment and hardware', 220, 'Fence & Gate', 30],
  ['tv_mount', 'TV mounting (standard, drywall)', 185, 'TV & Smart Home', 10],
  ['tv_cords', 'In-wall cord concealment', 95, 'TV & Smart Home', 20],
  ['tv_camera', 'Doorbell camera install', 105, 'TV & Smart Home', 30],
  ['as_ikea', 'Furniture assembly', 120, 'Assembly', 10],
  ['as_bed', 'Bed frame assembly', 95, 'Assembly', 20],
  ['pw_drive', 'Driveway / sidewalk wash', 175, 'Pressure Washing', 10],
  ['pw_house', 'House exterior wash', 280, 'Pressure Washing', 20],
  ['mn_weather', 'Weatherstripping (per door)', 120, 'Maintenance', 10],
  ['mn_gutter', 'Gutter cleaning', 165, 'Maintenance', 20],
  ['mn_filter', 'AC filter replacement', 45, 'Maintenance', 30],
  ['mn_trip', 'Trip / diagnostic fee (credited if booked)', 49, 'General', 10],
];

async function applySchema(): Promise<void> {
  const q = sql();
  await q`
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
    )
  `;
  await q`
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
    )
  `;
  await q`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name       text NOT NULL,
      email      text NOT NULL,
      phone      text,
      service    text,
      message    text NOT NULL,
      source     text DEFAULT 'contact',
      created_at timestamptz DEFAULT now()
    )
  `;
  await q`CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings (status)`;
  await q`CREATE INDEX IF NOT EXISTS bookings_email_idx ON bookings (customer_email)`;
  await q`CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at DESC)`;
  await q`CREATE INDEX IF NOT EXISTS customers_email_idx ON customers (email)`;
  await q`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON contact_messages (created_at DESC)`;
  await q`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS quote_items jsonb NOT NULL DEFAULT '[]'::jsonb`;
  await q`ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS quote_items jsonb NOT NULL DEFAULT '[]'::jsonb`;
  await q`ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS quoted_amount numeric(10,2)`;
  await q`
    CREATE TABLE IF NOT EXISTS price_list (
      id          text PRIMARY KEY,
      description text NOT NULL,
      unit_price  numeric(10,2) NOT NULL,
      category    text NOT NULL DEFAULT 'General',
      sort_order  integer NOT NULL DEFAULT 0,
      updated_at  timestamptz NOT NULL DEFAULT now()
    )
  `;
  await q`CREATE INDEX IF NOT EXISTS price_list_sort_idx ON price_list (sort_order, description)`;
  for (const [id, description, unit_price, category, sort_order] of PRICE_SEED) {
    await q`
      INSERT INTO price_list (id, description, unit_price, category, sort_order)
      VALUES (${id}, ${description}, ${unit_price}, ${category}, ${sort_order})
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

function asBooking(row: Record<string, unknown>): Booking {
  return {
    id: String(row.id),
    service: String(row.service ?? ''),
    description: row.description == null ? null : String(row.description),
    preferred_date: row.preferred_date == null ? null : String(row.preferred_date).slice(0, 10),
    preferred_time: row.preferred_time == null ? null : String(row.preferred_time),
    address: row.address == null ? null : String(row.address),
    customer_name: String(row.customer_name ?? ''),
    customer_email: String(row.customer_email ?? ''),
    customer_phone: row.customer_phone == null ? null : String(row.customer_phone),
    is_emergency: Boolean(row.is_emergency),
    status: (row.status as BookingStatus) || 'new',
    assigned_tech: row.assigned_tech == null ? null : String(row.assigned_tech),
    notes: row.notes == null ? null : String(row.notes),
    amount: row.amount == null || row.amount === '' ? null : Number(row.amount),
    quote_items: parseQuoteItems(row.quote_items),
    source: row.source == null ? null : String(row.source),
    created_at: String(row.created_at ?? ''),
    updated_at: String(row.updated_at ?? row.created_at ?? ''),
  };
}

function asLead(row: Record<string, unknown>): Lead {
  return {
    id: String(row.id),
    name: String(row.name ?? ''),
    email: String(row.email ?? ''),
    phone: row.phone == null ? null : String(row.phone),
    service: row.service == null ? null : String(row.service),
    message: String(row.message ?? ''),
    source: row.source == null ? null : String(row.source),
    quote_items: parseQuoteItems(row.quote_items),
    quoted_amount: row.quoted_amount == null || row.quoted_amount === '' ? null : Number(row.quoted_amount),
    created_at: String(row.created_at ?? ''),
  };
}

function asCustomer(row: Record<string, unknown>): Customer {
  return {
    id: String(row.id),
    name: String(row.name ?? ''),
    email: String(row.email ?? ''),
    phone: row.phone == null ? null : String(row.phone),
    address: row.address == null ? null : String(row.address),
    neighborhood: row.neighborhood == null ? null : String(row.neighborhood),
    notes: row.notes == null ? null : String(row.notes),
    maintenance_plan: row.maintenance_plan == null ? null : String(row.maintenance_plan),
    created_at: String(row.created_at ?? ''),
  };
}

export async function probeDatabase(): Promise<{ ok: boolean; message: string }> {
  if (!dbConfigured()) {
    return {
      ok: false,
      message:
        'DATABASE_URL is not set. Connect Neon Postgres in Vercel → Storage for this project, then redeploy.',
    };
  }
  try {
    await ensureSchema();
    await sql()`SELECT 1`;
    return { ok: true, message: 'Connected to Neon' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown database error';
    return {
      ok: false,
      message: `Cannot reach Neon. Check DATABASE_URL on Vercel. ${message}`,
    };
  }
}

export async function listBookings(): Promise<Booking[]> {
  await ensureSchema();
  const rows = await sql()`SELECT * FROM bookings ORDER BY created_at DESC LIMIT 500`;
  return (rows as Record<string, unknown>[]).map(asBooking);
}

export async function getBooking(id: string): Promise<Booking | null> {
  await ensureSchema();
  try {
    const rows = await sql()`SELECT * FROM bookings WHERE id = ${id}::uuid LIMIT 1`;
    const row = (rows as Record<string, unknown>[])[0];
    return row ? asBooking(row) : null;
  } catch {
    return null;
  }
}

export async function listLeads(): Promise<Lead[]> {
  await ensureSchema();
  const rows = await sql()`SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 500`;
  return (rows as Record<string, unknown>[]).map(asLead);
}

export async function getLead(id: string): Promise<Lead | null> {
  await ensureSchema();
  try {
    const rows = await sql()`SELECT * FROM contact_messages WHERE id = ${id}::uuid LIMIT 1`;
    const row = (rows as Record<string, unknown>[])[0];
    return row ? asLead(row) : null;
  } catch {
    return null;
  }
}

export async function listCustomers(): Promise<Customer[]> {
  await ensureSchema();
  const rows = await sql()`SELECT * FROM customers ORDER BY created_at DESC LIMIT 500`;
  return (rows as Record<string, unknown>[]).map(asCustomer);
}

export async function insertBooking(input: {
  service: string;
  description: string;
  preferred_date: string;
  preferred_time: string;
  address: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  is_emergency: boolean;
  source?: string;
}): Promise<Booking> {
  await ensureSchema();
  const rows = await sql()`
    INSERT INTO bookings (
      service, description, preferred_date, preferred_time, address,
      customer_name, customer_email, customer_phone, is_emergency, source, status
    )
    VALUES (
      ${input.service},
      ${input.description || null},
      ${input.preferred_date || null},
      ${input.preferred_time || null},
      ${input.address || null},
      ${input.customer_name},
      ${input.customer_email},
      ${input.customer_phone || null},
      ${input.is_emergency},
      ${input.source || 'book'},
      'new'
    )
    RETURNING *
  `;
  const row = (rows as Record<string, unknown>[])[0];
  if (!row?.id) throw new DbError('Database save returned no row');
  return asBooking(row);
}

export async function insertLead(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
}): Promise<Lead | undefined> {
  await ensureSchema();
  const rows = await sql()`
    INSERT INTO contact_messages (name, email, phone, service, message, source)
    VALUES (
      ${input.name},
      ${input.email},
      ${input.phone || null},
      ${input.service || null},
      ${input.message},
      ${input.source || 'contact'}
    )
    RETURNING *
  `;
  const row = (rows as Record<string, unknown>[])[0];
  return row ? asLead(row) : undefined;
}

export async function upsertCustomer(input: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}): Promise<void> {
  await ensureSchema();
  await sql()`
    INSERT INTO customers (name, email, phone, address)
    VALUES (
      ${input.name},
      ${input.email},
      ${input.phone || null},
      ${input.address || null}
    )
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name,
      phone = COALESCE(EXCLUDED.phone, customers.phone),
      address = COALESCE(EXCLUDED.address, customers.address)
  `;
}

export async function updateBooking(
  id: string,
  patch: Partial<Pick<Booking, 'status' | 'notes' | 'assigned_tech' | 'amount' | 'quote_items'>>,
): Promise<Booking> {
  await ensureSchema();
  const items = patch.quote_items ? parseQuoteItems(patch.quote_items) : null;
  const itemsJson = items ? JSON.stringify(items) : null;
  const amount = items ? quoteTotal(items) : patch.amount ?? null;
  const rows = await sql()`
    UPDATE bookings SET
      status = COALESCE(${patch.status ?? null}, status),
      notes = COALESCE(${patch.notes ?? null}, notes),
      assigned_tech = COALESCE(${patch.assigned_tech ?? null}, assigned_tech),
      amount = COALESCE(${amount}, amount),
      quote_items = COALESCE(CAST(${itemsJson} AS jsonb), quote_items),
      updated_at = now()
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  const row = (rows as Record<string, unknown>[])[0];
  if (!row?.id) throw new DbError('Booking not found', 404);
  return asBooking(row);
}

export async function updateLead(
  id: string,
  patch: Partial<Pick<Lead, 'quote_items' | 'quoted_amount'>>,
): Promise<Lead> {
  await ensureSchema();
  const items = patch.quote_items ? parseQuoteItems(patch.quote_items) : null;
  const itemsJson = items ? JSON.stringify(items) : null;
  const amount = items ? quoteTotal(items) : patch.quoted_amount ?? null;
  const rows = await sql()`
    UPDATE contact_messages SET
      quote_items = COALESCE(CAST(${itemsJson} AS jsonb), quote_items),
      quoted_amount = COALESCE(${amount}, quoted_amount)
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  const row = (rows as Record<string, unknown>[])[0];
  if (!row?.id) throw new DbError('Lead not found', 404);
  return asLead(row);
}

export async function listPriceList(): Promise<PriceListItem[]> {
  await ensureSchema();
  const rows = await sql()`SELECT * FROM price_list ORDER BY category, sort_order, description`;
  return (rows as Record<string, unknown>[]).map(mapPriceItem);
}

export async function savePriceItem(item: {
  id?: string;
  description: string;
  unit_price: number;
  category: string;
  sort_order?: number;
}): Promise<PriceListItem> {
  await ensureSchema();
  const description = clip(item.description, 200);
  if (!description) throw new DbError('Description is required.', 400);
  const id = clip(item.id, 80) || `pl_${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  const category = clip(item.category, 80) || 'General';
  const price = Math.round(Number(item.unit_price) * 100) / 100;
  const sort = item.sort_order ?? 999;
  const rows = await sql()`
    INSERT INTO price_list (id, description, unit_price, category, sort_order, updated_at)
    VALUES (${id}, ${description}, ${price}, ${category}, ${sort}, now())
    ON CONFLICT (id) DO UPDATE SET
      description = EXCLUDED.description,
      unit_price = EXCLUDED.unit_price,
      category = EXCLUDED.category,
      sort_order = EXCLUDED.sort_order,
      updated_at = now()
    RETURNING *
  `;
  return mapPriceItem((rows as Record<string, unknown>[])[0]);
}

export async function savePriceList(
  items: Array<{
    id?: string;
    description: string;
    unit_price: number;
    category: string;
    sort_order?: number;
  }>,
): Promise<PriceListItem[]> {
  await ensureSchema();
  const keep = new Set<string>();
  let order = 0;
  for (const item of items) {
    const description = clip(item.description, 200);
    if (!description) continue;
    const saved = await savePriceItem({
      id: item.id,
      description,
      unit_price: item.unit_price,
      category: item.category,
      sort_order: item.sort_order ?? order,
    });
    keep.add(saved.id);
    order += 10;
  }
  const existing = await sql()`SELECT id FROM price_list`;
  for (const row of existing as { id: string }[]) {
    if (!keep.has(row.id)) {
      await sql()`DELETE FROM price_list WHERE id = ${row.id}`;
    }
  }
  return listPriceList();
}
