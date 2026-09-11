import { probeDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await probeDatabase();
  return Response.json(
    { ok: db.ok, db: db.ok ? 'live' : 'offline' },
    { status: db.ok ? 200 : 503 },
  );
}
