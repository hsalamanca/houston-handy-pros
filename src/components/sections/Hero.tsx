'use client';

import Link from 'next/link';
import { Phone, Star, Shield, CheckCircle, Clock } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#1B2A4A]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Orange accent blob */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 text-[#F5A623] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 fill-[#F5A623]" />
            {BUSINESS.rating} Stars · {BUSINESS.reviewCount}+ Google Reviews
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Houston&apos;s{' '}
            <span className="text-[#F5A623]">Go-To</span>
            <br />
            Handyman Service
          </h1>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            Stop Googling it. Stop putting it off. We fix it right, the first time — licensed, insured, and backed by our 1-year workmanship guarantee.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/book"
              className="flex items-center justify-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black text-lg px-8 py-4 rounded-xl hover:bg-[#e8941a] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Free Estimate
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/20 border border-white/20 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              {BUSINESS.phone}
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-4">
            {[
              { icon: Shield, text: 'Licensed & Insured' },
              { icon: CheckCircle, text: '1-Year Guarantee' },
              { icon: Clock, text: 'Same-Week Booking' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-[#F5A623]" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Stats cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: `${BUSINESS.jobsCompleted.toLocaleString()}+`, label: 'Jobs Completed', sub: 'in Houston metro' },
            { value: `${BUSINESS.rating}★`, label: 'Average Rating', sub: 'on Google' },
            { value: '24–48hr', label: 'Avg Response', sub: 'for new bookings' },
            { value: '10+', label: 'Years Serving', sub: 'Houston families' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-3xl font-black text-[#F5A623] mb-1">{stat.value}</div>
              <div className="text-white font-semibold text-sm">{stat.label}</div>
              <div className="text-white/50 text-xs mt-1">{stat.sub}</div>
            </div>
          ))}

          {/* Featured review */}
          <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />)}
            </div>
            <p className="text-white/80 text-sm italic leading-relaxed">
              &ldquo;Marcus fixed our leaky faucet AND noticed our disposal was about to fail. Saved us a flood. These guys are the real deal.&rdquo;
            </p>
            <p className="text-[#F5A623] text-xs font-semibold mt-2">— Sarah M., The Heights</p>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 74.7C120 69.3 240 58.7 360 53.3C480 48 600 48 720 53.3C840 58.7 960 69.3 1080 69.3C1200 69.3 1320 58.7 1380 53.3L1440 48V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
