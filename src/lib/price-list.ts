import type { PriceListItem } from '@/lib/types';

export const PRICE_CATEGORIES = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Drywall',
  'Flooring',
  'Fence & Gate',
  'TV & Smart Home',
  'Assembly',
  'Pressure Washing',
  'Maintenance',
  'General',
] as const;

export function mapPriceItem(row: Record<string, unknown>): PriceListItem {
  return {
    id: String(row.id ?? ''),
    description: String(row.description ?? ''),
    unit_price: Number(row.unit_price) || 0,
    category: String(row.category ?? 'General'),
    sort_order: Number(row.sort_order) || 0,
  };
}

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function related(a: string, b: string): boolean {
  if (a === b) return true;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  if (short.length < 4 || !long.startsWith(short)) return false;
  const rest = long.slice(short.length);
  return ['s', 'es', 'ed', 'ing', 'er', 'ers'].includes(rest);
}

const ALIASES: Record<string, string[]> = {
  dripping: ['leak', 'leaking', 'drip'],
  drip: ['leak', 'leaking'],
  leaking: ['drip', 'dripping', 'leak'],
  leak: ['drip', 'dripping'],
  disposal: ['garbage'],
  garbage: ['disposal'],
  clogged: ['drain', 'clog'],
  clog: ['drain'],
  drain: ['clog', 'clogged'],
};

function expand(word: string): string[] {
  return [word, ...(ALIASES[word] ?? [])];
}

function hits(words: string[], needle: string): boolean {
  return words.some((word) => related(word, needle) || expand(needle).some((alias) => related(word, alias)));
}

export function scoreForRequest(item: PriceListItem, request: string, serviceHint = ''): number {
  if (!request.trim() && !serviceHint.trim()) return 0;
  const req = tokens(request);
  const desc = tokens(item.description);
  const cat = tokens(item.category);
  let score = 0;
  for (const word of req) {
    if (hits(desc, word)) score += word.length > 5 ? 4 : 2;
    else if (hits(cat, word)) score += 1;
  }
  const serviceWords = tokens(serviceHint);
  if (serviceWords.length && cat.some((c) => serviceWords.some((s) => related(c, s) || s.includes(c) || c.includes(s)))) {
    score += 0.4;
  }
  return score;
}

export function suggestedItems(
  items: PriceListItem[],
  request: string,
  limit = 8,
  serviceHint = '',
): PriceListItem[] {
  return items
    .map((item) => ({ item, score: scoreForRequest(item, request, serviceHint) }))
    .filter((row) => row.score >= 2)
    .sort((a, b) => b.score - a.score || a.item.sort_order - b.item.sort_order)
    .slice(0, limit)
    .map((row) => row.item);
}

export function groupByCategory(items: PriceListItem[]): { category: string; items: PriceListItem[] }[] {
  const groups = new Map<string, PriceListItem[]>();
  for (const item of items) {
    const key = item.category || 'General';
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }
  const order = PRICE_CATEGORIES as readonly string[];
  return [...groups.entries()]
    .sort((a, b) => {
      const ai = order.indexOf(a[0]);
      const bi = order.indexOf(b[0]);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    })
    .map(([category, group]) => ({
      category,
      items: group.slice().sort((a, b) => a.sort_order - b.sort_order || a.description.localeCompare(b.description)),
    }));
}
