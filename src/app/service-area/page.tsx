import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, CheckCircle } from 'lucide-react';
import { NEIGHBORHOODS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Handyman Service Area — Houston TX & Surrounding Areas',
  description:
    'Houston Handy Pros serves all of Houston and surrounding cities: Sugar Land, Katy, Pearland, The Woodlands, Spring, and more. 40-mile service radius.',
};

const suburbs = [
  { name: 'Sugar Land', distance: '22 miles SW', fee: 'No travel fee' },
  { name: 'Katy', distance: '30 miles W', fee: 'No travel fee' },
  { name: 'Pearland', distance: '20 miles S', fee: 'No travel fee' },
  { name: 'The Woodlands', distance: '28 miles N', fee: 'No travel fee' },
  { name: 'Spring', distance: '23 miles N', fee: 'No travel fee' },
  { name: 'Humble', distance: '20 miles NE', fee: 'No travel fee' },
  { name: 'Pasadena', distance: '15 miles E', fee: 'No travel fee' },
  { name: 'Friendswood', distance: '25 miles SE', fee: 'No travel fee' },
  { name: 'Missouri City', distance: '18 miles SW', fee: 'No travel fee' },
  { name: 'Stafford', distance: '22 miles SW', fee: 'No travel fee' },
  { name: 'Cypress', distance: '25 miles NW', fee: 'No travel fee' },
  { name: 'League City', distance: '30 miles SE', fee: 'No travel fee' },
];

export default function ServiceAreaPage() {
  return (
    <div>
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Coverage</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-5">
            We Come to You
          </h1>
          <p className="text-white/70 text-lg">
            Serving Houston and the entire metro area within a 40-mile radius. No hidden travel fees within our standard service area.
          </p>
        </div>
      </section>

      {/* Map placeholder + neighborhoods */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Map */}
          <div className="bg-[#1B2A4A] rounded-3xl h-64 sm:h-80 flex items-center justify-center mb-16 relative overflow-hidden">
            <div className="text-center z-10">
              <MapPin className="w-14 h-14 text-[#F5A623] mx-auto mb-3" />
              <p className="text-white font-bold text-xl">Houston Metro Service Area</p>
              <p className="text-white/60 text-sm mt-1">40-mile radius from downtown Houston</p>
            </div>
          </div>

          {/* Houston neighborhoods */}
          <div className="mb-16">
            <h2 className="text-2xl font-black text-[#1B2A4A] mb-6 text-center">Houston Neighborhoods We Serve</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {NEIGHBORHOODS.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 bg-[#F8F9FA] border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F5A623]" />
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Suburbs */}
          <div>
            <h2 className="text-2xl font-black text-[#1B2A4A] mb-6 text-center">Surrounding Cities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suburbs.map(({ name, distance, fee }) => (
                <div key={name} className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#F5A623] shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1B2A4A] text-sm">{name}</p>
                      <p className="text-gray-500 text-xs">{distance}</p>
                    </div>
                  </div>
                  <span className="text-green-600 text-xs font-semibold">{fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outside area CTA */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-3">Don&apos;t See Your Area?</h2>
          <p className="text-gray-600 mb-6">We may still be able to help. Contact us and we&apos;ll let you know — we occasionally serve areas just outside our standard radius for larger jobs.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="bg-[#1B2A4A] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#2d3f6b] transition-colors">
              Contact Us
            </Link>
            <a href="tel:+17135550190" className="bg-white border border-gray-200 text-[#1B2A4A] font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Call (713) 555-0190
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
