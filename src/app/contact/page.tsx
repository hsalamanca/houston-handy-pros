'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } finally {
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-5">
            Let&apos;s Talk About Your Project
          </h1>
          <p className="text-white/70 text-lg">
            Whether you&apos;re ready to book or just have a question — we&apos;re easy to reach and fast to respond.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-black text-[#1B2A4A] mb-8">Contact Information</h2>
            <div className="space-y-5 mb-10">
              {[
                { icon: Phone, label: 'Phone', value: BUSINESS.phone, href: BUSINESS.phoneHref },
                { icon: Mail, label: 'Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
                { icon: MapPin, label: 'Service Area', value: 'Houston metro & suburbs (40-mile radius)', href: null },
                { icon: Clock, label: 'Hours', value: `${BUSINESS.hours} · Sunday Closed`, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1B2A4A] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-[#1B2A4A] font-semibold hover:text-[#F5A623] transition-colors">{value}</a>
                    ) : (
                      <p className="text-[#1B2A4A] font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-6">
              <h3 className="font-black text-[#1B2A4A] mb-3">Fastest Way to Book</h3>
              <p className="text-gray-600 text-sm mb-4">For same-week appointments, call or use our online booking system. Contact form responses may take 4–8 hours.</p>
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center justify-center gap-2 bg-[#1B2A4A] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#2d3f6b] transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="bg-green-50 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle className="w-14 h-14 text-green-500 mb-4" />
                <h3 className="text-2xl font-black text-[#1B2A4A] mb-2">Message Received!</h3>
                <p className="text-gray-600">We&apos;ll get back to you within a few hours. For faster service, call us at {BUSINESS.phone}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-black text-[#1B2A4A] mb-6">Send Us a Message</h2>
                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Jane Smith' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'jane@example.com' },
                  { label: 'Phone', key: 'phone', type: 'tel', placeholder: '(713) 555-0000' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => update(key as keyof typeof form, e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Needed</label>
                  <select
                    value={form.service}
                    onChange={(e) => update('service', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  >
                    <option value="">Select a service...</option>
                    {['Carpentry & Woodwork','Plumbing Repairs','Electrical','Drywall & Painting','Flooring','Pressure Washing','Fence & Gate Repair','Furniture Assembly','TV Mounting','Seasonal Maintenance','Commercial Services','Other / Not Sure'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you need..."
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#F5A623] text-[#1B2A4A] font-black py-4 rounded-xl hover:bg-[#e8941a] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
