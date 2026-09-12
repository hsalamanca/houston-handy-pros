import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { savePriceItem } from '@/lib/db';
import { clip } from '@/lib/html';

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized();
  try {
    const body = await req.json();
    const row = body.item ?? body;
    const description = clip(row?.description, 200);
    if (!description) return NextResponse.json({ error: 'Description is required.' }, { status: 400 });
    const item = await savePriceItem({
      id: typeof row.id === 'string' ? clip(row.id, 80) : undefined,
      description,
      unit_price: Number(row.unit_price) || 0,
      category: clip(row.category, 80) || 'General',
      sort_order: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : 999,
    });
    return NextResponse.json({ item });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not save job';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
