import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import PageHero from '@/components/ui/PageHero';
import CtaBand from '@/components/ui/CtaBand';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Handyman Services in Houston, TX',
  description:
    'Carpentry, plumbing, electrical, drywall, flooring, pressure washing, fence repair, and commercial handyman services in Houston. Insured and guaranteed.',
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Whatever is on the list."
        subtitle="One crew for the jobs Houston homes actually need — from a dripping faucet in The Heights to a storm-downed fence in Katy."
      >
        <Button href="/book">Get a free estimate</Button>
      </PageHero>

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6">
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              className="grid overflow-hidden rounded-sm border border-line bg-cream md:grid-cols-2"
            >
              <div className={`relative min-h-[260px] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">
                  {service.priceRange}
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink">{service.title}</h2>
                <p className="mt-3 text-muted">{service.longDescription}</p>
                <ul className="mt-5 space-y-2">
                  {service.jobs.slice(0, 4).map((job) => (
                    <li key={job} className="flex items-start gap-2 text-sm text-ink/80">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                      {job}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-copper"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Not sure which service?" subtitle="Describe the problem. We’ll tell you what it is — and what it should cost." />
    </div>
  );
}
