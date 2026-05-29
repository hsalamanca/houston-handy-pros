import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, CheckCircle, Star, Phone, Shield, Clock } from 'lucide-react';
import { NEIGHBORHOOD_DATA, getNeighborhood } from '@/lib/neighborhoods';
import { SERVICES, BUSINESS, REVIEWS } from '@/lib/constants';

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
    description: `Licensed handyman in ${data.name}, Houston. Plumbing, carpentry, drywall, electrical & more. ${data.homeType}. Same-week booking, 1-year guarantee.`,
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

  // Pick 3 relevant reviews
  const localReviews = REVIEWS.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-[#F5A623] text-sm font-bold mb-4">
              <MapPin className="w-4 h-4" />
              {data.type === 'suburb' ? 'Serving' : 'Houston'} · {data.name}
              {data.zip && ` · ${data.zip}`}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              Handyman Services<br />
              in <span className="text-[#F5A623]">{data.name}</span>
            </h1>
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              {data.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-8 py-4 rounded-xl hover:bg-[#e8941a] transition-colors"
              >
                Get Free Estimate
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {BUSINESS.phone}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-[#F5A623] font-bold text-sm uppercase tracking-wider mb-3">
                Common {data.name} Jobs We Handle
              </p>
              <ul className="space-y-2">
                {data.commonIssues.map((issue) => (
                  <li key={issue} className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Home Type</p>
              <p className="text-white text-sm font-medium">{data.homeType}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-[#F8F9FA] py-10 px-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: Shield, label: 'Licensed & Insured', sub: 'TCLP #12345678' },
            { icon: Star, label: `${BUSINESS.rating} Stars`, sub: `${BUSINESS.reviewCount}+ reviews` },
            { icon: CheckCircle, label: '1-Year Guarantee', sub: 'On all labor' },
            { icon: Clock, label: 'Same-Week', sub: 'Availability' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#1B2A4A] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#F5A623]" />
              </div>
              <p className="font-bold text-[#1B2A4A] text-sm">{label}</p>
              <p className="text-gray-500 text-xs">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-2 text-center">
            All Services Available in {data.name}
          </h2>
          <p className="text-gray-600 text-center mb-10">
            No travel fee · Licensed & insured · 1-year guarantee
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="flex items-start gap-3 p-4 bg-[#F8F9FA] rounded-xl hover:bg-[#1B2A4A] group transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1B2A4A] group-hover:text-white text-sm transition-colors">
                    {service.title}
                  </p>
                  <p className="text-[#F5A623] text-xs font-medium mt-0.5">{service.priceRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local reviews */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-8 text-center">
            What Houston Customers Say
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {localReviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="font-bold text-[#1B2A4A] text-sm">{review.name}</p>
                <p className="text-gray-400 text-xs">{review.neighborhood} · {review.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Houston Handy Pros',
            description: `Licensed handyman services in ${data.name}, Houston TX`,
            url: `https://houstonhandypros.com/handyman/${data.slug}`,
            telephone: '+17135550190',
            areaServed: {
              '@type': 'Place',
              name: data.name,
              containedInPlace: { '@type': 'City', name: 'Houston', addressRegion: 'TX' },
            },
          }),
        }}
      />

      {/* CTA */}
      <section className="py-16 px-4 bg-[#1B2A4A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Ready to Fix It in {data.name}?
          </h2>
          <p className="text-white/60 mb-8">
            Book online in 60 seconds. Same-week availability. No surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="bg-[#F5A623] text-[#1B2A4A] font-black px-10 py-4 rounded-xl hover:bg-[#e8941a] transition-colors"
            >
              Book My Free Estimate
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
