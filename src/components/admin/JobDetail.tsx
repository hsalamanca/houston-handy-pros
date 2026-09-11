'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, Clock, AlertTriangle } from 'lucide-react';
import type { Booking, BookingStatus } from '@/lib/types';

const STATUSES: { id: BookingStatus; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'complete', label: 'Complete' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function JobDetail({ initial }: { initial: Booking }) {
  const router = useRouter();
  const [job, setJob] = useState(initial);
  const [notes, setNotes] = useState(initial.notes || '');
  const [tech, setTech] = useState(initial.assigned_tech || '');
  const [amount, setAmount] = useState(initial.amount == null ? '' : String(initial.amount));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');

  async function patch(body: Record<string, unknown>) {
    setSaving(true);
    setError('');
    setSaved('');
    try {
      const res = await fetch(`/api/admin/bookings/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setJob(data.booking);
      setSaved('Saved');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save');
    } finally {
      setSaving(false);
    }
  }

  function saveDetails(e: FormEvent) {
    e.preventDefault();
    const parsed = amount === '' ? undefined : Number(amount);
    if (parsed != null && Number.isNaN(parsed)) {
      setError('Amount must be a number');
      return;
    }
    return patch({
      notes,
      assigned_tech: tech,
      ...(parsed != null ? { amount: parsed } : {}),
    });
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[#F5A623] text-xs font-bold uppercase tracking-wider">{job.service}</p>
              <h1 className="text-2xl font-black text-[#1B2A4A] mt-1">{job.customer_name}</h1>
              {job.source && <p className="text-gray-400 text-xs mt-1">Source: {job.source}</p>}
            </div>
            {job.is_emergency && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                Emergency
              </span>
            )}
          </div>

          <div className="mt-5 space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              {[job.preferred_date, job.preferred_time].filter(Boolean).join(' · ') || 'Flexible schedule'}
            </div>
            {job.address && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#1B2A4A]"
              >
                <MapPin className="w-4 h-4 text-gray-400" />
                {job.address}
              </a>
            )}
            <a href={`mailto:${job.customer_email}`} className="flex items-center gap-2 hover:text-[#1B2A4A]">
              <Mail className="w-4 h-4 text-gray-400" />
              {job.customer_email}
            </a>
            {job.customer_phone && (
              <a href={`tel:${job.customer_phone}`} className="flex items-center gap-2 hover:text-[#1B2A4A]">
                <Phone className="w-4 h-4 text-gray-400" />
                {job.customer_phone}
              </a>
            )}
          </div>

          {job.description && (
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Request</h2>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{job.description}</p>
            </div>
          )}
        </div>

        <form onSubmit={saveDetails} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-black text-[#1B2A4A]">Job details</h2>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Assigned tech</span>
            <input
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#F8F9FA]"
              placeholder="Who is going?"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Amount ($)</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#F8F9FA]"
              placeholder="0"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Internal notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#F8F9FA]"
              placeholder="Gate code, parts needed, follow-up…"
            />
          </label>
          {error && <p className="text-sm text-red-700">{error}</p>}
          {saved && <p className="text-sm text-green-700">{saved}</p>}
          <button
            type="submit"
            disabled={saving}
            className="bg-[#1B2A4A] text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#24365c] disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save details'}
          </button>
        </form>
      </div>

      <aside className="space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-black text-[#1B2A4A] mb-3">Status</h2>
          <select
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-[#F8F9FA]"
            value={job.status}
            disabled={saving}
            onChange={(e) => patch({ status: e.target.value })}
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <p className="text-gray-400 text-xs mt-4">Created {new Date(job.created_at).toLocaleString()}</p>
          {job.updated_at && (
            <p className="text-gray-400 text-xs">Updated {new Date(job.updated_at).toLocaleString()}</p>
          )}
        </div>
        <div className="flex gap-2">
          {job.customer_phone && (
            <a
              href={`tel:${job.customer_phone}`}
              className="flex-1 text-center bg-[#F5A623] text-[#1B2A4A] font-bold text-sm px-4 py-2.5 rounded-lg"
            >
              Call
            </a>
          )}
          <a
            href={`mailto:${job.customer_email}`}
            className="flex-1 text-center bg-[#1B2A4A] text-white font-bold text-sm px-4 py-2.5 rounded-lg"
          >
            Email
          </a>
        </div>
      </aside>
    </div>
  );
}
