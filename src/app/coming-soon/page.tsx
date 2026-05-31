import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import ComingSoonForm from './ComingSoonForm';

export const metadata: Metadata = {
  title: 'Coming Soon | Houston Handy Pros',
  description:
    "Houston's trusted handyman service is launching soon. Licensed, bonded & insured. Leave your info and we'll reach out when we're live.",
};

const features = [
  'Licensed, bonded & insured',
  '1-year workmanship guarantee',
  'Same-week availability',
  'Serving all of Houston metro',
];

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#1B2A4A] flex flex-col">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-xl bg-[#F5A623] flex items-center justify-center">
            <span className="text-[#1B2A4A] font-black text-2xl">H</span>
          </div>
          <div>
            <p className="text-white font-black text-xl leading-none">Houston Handy Pros</p>
            <p className="text-[#F5A623] text-xs mt-0.5">Est. {BUSINESS.founded}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-2xl w-full text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 text-[#F5A623] text-sm font-bold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
            Launching Soon in Houston
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            Your Neighborhood<br />
            <span className="text-[#F5A623]">Handyman</span> Is Coming
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-8">
            We&apos;re putting the finishing touches on Houston&apos;s most professional handyman service. Leave your email and be first to book when we go live — early customers get <strong className="text-[#F5A623]">15% off their first job</strong>.
          </p>

          {/* Email capture form */}
          <ComingSoonForm />
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full mb-10">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
              <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
              <span className="text-white/80 text-xs">{f}</span>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-white/60 text-sm">
          <a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-[#F5A623] transition-colors">
            <Phone className="w-4 h-4" />
            {BUSINESS.phone}
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-[#F5A623] transition-colors">
            <Mail className="w-4 h-4" />
            {BUSINESS.email}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Houston, TX
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {BUSINESS.hours}
          </span>
        </div>
      </div>

      <p className="relative text-center text-white/20 text-xs pb-6">
        © {new Date().getFullYear()} Houston Handy Pros. All rights reserved.
      </p>
    </div>
  );
}
