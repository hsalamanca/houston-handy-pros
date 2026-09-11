import type { Booking, BookingStatus, Customer, Lead } from '@/lib/types';

export type { Booking, BookingStatus, Customer, Lead };

export function dbConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export class DbError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = 'DbError';
    this.status = status;
  }
}

async function rest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new DbError('DATABASE_NOT_CONFIGURED', 503);
  }

  const headers = new Headers(init.headers);
  headers.set('apikey', key);
  headers.set('Authorization', `Bearer ${key}`);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (!headers.has('Prefer') && init.method && init.method !== 'GET') {
    headers.set('Prefer', 'return=representation');
  }

  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new DbError(`DB ${res.status}: ${text.slice(0, 400)}`, res.status);
  }

  if (res.status === 204) return undefined as T;
  const body = await res.text();
  if (!body) return undefined as T;
  return JSON.parse(body) as T;
}

export async function probeDatabase(): Promise<{ ok: boolean; message: string }> {
  if (!dbConfigured()) {
    return {
      ok: false,
      message:
        'Database keys are not set. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on Vercel, then restore the Houston Handy Pros project in Supabase.',
    };
  }
  try {
    await rest<Booking[]>('bookings?select=id&limit=1');
    return { ok: true, message: 'Connected' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown database error';
    return {
      ok: false,
      message: `Cannot reach the bookings table. Restore the paused Supabase project (ajgmichfufztwwypepax), run supabase/schema.sql, then retry. ${message}`,
    };
  }
}

export async function listBookings(): Promise<Booking[]> {
  return rest<Booking[]>('bookings?select=*&order=created_at.desc&limit=500');
}

export async function listLeads(): Promise<Lead[]> {
  return rest<Lead[]>('contact_messages?select=*&order=created_at.desc&limit=500');
}

export async function listCustomers(): Promise<Customer[]> {
  return rest<Customer[]>('customers?select=*&order=created_at.desc&limit=500');
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
  const rows = await rest<Booking[]>('bookings', {
    method: 'POST',
    body: JSON.stringify({
      service: input.service,
      description: input.description || null,
      preferred_date: input.preferred_date || null,
      preferred_time: input.preferred_time || null,
      address: input.address || null,
      customer_name: input.customer_name,
      customer_email: input.customer_email,
      customer_phone: input.customer_phone || null,
      is_emergency: input.is_emergency,
      source: input.source,
      status: 'new',
    }),
  });
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row?.id) throw new DbError('Database save returned no row');
  return row;
}

export async function insertLead(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
}): Promise<Lead | undefined> {
  const rows = await rest<Lead[]>('contact_messages', {
    method: 'POST',
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      service: input.service || null,
      message: input.message,
      source: input.source || 'contact',
    }),
  });
  return Array.isArray(rows) ? rows[0] : rows;
}

export async function upsertCustomer(input: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}): Promise<void> {
  await rest('customers?on_conflict=email', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      address: input.address || null,
    }),
  });
}

export async function updateBooking(
  id: string,
  patch: Partial<Pick<Booking, 'status' | 'notes' | 'assigned_tech' | 'amount'>>,
): Promise<Booking> {
  const rows = await rest<Booking[]>(`bookings?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row?.id) throw new DbError('Booking not found', 404);
  return row;
}
