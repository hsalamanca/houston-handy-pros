import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="What we handle"
          title="One crew. The whole list."
          subtitle="Houston humidity, clay soil, and storm season create a specific set of jobs. We do those jobs — and we do them once."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group overflow-hidden rounded-[1.75rem] bg-[#f5f5f7] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-[13px] text-muted">{service.priceRange}</p>
                <h3 className="mt-1 text-[21px] font-semibold tracking-tight text-ink">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {limit && (
          <div className="mt-12 text-center">
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
