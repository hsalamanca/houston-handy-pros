'use client';

import { useMemo, useState } from 'react';
import { Check, Pencil, Plus, Trash2 } from 'lucide-react';
import type { PriceListItem } from '@/lib/types';
import { PRICE_CATEGORIES, groupByCategory, suggestedItems } from '@/lib/price-list';
import { money } from '@/lib/quote';

function blankItem(): PriceListItem {
  return {
    id: crypto.randomUUID(),
    description: '',
    unit_price: 0,
    category: 'General',
    sort_order: 999,
  };
}

function hintPreview(hint?: string): string {
  if (!hint) return '';
  const trimmed = hint.replace(/\s+/g, ' ').trim();
  return trimmed.length > 110 ? `${trimmed.slice(0, 107)}…` : trimmed;
}

const field = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#F8F9FA]';

export default function PriceListPanel({
  items,
  onChange,
  requestHint,
  serviceHint,
  onPick,
  pickMode = true,
  picked = [],
}: {
  items: PriceListItem[];
  onChange: (next: PriceListItem[]) => void;
  requestHint?: string;
  serviceHint?: string;
  onPick?: (item: PriceListItem) => void;
  pickMode?: boolean;
  picked?: string[];
}) {
  const [editing, setEditing] = useState(!pickMode);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState<PriceListItem[]>(items);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [rowEdit, setRowEdit] = useState<PriceListItem | null>(null);
  const pickedSet = useMemo(() => new Set(picked.map((p) => p.trim().toLowerCase())), [picked]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.description.toLowerCase().includes(q) || item.category.toLowerCase().includes(q),
    );
  }, [items, query]);

  const suggested = useMemo(
    () => suggestedItems(items, requestHint ?? '', 8, serviceHint ?? ''),
    [items, requestHint, serviceHint],
  );
  const groups = useMemo(() => groupByCategory(filtered), [filtered]);
  const suggestedIds = useMemo(() => new Set(suggested.map((item) => item.id)), [suggested]);
  const preview = hintPreview(requestHint);

  function startEdit() {
    setDraft(items.length ? items.map((i) => ({ ...i })) : [blankItem()]);
    setEditing(true);
    setRowEdit(null);
    setOk('');
    setError('');
  }

  function updateDraft(id: string, patch: Partial<PriceListItem>) {
    setDraft((list) => list.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function mergeSaved(saved: PriceListItem) {
    const exists = items.some((item) => item.id === saved.id);
    onChange(exists ? items.map((item) => (item.id === saved.id ? saved : item)) : [...items, saved]);
  }

  async function saveRow() {
    if (!rowEdit || !rowEdit.description.trim()) {
      setError('Add a job description.');
      return;
    }
    setSaving(true);
    setError('');
    setOk('');
    try {
      const res = await fetch('/api/admin/prices/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: {
            id: rowEdit.id,
            description: rowEdit.description,
            unit_price: Number(rowEdit.unit_price) || 0,
            category: rowEdit.category || 'General',
            sort_order: rowEdit.sort_order,
          },
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Could not save job');
      mergeSaved(body.item);
      setRowEdit(null);
      setOk('Job saved to the list.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save job');
    } finally {
      setSaving(false);
    }
  }

  async function saveList() {
    const clean = draft.filter((item) => item.description.trim());
    if (!clean.length) {
      setError('Add at least one job.');
      return;
    }
    setSaving(true);
    setError('');
    setOk('');
    try {
      const res = await fetch('/api/admin/prices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: clean.map((item, index) => ({
            id: item.id,
            description: item.description,
            unit_price: Number(item.unit_price) || 0,
            category: item.category || 'General',
            sort_order: index * 10,
          })),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Could not save list');
      onChange(body.items);
      setDraft(body.items);
      setOk('Price list saved.');
      if (pickMode) setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save list');
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Edit price list</p>
          {pickMode && (
            <button type="button" onClick={() => setEditing(false)} className="text-sm text-gray-500 hover:text-[#1B2A4A]">
              Back to jobs
            </button>
          )}
        </div>
        <p className="mb-3 text-sm text-gray-500">Change a description or price here and it is saved for the next quote.</p>
        <div className="space-y-2">
          {draft.map((item) => (
            <div key={item.id} className="grid gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)_5.5rem_2.75rem]">
              <select
                value={item.category}
                onChange={(e) => updateDraft(item.id, { category: e.target.value })}
                className={field}
                aria-label="Category"
              >
                {PRICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                value={item.description}
                onChange={(e) => updateDraft(item.id, { description: e.target.value })}
                placeholder="Job description"
                className={field}
              />
              <input
                type="number"
                min={0}
                step="0.01"
                value={item.unit_price}
                onChange={(e) => updateDraft(item.id, { unit_price: Number(e.target.value) })}
                className={field}
                aria-label="Price"
              />
              <button
                type="button"
                onClick={() =>
                  setDraft((list) => (list.length === 1 ? [blankItem()] : list.filter((row) => row.id !== item.id)))
                }
                className="grid size-11 place-items-center text-gray-400 hover:text-red-700"
                aria-label="Remove job"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDraft((list) => [...list, blankItem()])}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] hover:text-[#F5A623]"
        >
          <Plus className="w-4 h-4" />
          Add job
        </button>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        {ok && <p className="mt-3 text-sm text-green-700">{ok}</p>}
        <div className="mt-4">
          <button
            type="button"
            disabled={saving}
            onClick={() => void saveList()}
            className="bg-[#1B2A4A] text-white font-bold text-sm px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save price list'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Select jobs</p>
        <button type="button" onClick={startEdit} className="text-sm font-semibold text-[#1B2A4A] hover:text-[#F5A623]">
          Edit list
        </button>
      </div>
      {preview && (
        <p className="mb-3 text-sm text-gray-500">
          Matching this request: <span className="text-[#1B2A4A]">{preview}</span>
        </p>
      )}
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs…" className={`${field} mb-3`} />
      {rowEdit && (
        <div className="mb-4 rounded-xl bg-[#F8F9FA] p-3 border border-gray-200">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Edit this job</p>
          <div className="grid gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)_5.5rem]">
            <select
              value={rowEdit.category}
              onChange={(e) => setRowEdit({ ...rowEdit, category: e.target.value })}
              className={field}
              aria-label="Category"
            >
              {PRICE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              value={rowEdit.description}
              onChange={(e) => setRowEdit({ ...rowEdit, description: e.target.value })}
              className={field}
              placeholder="Job description"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              value={rowEdit.unit_price}
              onChange={(e) => setRowEdit({ ...rowEdit, unit_price: Number(e.target.value) })}
              className={field}
              aria-label="Price"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => void saveRow()}
              className="bg-[#1B2A4A] text-white font-bold text-sm px-3 py-1.5 rounded-lg disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save job'}
            </button>
            <button type="button" className="px-3 py-1.5 text-sm text-gray-500 hover:text-[#1B2A4A]" onClick={() => setRowEdit(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {!query && suggested.length > 0 && (
        <div className="mb-4">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F5A623]">Suggested for this request</p>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200">
            {suggested.map((item) => (
              <PickRow
                key={`s-${item.id}`}
                item={item}
                picked={pickedSet.has(item.description.trim().toLowerCase())}
                onPick={onPick}
                onEdit={setRowEdit}
              />
            ))}
          </div>
        </div>
      )}
      <div className="max-h-72 space-y-4 overflow-y-auto pr-1">
        {groups.map((group) => {
          const rest = group.items.filter((item) => query || !suggestedIds.has(item.id));
          if (!rest.length) return null;
          return (
            <div key={group.category}>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">{group.category}</p>
              <div className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200">
                {rest.map((item) => (
                  <PickRow
                    key={item.id}
                    item={item}
                    picked={pickedSet.has(item.description.trim().toLowerCase())}
                    onPick={onPick}
                    onEdit={setRowEdit}
                  />
                ))}
              </div>
            </div>
          );
        })}
        {groups.length === 0 && <p className="text-sm text-gray-500">No jobs match that search.</p>}
      </div>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      {ok && <p className="mt-3 text-sm text-green-700">{ok}</p>}
    </div>
  );
}

function PickRow({
  item,
  picked,
  onPick,
  onEdit,
}: {
  item: PriceListItem;
  picked: boolean;
  onPick?: (item: PriceListItem) => void;
  onEdit: (item: PriceListItem) => void;
}) {
  return (
    <div className={`flex items-stretch ${picked ? 'bg-[#FFF8EE]' : 'bg-white'}`}>
      <button
        type="button"
        onClick={() => onPick?.(item)}
        className="flex min-h-11 min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left hover:bg-[#F8F9FA]"
      >
        <span
          className={`grid size-6 shrink-0 place-items-center rounded-full ${
            picked ? 'bg-green-700 text-white' : 'bg-gray-100 text-[#1B2A4A]'
          }`}
        >
          {picked ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
        <span className="min-w-0 flex-1 text-sm text-[#1B2A4A]">{item.description}</span>
        <span className="shrink-0 text-sm font-semibold tabular-nums text-[#1B2A4A]">{money(item.unit_price)}</span>
      </button>
      <button
        type="button"
        onClick={() => onEdit({ ...item })}
        className="grid size-11 shrink-0 place-items-center text-gray-400 hover:text-[#1B2A4A]"
        aria-label={`Edit ${item.description}`}
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
