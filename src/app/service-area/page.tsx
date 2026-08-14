import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { NEIGHBORHOODS, SUBURBS, BUSINESS } from '@/lib/constants';
import { NEIGHBORHOOD_DATA } from '@/lib/neighborhoods';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';

export const metadata: Metadata = {
  title: 'Handyman Service Area — Houston TX & Surrounding Cities',
  description:
    'Houston Handy Pros serves Houston and the metro: Sugar Land, Katy, Pearland, The Woodlands, Spring, Humble, and more. 40-mile radius. No travel fee.',
};

export default function ServiceAreaPage() {
  return (
    <div>
      <PageHero
        eyebrow="Coverage"
        title="We come to you."
        subtitle="Houston and the entire metro within 40 miles of downtown. No hidden travel fees inside the standard area."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative mb-16 h-64 overflow-hidden rounded-sm sm:h-80">
            <Image
              src="/images/houston-neighborhood.jpg"
              alt="Houston neighborhood we serve"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-cream">
              <MapPin className="mb-3 h-10 w-10 text-gold" />
              <p className="font-display text-3xl">Houston metro</p>
              <p className="mt-1 text-sm text-cream/75">{BUSINESS.serviceRadius}</p>
            </div>
          </div>

          <h2 className="text-center font-display text-3xl text-ink">Neighborhoods</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {NEIGHBORHOODS.map((n) => {
              const slug = NEIGHBORHOOD_DATA.find((d) => d.name === n)?.slug;
              const cls =
                'inline-flex items-center gap-1.5 border border-line bg-cream px-4 py-2 text-sm text-ink hover:border-copper';
              return slug ? (
                <Link key={n} href={`/handyman/${slug}`} className={cls}>
                  <MapPin className="h-3.5 w-3.5 text-copper" />
                  {n}
                </Link>
              ) : (
                <span key={n} className={cls}>
                  <MapPin className="h-3.5 w-3.5 text-copper" />
                  {n}
                </span>
              );
            })}
          </div>

          <h2 className="mt-16 text-center font-display text-3xl text-ink">Surrounding cities</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUBURBS.map(({ name, distance, fee }) => (
              <div key={name} className="flex items-center justify-between border border-line bg-cream p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-copper" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{name}</p>
                    <p className="text-xs text-muted">{distance}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-forest">{fee}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl text-ink">Don’t see your area?</h2>
          <p className="mt-3 text-muted">
            We sometimes serve just outside the radius for larger jobs. Tell us the address and we’ll say yes or no.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline">
              Call {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
