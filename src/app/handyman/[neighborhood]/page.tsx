import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, CheckCircle, Phone, Shield, Clock } from 'lucide-react';
import { NEIGHBORHOOD_DATA, getNeighborhood } from '@/lib/neighborhoods';
import { SERVICES, BUSINESS } from '@/lib/constants';
import Button from '@/components/ui/Button';

export async function generateStaticParams() {
  return NEIGHBORHOOD_DATA.map((n) => ({ neighborhood: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
  const { neighborhood } = await params;
  const data = getNeighborhood(neighborhood);
  if (!data) return {};
  return {
    title: `Handyman Services in ${data.name}, Houston TX`,
    description: `Handyman in ${data.name}, Houston. Plumbing, carpentry, drywall, electrical & more. ${data.homeType}. Same-week booking, 1-year guarantee.`,
    alternates: { canonical: `https://houstonhandypros.com/handyman/${data.slug}` },
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}) {
  const { neighborhood } = await params;
  const data = getNeighborhood(neighborhood);
  if (!data) notFound();

  return (
    <div>
      <section className="bg-ink py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gold">
              <MapPin className="h-4 w-4" />
              {data.type === 'suburb' ? 'Serving' : 'Houston'} · {data.name}
              {data.zip && ` · ${data.zip}`}
            </div>
            <h1 className="font-display text-4xl font-medium leading-tight text-cream sm:text-5xl">
              Handyman services
              <br />
              in <span className="text-gold">{data.name}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-cream/70">{data.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/book">Get free estimate</Button>
              <Button href={BUSINESS.phoneHref} variant="ghost">
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Common {data.name} jobs
              </p>
              <ul className="space-y-2">
                {data.commonIssues.map((issue) => (
                  <li key={issue} className="flex items-center gap-2 text-sm text-cream/80">
                    <CheckCircle className="h-4 w-4 shrink-0 text-gold" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wider text-cream/50">Home type</p>
              <p className="mt-1 text-sm font-medium text-cream">{data.homeType}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 text-center sm:grid-cols-3 sm:px-6">
          {[
            { icon: Shield, label: 'Bonded & insured', sub: BUSINESS.insurance },
            { icon: CheckCircle, label: '1-year guarantee', sub: 'On all labor' },
            { icon: Clock, label: 'Same-week', sub: 'Availability' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="h-5 w-5 text-copper" />
              <p className="text-sm font-semibold text-ink">{label}</p>
              <p className="text-xs text-muted">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl text-ink">
            All services available in {data.name}
          </h2>
          <p className="mt-2 text-center text-muted">No travel fee · Insured · 1-year guarantee</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="flex items-start gap-3 border border-line bg-cream p-4 hover:border-copper"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                <div>
                  <p className="text-sm font-semibold text-ink">{service.title}</p>
                  <p className="mt-0.5 text-xs text-copper">{service.priceRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HomeAndConstructionBusiness',
            name: 'Houston Handy Pros',
            description: `Handyman services in ${data.name}, Houston TX`,
            url: `https://houstonhandypros.com/handyman/${data.slug}`,
            telephone: '+18322150668',
            areaServed: {
              '@type': 'Place',
              name: data.name,
              containedInPlace: { '@type': 'City', name: 'Houston', addressRegion: 'TX' },
            },
          }),
        }}
      />

      <section className="bg-ink py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl text-cream">Ready to fix it in {data.name}?</h2>
          <p className="mt-3 text-cream/65">Book online in a minute. Same-week availability.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/book">Book my free estimate</Button>
            <Button href={BUSINESS.phoneHref} variant="ghost">
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
