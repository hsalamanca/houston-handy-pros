import type { Metadata } from 'next';
import { CheckCircle, Star } from 'lucide-react';
import { PRICING_PLANS, COMMON_JOBS } from '@/lib/constants';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';

export const metadata: Metadata = {
  title: 'Handyman Pricing in Houston, TX',
  description:
    'Transparent Houston handyman pricing. $80/hr, flat-rate common jobs, and maintenance plans from $70/month. No hidden fees.',
};

export default function PricingPage() {
  return (
    <div>
      <PageHero
        eyebrow="No surprises"
        title="Honest pricing. Always."
        subtitle="We quote before we start. What we say it costs is what you pay."
      />

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { label: 'Hourly rate', value: '$80/hr', sub: '1-hour minimum' },
              { label: 'Half-day', value: '$300', sub: '4 hours' },
              { label: 'Full day', value: '$560', sub: '8 hours' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="border border-line bg-paper p-8 text-center">
                <p className="text-sm text-muted">{label}</p>
                <p className="mt-2 font-display text-4xl text-ink">{value}</p>
                <p className="mt-1 text-sm text-muted">{sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-muted">
            Materials quoted separately. Same-day / emergency work may include a $35 rush fee.
          </p>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl text-ink">Common flat-rate jobs</h2>
          <p className="mt-2 text-center text-muted">Labor included. Materials extra when needed.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {COMMON_JOBS.map(({ job, price }) => (
              <div key={job} className="flex items-center justify-between border border-line bg-cream p-4">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <CheckCircle className="h-4 w-4 shrink-0 text-copper" />
                  {job}
                </span>
                <span className="ml-4 shrink-0 text-sm font-semibold text-ink">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            Set it and forget it
          </p>
          <h2 className="mt-2 text-center font-display text-3xl text-ink md:text-4xl">Maintenance plans</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            The best repair is the one that never happens. We catch Houston problems before they become invoices.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 ${plan.popular ? 'bg-ink text-cream ring-2 ring-copper' : 'border border-line bg-paper'}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-copper px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    <Star className="h-3 w-3 fill-ink" /> Most popular
                  </span>
                )}
                <h3 className={`font-display text-2xl ${plan.popular ? 'text-cream' : 'text-ink'}`}>{plan.name}</h3>
                <p className={`mt-1 text-sm ${plan.popular ? 'text-cream/60' : 'text-muted'}`}>{plan.description}</p>
                <p className="mt-5">
                  <span className={`font-display text-4xl ${plan.popular ? 'text-gold' : 'text-ink'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-cream/60' : 'text-muted'}`}>{plan.period}</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                      <span className={plan.popular ? 'text-cream/80' : 'text-ink/80'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/book" variant={plan.popular ? 'primary' : 'secondary'} className="mt-8 w-full">
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Need a custom quote?" subtitle="Describe the job. We’ll send a number — no commitment." />
    </div>
  );
}
