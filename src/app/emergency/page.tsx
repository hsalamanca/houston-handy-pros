import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Zap, Clock, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Emergency & Same-Day Handyman Service in Houston TX',
  description:
    'Need it fixed today? Houston Handy Pros offers same-day and emergency handyman service across Houston. Call now for fast dispatch.',
};

const emergencyJobs = [
  { icon: '🚿', label: 'Burst pipe or active leak' },
  { icon: '🚽', label: 'Overflowing toilet' },
  { icon: '🔒', label: 'Door that won\'t lock or close' },
  { icon: '💡', label: 'Electrical issue (non-panel)' },
  { icon: '🪟', label: 'Broken window or door glass' },
  { icon: '🌊', label: 'Water damage repair' },
  { icon: '🌀', label: 'Storm damage' },
  { icon: '🔧', label: 'Gas smell (minor fitting)' },
];

export default function EmergencyPage() {
  return (
    <div>
      {/* Urgent hero */}
      <section className="bg-red-700 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-red-200 font-bold uppercase tracking-wider text-sm mb-4">
            <AlertTriangle className="w-4 h-4" />
            Emergency & Same-Day Service
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Need It Fixed <span className="text-yellow-300">Today?</span>
          </h1>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Call now and we&apos;ll dispatch a technician to your Houston home as fast as possible. Same-day appointments available Mon–Sat.
          </p>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex items-center gap-3 bg-yellow-400 text-gray-900 font-black text-xl px-10 py-5 rounded-2xl hover:bg-yellow-300 transition-colors shadow-2xl"
          >
            <Phone className="w-6 h-6" />
            {BUSINESS.phone}
          </a>
          <p className="text-red-200 text-sm mt-4">
            Mon–Sat 7am–7pm · $35 same-day rush fee applies · Materials extra
          </p>
        </div>
      </section>

      {/* What qualifies */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-3 text-center">
            Common Emergency Calls We Handle
          </h2>
          <p className="text-gray-600 text-center mb-10">
            If it can&apos;t wait, call us. We&apos;ll tell you honestly if it&apos;s something we can fix or if you need a licensed plumber or electrician.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {emergencyJobs.map(({ icon, label }) => (
              <div key={label} className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-gray-800 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works emergency */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-10 text-center">How Emergency Dispatch Works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Phone, step: '1', title: 'Call Us Now', desc: 'Speak directly with our dispatcher. Describe the issue and your address. We don\'t use bots.' },
              { icon: Zap, step: '2', title: 'Tech Dispatched', desc: 'We confirm availability and send the nearest available technician. You get their name and ETA by text.' },
              { icon: CheckCircle, step: '3', title: 'Fixed Today', desc: 'Technician assesses, quotes on-site, and gets to work. You approve before anything starts.' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-700 flex items-center justify-center mx-auto mb-4 relative">
                  <Icon className="w-7 h-7 text-white" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 text-gray-900 rounded-full text-xs font-black flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h3 className="font-bold text-[#1B2A4A] text-base mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="font-black text-[#1B2A4A] text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Emergency Pricing — What to Expect
            </h3>
            <ul className="space-y-2">
              {[
                'Standard hourly rate: $80/hr (same as regular service)',
                'Same-day rush fee: +$35 flat',
                'Materials billed at cost + 20% handling',
                'On-site quote before any work begins — no surprises',
                '1-year workmanship guarantee applies to all emergency work',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trust + CTA */}
      <section className="py-16 px-4 bg-[#1B2A4A]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: Shield, label: 'Licensed & Insured', sub: 'Every technician' },
              { icon: Clock, label: 'Fast Dispatch', sub: 'Mon–Sat 7am–7pm' },
              { icon: CheckCircle, label: '1-Year Guarantee', sub: 'All labor covered' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center">
                <Icon className="w-7 h-7 text-[#F5A623] mx-auto mb-2" />
                <p className="text-white font-bold text-sm">{label}</p>
                <p className="text-white/50 text-xs">{sub}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-black text-white mb-4">Don&apos;t Wait — Call Now</h2>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black text-xl px-12 py-5 rounded-2xl hover:bg-[#e8941a] transition-colors"
          >
            <Phone className="w-5 h-5" />
            {BUSINESS.phone}
          </a>
          <p className="text-white/50 text-sm mt-4">Or <Link href="/book" className="text-[#F5A623] underline">book online</Link> for non-urgent jobs</p>
        </div>
      </section>
    </div>
  );
}
