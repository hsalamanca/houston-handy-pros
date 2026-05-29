import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { NEIGHBORHOODS } from '@/lib/constants';

export default function ServiceAreaSection() {
  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Where We Work</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-2 mb-4">
              Serving All of Greater Houston
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              From The Heights to Sugar Land, Katy to The Woodlands — if you&apos;re within 40 miles of downtown Houston, we&apos;ve got you covered. No travel fees within our standard service area.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {NEIGHBORHOODS.map((n) => (
                <span key={n} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                  <MapPin className="w-3 h-3 text-[#F5A623]" />
                  {n}
                </span>
              ))}
            </div>

            <Link
              href="/service-area"
              className="inline-flex items-center gap-2 bg-[#1B2A4A] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#2d3f6b] transition-colors"
            >
              Check My Area
            </Link>
          </div>

          {/* Map placeholder */}
          <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl bg-[#1B2A4A]">
            {/* Stylized map fallback */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <MapPin className="w-16 h-16 text-[#F5A623] mb-4" />
              <p className="text-white font-bold text-xl mb-2">Houston Metro Area</p>
              <p className="text-white/60 text-sm">40-mile service radius from downtown Houston</p>
              <div className="mt-6 w-full max-w-xs">
                <div className="bg-white/10 rounded-full h-2 mb-2">
                  <div className="bg-[#F5A623] h-2 rounded-full w-[85%]" />
                </div>
                <p className="text-white/50 text-xs">85% of Houston metro covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
