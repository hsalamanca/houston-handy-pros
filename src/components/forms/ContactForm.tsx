'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { BUSINESS, SERVICES } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '',
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact' }),
      });
      if (!res.ok) throw new Error('send failed');
      setSubmitted(true);
    } catch {
      setError('Could not send the message. Call us at ' + BUSINESS.phone + ' and we will take it from there.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-line bg-cream px-8 py-14 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-forest" />
        <h3 className="font-display text-2xl text-ink">Message received</h3>
        <p className="mt-2 text-muted">
          We will get back to you within a few hours. For faster service, call {BUSINESS.phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      <h2 className="font-display text-2xl text-ink">Send a message</h2>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </label>
      </div>
      {[
        { label: 'Full name', key: 'name' as const, type: 'text', placeholder: 'Jane Smith' },
        { label: 'Email', key: 'email' as const, type: 'email', placeholder: 'jane@example.com' },
        { label: 'Phone', key: 'phone' as const, type: 'tel', placeholder: '(713) 555-0000' },
      ].map(({ label, key, type, placeholder }) => (
        <div key={key}>
          <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
          <input
            required
            type={type}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => update(key, e.target.value)}
            className="field"
          />
        </div>
      ))}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Service needed</label>
        <select
          value={form.service}
          onChange={(e) => update('service', e.target.value)}
          className="field"
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other">Other / not sure</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Message</label>
        <textarea
          rows={4}
          placeholder="Tell us what you need…"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="field resize-none"
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
