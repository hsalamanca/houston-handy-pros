import Link from 'next/link';
import {
  Hammer, Wrench, Zap, Paintbrush, Grid3X3, Droplets,
  Shield, Package, Monitor, Calendar, Building2, ArrowRight
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Hammer, Wrench, Zap, PaintBucket: Paintbrush, Grid3X3, Droplets,
  Shield, Package, Monitor, Calendar, Building2,
};

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">What We Fix</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-2 mb-4">
            One Call Handles It All
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From a single dripping faucet to a full home refresh before you list — we handle the jobs you don&apos;t have time for, the tools to do, or the patience to attempt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Hammer;
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group bg-[#F8F9FA] rounded-2xl p-6 hover:bg-[#1B2A4A] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1B2A4A] group-hover:bg-[#F5A623] flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#F5A623] group-hover:text-[#1B2A4A] transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-[#1B2A4A] group-hover:text-white text-base mb-2 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed mb-3 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#F5A623] font-bold text-sm">{service.priceRange}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#1B2A4A] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#2d3f6b] transition-colors"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
