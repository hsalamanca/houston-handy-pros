'use client';

import { useState } from 'react';
import { CheckCircle, ChevronRight, Phone, Shield, Clock } from 'lucide-react';
import { SERVICES, BUSINESS } from '@/lib/constants';

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
    address: '', name: '', email: '', phone: '',
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
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 sm:p-14 max-w-lg w-full text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-[#1B2A4A] mb-3">You&apos;re Booked!</h1>
          <p className="text-gray-600 mb-2">
            Thanks, <strong>{data.name}</strong>! We&apos;ve received your request for <strong>{data.service}</strong>.
          </p>
          <p className="text-gray-600 mb-6">
            You&apos;ll get a confirmation email at <strong>{data.email}</strong> and an SMS at <strong>{data.phone}</strong> within 30 minutes.
          </p>
          <div className="bg-[#F8F9FA] rounded-xl p-4 text-left text-sm text-gray-700 mb-6 space-y-1">
            <p><span className="font-semibold">Service:</span> {data.service}</p>
            <p><span className="font-semibold">Date/Time:</span> {data.date} at {data.time}</p>
            <p><span className="font-semibold">Address:</span> {data.address}</p>
          </div>
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center justify-center gap-2 bg-[#1B2A4A] text-white font-bold py-3 rounded-xl hover:bg-[#2d3f6b] transition-colors"
          >
            <Phone className="w-4 h-4" />
            Questions? Call {BUSINESS.phone}
          </a>
        </div>
      </div>
    );
  }

  const steps = ['Service', 'Details', 'Schedule', 'Address', 'Your Info'];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-[#1B2A4A] py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Book Your Handyman</h1>
        <p className="text-white/60">Takes 60 seconds. No commitment required.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Progress */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    i + 1 < step ? 'bg-green-500 text-white' :
                    i + 1 === step ? 'bg-[#F5A623] text-[#1B2A4A]' :
                    'bg-gray-200 text-gray-400'
                  }`}
                >
                  {i + 1 < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i + 1 === step ? 'text-[#1B2A4A] font-semibold' : 'text-gray-400'}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${i + 1 < step ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
            {/* Step 1: Service */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-black text-[#1B2A4A] mb-6">What do you need help with?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => update('service', s.title)}
                      className={`text-left p-4 rounded-xl border-2 transition-colors ${
                        data.service === s.title
                          ? 'border-[#F5A623] bg-[#F5A623]/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-semibold text-[#1B2A4A] text-sm">{s.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{s.priceRange}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Description */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-black text-[#1B2A4A] mb-2">Describe the job</h2>
                <p className="text-gray-500 text-sm mb-6">The more detail, the more accurate your quote will be.</p>
                <textarea
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                  rows={6}
                  placeholder="E.g. 'Faucet under the kitchen sink has been dripping for a week. I think it needs a new washer. While here, can you also check the garbage disposal?'"
                  value={data.description}
                  onChange={(e) => update('description', e.target.value)}
                />
                <p className="text-gray-400 text-xs mt-2">Minimum 10 characters</p>
              </div>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-black text-[#1B2A4A] mb-6">Pick a date & time</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                      min={new Date().toISOString().split('T')[0]}
                      value={data.date}
                      onChange={(e) => update('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update('time', t)}
                          className={`py-2 px-2 rounded-lg border text-xs font-medium transition-colors ${
                            data.time === t
                              ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#1B2A4A]'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-6 p-3 bg-blue-50 rounded-xl text-blue-700 text-sm">
                  <Clock className="w-4 h-4 shrink-0" />
                  We&apos;ll confirm within 2 hours. Can&apos;t make the requested time? We&apos;ll find an alternative.
                </div>
              </div>
            )}

            {/* Step 4: Address */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-black text-[#1B2A4A] mb-2">Where&apos;s the job?</h2>
                <p className="text-gray-500 text-sm mb-6">We serve a 40-mile radius from downtown Houston.</p>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  placeholder="123 Main St, Houston, TX 77002"
                  value={data.address}
                  onChange={(e) => update('address', e.target.value)}
                />
                <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-xl text-green-700 text-sm">
                  <Shield className="w-4 h-4 shrink-0" />
                  Your address is secure and only shared with your assigned technician.
                </div>
              </div>
            )}

            {/* Step 5: Contact info */}
            {step === 5 && (
              <div>
                <h2 className="text-xl font-black text-[#1B2A4A] mb-6">Almost done — your contact info</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                      placeholder="Jane Smith"
                      value={data.name}
                      onChange={(e) => update('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                      placeholder="jane@example.com"
                      value={data.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                      placeholder="(713) 555-0000"
                      value={data.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-4">
                  By submitting, you agree to be contacted about your booking. We don&apos;t sell your data.
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as Step)}
                disabled={!canNext[step]}
                className="flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-8 py-3 rounded-xl hover:bg-[#e8941a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canNext[5] || submitting}
                className="flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-8 py-3 rounded-xl hover:bg-[#e8941a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting…' : <>Confirm Booking <CheckCircle className="w-4 h-4" /></>}
              </button>
            )}
          </div>
        </form>

        {submitError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {submitError}
          </div>
        )}

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          {[
            { icon: Shield, text: 'Licensed & Insured' },
            { icon: CheckCircle, text: '1-Year Guarantee' },
            { icon: Clock, text: 'Fast Response' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex flex-col items-center gap-1.5">
              <Icon className="w-5 h-5 text-[#F5A623]" />
              <span className="text-gray-600 text-xs font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
