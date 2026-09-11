import type { QuoteLine } from '@/lib/types';
import { clip } from '@/lib/html';

export function parseQuoteItems(raw: unknown): QuoteLine[] {
  let data = raw;
  if (typeof raw === 'string') {
    try {
      data = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(data)) return [];
  const items: QuoteLine[] = [];
  for (const row of data.slice(0, 40)) {
    if (!row || typeof row !== 'object') continue;
    const rec = row as Record<string, unknown>;
    const description = clip(rec.description, 200);
    const quantity = Number(rec.quantity);
    const unit_price = Number(rec.unit_price);
    if (!description) continue;
    if (!Number.isFinite(quantity) || quantity < 0 || quantity > 9999) continue;
    if (!Number.isFinite(unit_price) || unit_price < 0 || unit_price > 100000) continue;
    items.push({
      id: clip(rec.id, 64) || crypto.randomUUID(),
      description,
      quantity: Math.round(quantity * 100) / 100,
      unit_price: Math.round(unit_price * 100) / 100,
    });
  }
  return items;
}

export function quoteTotal(items: QuoteLine[]): number {
  const total = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  return Math.round(total * 100) / 100;
}

export function money(amount: number | null | undefined): string {
  if (amount == null || Number.isNaN(Number(amount))) return '$0.00';
  return `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
