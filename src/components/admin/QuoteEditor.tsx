'use client';

import { useMemo, useState } from 'react';
import { Plus, Trash2, Send } from 'lucide-react';
import type { QuoteLine } from '@/lib/types';
import { money, quoteTotal } from '@/lib/quote';

function blankLine(): QuoteLine {
  return { id: crypto.randomUUID(), description: '', quantity: 1, unit_price: 0 };
}

export default function QuoteEditor({
  kind,
  id,
  initialItems,
}: {
  kind: 'booking' | 'lead';
  id: string;
  initialItems: QuoteLine[];
}) {
  const [items, setItems] = useState<QuoteLine[]>(initialItems.length ? initialItems : [blankLine()]);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const total = useMemo(() => quoteTotal(items.filter((i) => i.description.trim())), [items]);

  function update(lineId: string, patch: Partial<QuoteLine>) {
    setItems((list) => list.map((item) => (item.id === lineId ? { ...item, ...patch } : item)));
  }

  async function save(alsoSend = false) {
    const clean = items.filter((item) => item.description.trim());
    if (alsoSend && !clean.length) {
      setError('Add at least one line with a description and price.');
      return;
    }
    alsoSend ? setSending(true) : setSaving(true);
    setError('');
    setOk('');
    try {
      const path = kind === 'booking' ? `/api/admin/bookings/${id}` : `/api/admin/leads/${id}`;
      const saveRes = await fetch(path, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote_items: clean }),
      });
      const saveBody = await saveRes.json().catch(() => ({}));
      if (!saveRes.ok) throw new Error(saveBody.error || 'Could not save quote');

      if (alsoSend) {
        const sendRes = await fetch(`${path}/send-quote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quote_items: clean }),
        });
        const sendBody = await sendRes.json().catch(() => ({}));
        if (!sendRes.ok) throw new Error(sendBody.error || 'Quote saved but email failed');
        setOk('Quote saved and emailed to the customer.');
      } else {
        setOk('Quote saved.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save quote');
    } finally {
      setSaving(false);
      setSending(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="font-black text-[#1B2A4A]">Quote</h2>
          <p className="text-gray-400 text-xs mt-0.5">Add line items and prices, then email it.</p>
        </div>
        <p className="text-lg font-black text-[#1B2A4A]">{money(total)}</p>
      </div>

      <div className="hidden sm:grid grid-cols-[1fr_88px_104px_88px_36px] gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
        <span>Item</span>
        <span>Qty</span>
        <span>Unit $</span>
        <span className="text-right">Line</span>
        <span />
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-2 sm:grid-cols-[1fr_88px_104px_88px_36px] gap-2">
            <input
              value={item.description}
              onChange={(e) => update(item.id, { description: e.target.value })}
              placeholder="e.g. Replace bathroom faucet"
              className="col-span-2 sm:col-span-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#F8F9FA]"
            />
            <input
              type="number"
              min={0}
              step="0.25"
              value={item.quantity}
              onChange={(e) => update(item.id, { quantity: Number(e.target.value) })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#F8F9FA]"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              value={item.unit_price}
              onChange={(e) => update(item.id, { unit_price: Number(e.target.value) })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#F8F9FA]"
            />
            <p className="self-center text-right text-sm font-semibold text-[#1B2A4A]">
              {money(item.quantity * item.unit_price)}
            </p>
            <button
              type="button"
              onClick={() => setItems((list) => (list.length === 1 ? [blankLine()] : list.filter((row) => row.id !== item.id)))}
              className="self-center text-gray-400 hover:text-red-600"
              aria-label="Remove line"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setItems((list) => [...list, blankLine()])}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] hover:text-[#F5A623]"
      >
        <Plus className="w-4 h-4" />
        Add line
      </button>

      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      {ok && <p className="mt-3 text-sm text-green-700">{ok}</p>}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={saving || sending}
          onClick={() => save(false)}
          className="bg-[#1B2A4A] text-white font-bold text-sm px-4 py-2 rounded-lg disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save quote'}
        </button>
        <button
          type="button"
          disabled={saving || sending}
          onClick={() => save(true)}
          className="inline-flex items-center gap-1.5 border border-[#1B2A4A] text-[#1B2A4A] font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#1B2A4A] hover:text-white disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
          {sending ? 'Sending…' : 'Save & email quote'}
        </button>
      </div>
    </div>
  );
}
