'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import type { Booking, BookingStatus } from '@/lib/types';

const columns: { id: BookingStatus; label: string; color: string }[] = [
  { id: 'new', label: 'New', color: 'bg-purple-500' },
  { id: 'scheduled', label: 'Scheduled', color: 'bg-blue-500' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-orange-500' },
  { id: 'complete', label: 'Complete', color: 'bg-green-500' },
];

function money(amount: number | null) {
  if (amount == null || Number.isNaN(Number(amount))) return '';
  return `$${Number(amount).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

function when(booking: Booking) {
  const date = booking.preferred_date || '';
  const time = booking.preferred_time || '';
  return [date, time].filter(Boolean).join(' · ') || 'Flexible';
}

export default function JobBoard({ initial }: { initial: Booking[] }) {
  const [jobs, setJobs] = useState(initial);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function setStatus(id: string, status: BookingStatus) {
    setPending(id);
    setError('');
    const prev = jobs;
    setJobs((list) => list.map((j) => (j.id === id ? { ...j, status } : j)));
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Update failed');
      }
    } catch (err) {
      setJobs(prev);
      setError(err instanceof Error ? err.message : 'Could not update job');
    } finally {
      setPending(null);
    }
  }

  const visible = jobs.filter((j) => j.status !== 'cancelled');

  return (
    <div>
      {error && (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
      )}
      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
          No jobs yet. New bookings from the website land here automatically.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {columns.map((col) => {
            const colJobs = visible.filter((j) => j.status === col.id);
            return (
              <div key={col.id}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${col.color}`} />
                  <h3 className="font-black text-[#1B2A4A] text-sm uppercase tracking-wider">{col.label}</h3>
                  <span className="ml-auto bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {colJobs.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {colJobs.map((job) => (
                    <article
                      key={job.id}
                      className={`relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#F5A623]/60 hover:shadow-md transition-all ${
                        pending === job.id ? 'opacity-60' : ''
                      }`}
                    >
                      <Link
                        href={`/admin/jobs/${job.id}`}
                        className="absolute inset-0 z-0 rounded-xl"
                        aria-label={`Open job for ${job.customer_name}`}
                      />
                      <div className="relative z-10 pointer-events-none">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <div>
                            <p className="font-bold text-[#1B2A4A] text-sm">{job.customer_name}</p>
                            <p className="text-[#F5A623] text-xs font-semibold">{job.service}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {job.amount != null && (
                              <span className="text-[#1B2A4A] font-black text-sm">{money(job.amount)}</span>
                            )}
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                            <Clock className="w-3 h-3" />
                            {when(job)}
                          </div>
                          {job.address && (
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                              <MapPin className="w-3 h-3" />
                              {job.address}
                            </div>
                          )}
                        </div>
                        {job.description && (
                          <p className="text-gray-500 text-xs mt-2 line-clamp-3">{job.description}</p>
                        )}
                      </div>
                      {job.customer_phone && (
                        <a
                          href={`tel:${job.customer_phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="relative z-10 mt-2 flex items-center gap-1.5 text-gray-500 text-xs hover:text-[#1B2A4A]"
                        >
                          <Phone className="w-3 h-3" />
                          {job.customer_phone}
                        </a>
                      )}
                      <select
                        className="relative z-10 mt-3 w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-[#F8F9FA]"
                        value={job.status}
                        disabled={pending === job.id}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setStatus(job.id, e.target.value as BookingStatus)}
                      >
                        {columns.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
