import { neon } from '@neondatabase/serverless';
import type { Booking, BookingStatus, Customer, Lead } from '@/lib/types';

export type { Booking, BookingStatus, Customer, Lead };

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
    maintenance_plan: row.maintenance_plan == null ? null : String(row.maintenance_plan),
    notes: row.notes == null ? null : String(row.notes),
    created_at: String(row.created_at ?? ''),
  };
}

export async function probeDatabase(): Promise<{ ok: boolean; message: string }> {
  if (!dbConfigured()) {
    return {
      ok: false,
      message:
        'DATABASE_URL is not set. Create a Neon project named houston-handy-pros, copy the pooled connection string, and add it as DATABASE_URL on Vercel (Production + Preview).',
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

export async function listLeads(): Promise<Lead[]> {
  await ensureSchema();
  const rows = await sql()`SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 500`;
  return (rows as Record<string, unknown>[]).map(asLead);
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
  source: string;
}): Promise<Booking> {
  await ensureSchema();
  const rows = await sql()`
    INSERT INTO bookings (
      service, description, preferred_date, preferred_time, address,
      customer_name, customer_email, customer_phone, is_emergency, source, status
    ) VALUES (
      ${input.service},
      ${input.description || null},
      ${input.preferred_date || null},
      ${input.preferred_time || null},
      ${input.address || null},
      ${input.customer_name},
      ${input.customer_email},
      ${input.customer_phone || null},
      ${input.is_emergency},
      ${input.source},
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
  patch: Partial<Pick<Booking, 'status' | 'notes' | 'assigned_tech' | 'amount'>>,
): Promise<Booking> {
  await ensureSchema();
  const rows = await sql()`
    UPDATE bookings SET
      status = COALESCE(${patch.status ?? null}, status),
      notes = COALESCE(${patch.notes ?? null}, notes),
      assigned_tech = COALESCE(${patch.assigned_tech ?? null}, assigned_tech),
      amount = COALESCE(${patch.amount ?? null}, amount),
      updated_at = now()
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  const row = (rows as Record<string, unknown>[])[0];
  if (!row?.id) throw new DbError('Booking not found', 404);
  return asBooking(row);
}
