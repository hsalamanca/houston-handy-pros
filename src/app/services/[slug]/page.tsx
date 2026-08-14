import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, Phone } from 'lucide-react';
import { SERVICES, BUSINESS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import QuoteForm from '@/components/forms/QuoteForm';

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.title} in Houston, TX`,
    description: `Professional ${service.title.toLowerCase()} in Houston. ${service.description} Insured. Starting at ${service.priceRange}.`,
    alternates: { canonical: `https://houstonhandypros.com/services/${service.id}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} in Houston, TX`,
    description: service.longDescription,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: BUSINESS.name,
      telephone: '+18322150668',
    },
    areaServed: { '@type': 'City', name: 'Houston', addressRegion: 'TX' },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        description: service.priceRange,
      },
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-[#f5f5f7]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-[13px] font-medium text-muted">
              Houston handyman · {service.priceRange}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">{service.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/book">Book this service</Button>
              <Button href={BUSINESS.phoneHref} variant="secondary">
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-3xl text-ink">How we handle this in Houston</h2>
            <p className="mt-4 leading-relaxed text-muted">{service.longDescription}</p>
            <p className="mt-4 leading-relaxed text-muted">{service.houstonNote}</p>

            <h3 className="mt-10 font-display text-2xl text-ink">Common jobs</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.jobs.map((job) => (
                <li key={job} className="flex items-start gap-2 border border-line bg-cream p-4 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                  {job}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-[1.75rem] bg-[#f5f5f7] p-6 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Starting range</p>
            <p className="mt-2 font-display text-4xl text-ink">{service.priceRange}</p>
            <p className="mt-1 text-sm text-muted">Free estimate · approved before we start</p>
            <ul className="mt-6 space-y-2 text-sm text-ink/80">
              {[
                'Bonded & insured technicians',
                '1-year workmanship guarantee',
                'Same-week availability',
                'No travel fee in the metro',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-copper" />
                  {t}
                </li>
              ))}
            </ul>
            <Button href="/book" className="mt-6 w-full">
              Get a free quote
            </Button>
            <a
              href={BUSINESS.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink"
            >
              <Phone className="h-4 w-4 text-copper" />
              {BUSINESS.phone}
            </a>
          </aside>
        </div>
      </section>

      <section className="pb-20 bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-6 font-display text-2xl text-ink">Related services</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((s) => (
              <Link key={s.id} href={`/services/${s.id}`} className="group overflow-hidden rounded-[1.5rem] bg-[#f5f5f7]">
                <div className="relative h-36">
                  <Image src={s.image} alt={s.title} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-ink group-hover:text-copper">{s.title}</p>
                  <p className="text-xs text-muted">{s.priceRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-line bg-cream px-4 py-12 lg:hidden">
        <div className="mx-auto max-w-md">
          <QuoteForm />
        </div>
      </div>

      <CtaBand title={`Book ${service.shortTitle.toLowerCase()} this week.`} />
    </div>
  );
}
