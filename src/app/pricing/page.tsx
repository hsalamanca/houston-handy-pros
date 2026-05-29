import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Star } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Handyman Pricing in Houston, TX',
  description:
    'Transparent handyman pricing in Houston. Hourly rates, flat-rate common jobs, and maintenance subscription plans. No hidden fees.',
};

// Prices based on HomeAdvisor, Angi, and Houston-local market data (2025–2026)
const commonJobs = [
  { job: 'TV mounting (standard, drywall)', price: '$150–$300' },
  { job: 'Toilet repair or replacement', price: '$200–$400' },
  { job: 'Faucet replacement', price: '$125–$250' },
  { job: 'Ceiling fan installation (existing wiring)', price: '$125–$250' },
  { job: 'Drywall patch (under 4 sq ft)', price: '$150–$350' },
  { job: 'Interior door replacement', price: '$200–$500' },
  { job: 'Outlet/switch replacement', price: '$95–$150' },
  { job: 'Furniture assembly (avg)', price: '$80–$200' },
  { job: 'Weatherstripping (per door)', price: '$95–$150' },
  { job: 'Caulking (bathroom/kitchen)', price: '$100–$200' },
  { job: 'Fence board replacement (per board)', price: '$40–$90 + materials' },
  { job: 'Light fixture installation', price: '$65–$100' },
];

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">No Surprises</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-5">
            Honest Pricing. Always.
          </h1>
          <p className="text-white/70 text-lg">
            We quote before we start. No bait-and-switch, no surprise invoices. What we say it costs is what you pay.
          </p>
        </div>
      </section>

      {/* Hourly rate */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 mb-4">
            {[
              { label: 'Hourly Rate', value: '$80/hr', sub: '1-hour minimum' },
              { label: 'Half-Day Rate', value: '$300', sub: '4 hours' },
              { label: 'Full-Day Rate', value: '$560', sub: '8 hours' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <p className="text-gray-500 text-sm mb-2">{label}</p>
                <p className="text-4xl font-black text-[#1B2A4A] mb-1">{value}</p>
                <p className="text-gray-400 text-sm">{sub}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm text-center">
            Materials not included unless otherwise quoted. Emergency / same-day service may incur a $35 rush fee.
          </p>
        </div>
      </section>

      {/* Flat-rate jobs */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-[#1B2A4A] mb-2 text-center">Common Flat-Rate Jobs</h2>
          <p className="text-gray-600 text-center mb-10">These prices include labor. Materials quoted separately when needed.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {commonJobs.map(({ job, price }) => (
              <div key={job} className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span className="text-gray-700 text-sm">{job}</span>
                </div>
                <span className="font-bold text-[#1B2A4A] text-sm whitespace-nowrap ml-4">{price}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm text-center mt-4">
            Prices may vary based on complexity. Call for a custom quote on larger projects.
          </p>
        </div>
      </section>

      {/* Maintenance plans */}
      <section className="py-20 px-4 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Set It & Forget It</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-2 mb-4">
              Maintenance Plans
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              The best home repair is the one that never has to happen. Our maintenance plans catch small problems before they become expensive ones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 relative ${plan.popular ? 'bg-[#1B2A4A] text-white ring-4 ring-[#F5A623]' : 'bg-white border border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F5A623] text-[#1B2A4A] font-black text-xs px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#1B2A4A]" /> Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-black mb-1 ${plan.popular ? 'text-white' : 'text-[#1B2A4A]'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/60' : 'text-gray-500'}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-black ${plan.popular ? 'text-[#F5A623]' : 'text-[#1B2A4A]'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? 'text-[#F5A623]' : 'text-[#F5A623]'}`} />
                      <span className={plan.popular ? 'text-white/80' : 'text-gray-700'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={`block w-full text-center font-bold py-3 rounded-xl transition-colors ${
                    plan.popular
                      ? 'bg-[#F5A623] text-[#1B2A4A] hover:bg-[#e8941a]'
                      : 'bg-[#1B2A4A] text-white hover:bg-[#2d3f6b]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ pricing */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-4">Questions About Pricing?</h2>
          <p className="text-gray-600 mb-6">Every job is a little different. Get a firm quote with no commitment.</p>
          <Link href="/book" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-10 py-4 rounded-xl hover:bg-[#e8941a] transition-colors">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
