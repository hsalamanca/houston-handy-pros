import Link from 'next/link';
import { Wrench, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#F8F9FA]">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-[#1B2A4A] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-10 h-10 text-[#F5A623]" />
        </div>
        <h1 className="text-6xl font-black text-[#1B2A4A] mb-2">404</h1>
        <h2 className="text-2xl font-bold text-[#1B2A4A] mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Looks like this page went missing — kind of like that one screw from your IKEA shelf. We can&apos;t find the page, but we can definitely fix the shelf.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#1B2A4A] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#2d3f6b] transition-colors"
          >
            Go Home <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/book"
            className="flex items-center justify-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-bold px-8 py-3 rounded-xl hover:bg-[#e8941a] transition-colors"
          >
            Book a Repair
          </Link>
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
}
