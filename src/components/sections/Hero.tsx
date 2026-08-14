import Image from 'next/image';
import { Phone, Star, Shield, BadgeCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import QuoteForm from '@/components/forms/QuoteForm';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <Image
        src="/images/hero.jpg"
        alt="Houston Handy Pros technician at a Heights bungalow"
        fill
        priority
        className="object-cover object-center opacity-35"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gold">
            <Shield className="h-3.5 w-3.5" />
            Serving Houston since {BUSINESS.founded} · Bonded & insured
          </div>

          <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Houston homes
            <br />
            deserve a <span className="text-gold">pro</span>,
            <br />
            not a maybe.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75">
            Bonded and insured handyman work — carpentry, plumbing, electrical,
            drywall, fences, and the punch list you have been walking past. Same-week booking.
            One-year guarantee.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/book">Get Free Quote</Button>
            <Button href={BUSINESS.phoneHref} variant="ghost">
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/70">
            <span className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-gold" />
              Bonded & insured
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-gold" />
              1-year guarantee
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 text-gold" />
              {BUSINESS.offer}
            </span>
          </div>
        </div>

        <div className="rounded-sm border border-white/10 bg-paper p-6 shadow-2xl sm:p-7">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            Book this week
          </p>
          <h2 className="mb-5 font-display text-2xl text-ink">Request a free estimate</h2>
          <QuoteForm compact />
        </div>
      </div>
    </section>
  );
}
