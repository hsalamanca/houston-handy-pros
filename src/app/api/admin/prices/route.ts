import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { listPriceList, savePriceList } from '@/lib/db';
import { clip } from '@/lib/html';

export async function GET(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized();
  try {
    const items = await listPriceList();
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not load price list';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized();
  try {
    const body = await req.json();
    const raw = Array.isArray(body.items) ? body.items.slice(0, 120) : [];
    const items = raw.map((row: Record<string, unknown>, index: number) => ({
      id: typeof row.id === 'string' ? clip(row.id, 80) : undefined,
      description: clip(row.description, 200),
      unit_price: Number(row.unit_price) || 0,
      category: clip(row.category, 80) || 'General',
      sort_order: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : index * 10,
    }));
    const next = await savePriceList(items);
    return NextResponse.json({ items: next });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not save price list';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
