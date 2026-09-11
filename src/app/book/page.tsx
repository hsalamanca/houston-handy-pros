'use client';

import { useState } from 'react';
import { CheckCircle, ChevronRight, Phone, Shield, Clock } from 'lucide-react';
import { SERVICES, BUSINESS } from '@/lib/constants';
import Button from '@/components/ui/Button';

type Step = 1 | 2 | 3 | 4 | 5;

interface BookingData {
  service: string;
  description: string;
  date: string;
  time: string;
  address: string;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const times = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<BookingData>({
    service: '', description: '', date: '', time: '',
    address: '', name: '', email: '', phone: '', website: '',
  });

  const update = (key: keyof BookingData, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const canNext: Record<Step, boolean> = {
    1: !!data.service,
    2: data.description.length > 10,
    3: !!data.date && !!data.time,
    4: !!data.address,
    5: !!data.name && !!data.email && !!data.phone,
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Booking failed');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please call us directly at ' + BUSINESS.phone);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-4 py-20">
        <div className="w-full max-w-lg border border-line bg-cream p-10 text-center">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-forest" />
          <h1 className="font-display text-3xl text-ink">You’re booked.</h1>
          <p className="mt-3 text-muted">
            Thanks, <strong className="text-ink">{data.name}</strong>. We received your request for{' '}
            <strong className="text-ink">{data.service}</strong>.
          </p>
          <p className="mt-2 text-sm text-muted">
            Confirmation goes to {data.email} and {data.phone} within 30 minutes.
          </p>
          <div className="mt-6 space-y-1 border border-line bg-paper p-4 text-left text-sm">
            <p><span className="font-semibold">Service:</span> {data.service}</p>
            <p><span className="font-semibold">When:</span> {data.date} at {data.time}</p>
            <p><span className="font-semibold">Where:</span> {data.address}</p>
          </div>
          <a
            href={BUSINESS.phoneHref}
            className="mt-6 inline-flex items-center gap-2 font-semibold text-copper"
          >
            <Phone className="h-4 w-4" />
            Questions? Call {BUSINESS.phone}
          </a>
        </div>
      </div>
    );
  }

  const steps = ['Service', 'Details', 'Schedule', 'Address', 'Your info'];

  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-ink px-4 py-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Book online</p>
        <h1 className="mt-3 font-display text-4xl text-cream">Book your handyman</h1>
        <p className="mt-2 text-cream/65">About a minute. No commitment until we confirm.</p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-10 flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    i + 1 < step
                      ? 'bg-forest text-cream'
                      : i + 1 === step
                        ? 'bg-copper text-ink'
                        : 'bg-sand text-muted'
                  }`}
                >
                  {i + 1 < step ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`hidden text-[11px] sm:block ${i + 1 === step ? 'font-semibold text-ink' : 'text-muted'}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-2 h-px flex-1 ${i + 1 < step ? 'bg-forest' : 'bg-line'}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                name="website"
                value={data.website}
                onChange={(e) => update('website', e.target.value)}
              />
            </label>
          </div>
          <div className="border border-line bg-cream p-6 sm:p-8">
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl text-ink">What do you need help with?</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => update('service', s.title)}
                      className={`border p-4 text-left transition-colors ${
                        data.service === s.title
                          ? 'border-copper bg-paper'
                          : 'border-line bg-paper hover:border-ink/30'
                      }`}
                    >
                      <p className="text-sm font-semibold text-ink">{s.title}</p>
                      <p className="mt-0.5 text-xs text-muted">{s.priceRange}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl text-ink">Describe the job</h2>
                <p className="mt-2 text-sm text-muted">The more detail, the more accurate the quote.</p>
                <textarea
                  className="mt-6 w-full resize-none rounded-sm border border-line bg-paper p-4 text-sm outline-none ring-copper/40 focus:ring-2"
                  rows={6}
                  placeholder="e.g. Kitchen faucet has been dripping for a week. While you’re here, can you look at the disposal?"
                  value={data.description}
                  onChange={(e) => update('description', e.target.value)}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl text-ink">Pick a date & time</h2>
                <label className="mt-6 block text-sm font-semibold text-ink">Preferred date</label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-sm border border-line bg-paper p-3 text-sm outline-none ring-copper/40 focus:ring-2"
                  min={new Date().toISOString().split('T')[0]}
                  value={data.date}
                  onChange={(e) => update('date', e.target.value)}
                />
                <label className="mt-5 block text-sm font-semibold text-ink">Preferred time</label>
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update('time', t)}
                      className={`rounded-sm border px-2 py-2 text-xs font-medium ${
                        data.time === t ? 'border-copper bg-paper text-ink' : 'border-line text-muted'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <Clock className="h-4 w-4 text-copper" />
                  We confirm within 2 hours. If that window is taken, we’ll offer the next one.
                </p>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-display text-2xl text-ink">Where’s the job?</h2>
                <p className="mt-2 text-sm text-muted">We serve a 40-mile radius from downtown Houston.</p>
                <input
                  type="text"
                  className="mt-6 w-full rounded-sm border border-line bg-paper p-4 text-sm outline-none ring-copper/40 focus:ring-2"
                  placeholder="123 Main St, Houston, TX 77002"
                  value={data.address}
                  onChange={(e) => update('address', e.target.value)}
                />
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <Shield className="h-4 w-4 text-copper" />
                  Shared only with your assigned technician.
                </p>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-display text-2xl text-ink">Almost done</h2>
                <div className="mt-6 space-y-4">
                  {[
                    { label: 'Full name', key: 'name' as const, type: 'text', ph: 'Jane Smith' },
                    { label: 'Email', key: 'email' as const, type: 'email', ph: 'jane@example.com' },
                    { label: 'Phone', key: 'phone' as const, type: 'tel', ph: '(713) 555-0000' },
                  ].map(({ label, key, type, ph }) => (
                    <div key={key}>
                      <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
                      <input
                        type={type}
                        className="w-full rounded-sm border border-line bg-paper p-3 text-sm outline-none ring-copper/40 focus:ring-2"
                        placeholder={ph}
                        value={data[key]}
                        onChange={(e) => update(key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted">
                  By submitting, you agree to be contacted about this booking. We don’t sell your data.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="rounded-sm border border-line px-6 py-3 text-sm font-semibold text-muted"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <Button
                type="button"
                disabled={!canNext[step]}
                onClick={() => setStep((s) => (s + 1) as Step)}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={!canNext[5] || submitting}>
                {submitting ? 'Submitting…' : 'Confirm booking'}
              </Button>
            )}
          </div>
        </form>

        {submitError && (
          <div className="mt-4 border border-red-200 bg-red-50 p-4 text-sm text-red-700">{submitError}</div>
        )}

        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: Shield, text: 'Bonded & insured' },
            { icon: CheckCircle, text: '1-year guarantee' },
            { icon: Clock, text: 'Fast response' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex flex-col items-center gap-1.5">
              <Icon className="h-5 w-5 text-copper" />
              <span className="text-xs font-medium text-muted">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
