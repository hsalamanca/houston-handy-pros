import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Hammer, Wrench, Zap, Paintbrush, Grid3X3, Droplets,
  Shield, Package, Monitor, Calendar, Building2, ArrowRight, CheckCircle
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Handyman Services in Houston, TX',
  description:
    'Complete handyman services in Houston — carpentry, plumbing, electrical, drywall, flooring, pressure washing, fence repair & more. Licensed, insured, guaranteed.',
};

const iconMap: Record<string, React.ElementType> = {
  Hammer, Wrench, Zap, PaintBucket: Paintbrush, Grid3X3, Droplets,
  Shield, Package, Monitor, Calendar, Building2,
};

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">What We Do</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-5">
            One Call. Every Job.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Whether it&apos;s a single faucet or a whole-house punch list, Houston Handy Pros is your single source for professional home repairs and maintenance.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-10 py-4 rounded-xl hover:bg-[#e8941a] transition-colors"
          >
            Book a Service
          </Link>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon] || Hammer;
              return (
                <div key={service.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="bg-[#1B2A4A] p-8 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#F5A623] flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-[#1B2A4A]" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">{service.title}</h2>
                      <p className="text-[#F5A623] font-semibold text-sm">{service.priceRange}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-5 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.jobs.map((job) => (
                        <li key={job} className="flex items-center gap-2 text-gray-700 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                          {job}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.id}`}
                      className="flex items-center gap-2 text-[#1B2A4A] font-bold text-sm hover:text-[#F5A623] transition-colors"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5A623] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-[#1B2A4A]/70 text-lg mb-8">
            Describe your project and we&apos;ll figure it out together — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-[#1B2A4A] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#2d3f6b] transition-colors"
            >
              Get Free Estimate
            </Link>
            <a
              href="tel:+17135550190"
              className="bg-white text-[#1B2A4A] font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Call (713) 555-0190
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
