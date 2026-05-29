import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Hammer, Wrench, Zap, Paintbrush, Grid3X3, Droplets,
  Shield, Package, Monitor, Calendar, Building2, CheckCircle, Phone, Star
} from 'lucide-react';
import { SERVICES, BUSINESS } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Hammer, Wrench, Zap, PaintBucket: Paintbrush, Grid3X3, Droplets,
  Shield, Package, Monitor, Calendar, Building2,
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.title} in Houston, TX`,
    description: `Professional ${service.title.toLowerCase()} in Houston. ${service.description} Licensed & insured. Starting at ${service.priceRange}.`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || Hammer;

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-14 h-14 rounded-xl bg-[#F5A623] flex items-center justify-center mb-5">
              <Icon className="w-7 h-7 text-[#1B2A4A]" />
            </div>
            <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Houston Handyman</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
              {service.title}
            </h1>
            <p className="text-white/70 text-lg mb-6">{service.description}</p>
            <div className="flex gap-3">
              <Link
                href="/book"
                className="bg-[#F5A623] text-[#1B2A4A] font-black px-8 py-3 rounded-xl hover:bg-[#e8941a] transition-colors"
              >
                Book Now
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-[#F5A623] font-bold text-sm uppercase tracking-wider mb-4">Starting Price</p>
            <p className="text-white text-4xl font-black mb-2">{service.priceRange}</p>
            <p className="text-white/50 text-sm mb-6">Free estimate · No commitment required</p>
            <div className="space-y-2">
              {[
                'Licensed & insured technicians',
                '1-year workmanship guarantee',
                'Same-week availability',
                'Upfront pricing before we start',
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs list */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-6 text-center">Common Jobs We Handle</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {service.jobs.map((job) => (
              <div key={job} className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-xl">
                <CheckCircle className="w-5 h-5 text-[#F5A623] shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{job}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + CTA */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { value: '4.9★', label: 'Google Rating', sub: '847+ reviews' },
              { value: '3,200+', label: 'Jobs Done', sub: 'In Houston metro' },
              { value: '1-Year', label: 'Guarantee', sub: 'On all labor' },
            ].map(({ value, label, sub }) => (
              <div key={label} className="bg-white rounded-xl p-5 text-center shadow-sm">
                <p className="text-[#F5A623] font-black text-2xl">{value}</p>
                <p className="text-[#1B2A4A] font-bold text-sm mt-1">{label}</p>
                <p className="text-gray-500 text-xs">{sub}</p>
              </div>
            ))}
          </div>

          {/* Mini reviews */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />)}
            </div>
            <p className="text-gray-700 italic text-sm mb-3">
              &ldquo;Incredible work. On time, professional, and the price was exactly what they quoted. I won&apos;t use anyone else.&rdquo;
            </p>
            <p className="text-gray-500 text-xs">— Houston homeowner</p>
          </div>

          <div className="text-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-12 py-4 rounded-xl hover:bg-[#e8941a] transition-colors text-lg"
            >
              Book {service.title}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
