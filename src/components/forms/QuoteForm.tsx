'use client';

import { useState } from 'react';
import { CheckCircle, Phone } from 'lucide-react';
import { BUSINESS, SERVICES } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          message: form.message || `Quote request for ${form.service || 'handyman service'}`,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setSubmitted(true);
    } catch {
      setError('Could not send the request. Call ' + BUSINESS.phone + '.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-sm bg-cream px-6 py-10 text-center">
        <CheckCircle className="mb-3 h-10 w-10 text-forest" />
        <p className="font-display text-2xl text-ink">Request received</p>
        <p className="mt-2 text-sm text-muted">
          We will confirm within two hours. Need it faster?
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-copper"
        >
          <Phone className="h-4 w-4" />
          {BUSINESS.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!compact && (
        <div>
          <p className="font-display text-2xl text-ink">Get a free quote</p>
          <p className="mt-1 text-sm text-muted">Usually answered the same morning.</p>
        </div>
      )}
      <input
        required
        type="text"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => update('name', e.target.value)}
        className="field"
      />
      <input
        required
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => update('phone', e.target.value)}
        className="field"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => update('email', e.target.value)}
        className="field"
      />
      <select
        required
        value={form.service}
        onChange={(e) => update('service', e.target.value)}
        className="field"
      >
        <option value="">Service needed</option>
        {SERVICES.map((s) => (
          <option key={s.id} value={s.title}>
            {s.title}
          </option>
        ))}
        <option value="Not sure">Not sure / punch list</option>
      </select>
      {!compact && (
        <textarea
          rows={3}
          placeholder="What’s going on? (optional)"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="field resize-none"
        />
      )}
      {error && <p className="text-center text-sm text-red-700">{error}</p>}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Sending…' : 'Get a quote'}
      </Button>
      <p className="text-center text-[11px] text-muted">
        No spam. We only use this to quote your job.
      </p>
    </form>
  );
}
