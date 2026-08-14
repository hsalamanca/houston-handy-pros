import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section className="section-pad bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we handle"
          title="One crew. The whole list."
          subtitle="Houston humidity, clay soil, and storm season create a specific set of jobs. We do those jobs — and we do them once."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group overflow-hidden rounded-sm border border-line bg-cream transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute bottom-3 left-3 rounded-sm bg-ink/80 px-2.5 py-1 text-xs font-semibold text-gold">
                  {service.priceRange}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-ink">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-copper">
                  View service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {limit && (
          <div className="mt-10 text-center">
            <Button href="/services" variant="secondary">
              View all services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
