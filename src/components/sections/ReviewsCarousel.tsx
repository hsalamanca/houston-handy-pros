'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS } from '@/lib/constants';
import Link from 'next/link';

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Real Houstonians</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-2 mb-2">
            Don&apos;t Take Our Word for It
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#F5A623] text-[#F5A623]" />)}
            <span className="text-[#1B2A4A] font-bold ml-2">4.9 / 5.0</span>
            <span className="text-gray-500">· 847 Google Reviews</span>
          </div>
        </div>

        {/* Featured review */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg relative">
            <Quote className="w-10 h-10 text-[#F5A623] opacity-30 absolute top-6 left-6" />
            <div className="flex gap-1 mb-4">
              {[...Array(REVIEWS[current].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F5A623] text-[#F5A623]" />
              ))}
            </div>
            <p className="text-[#1B2A4A] text-lg sm:text-xl leading-relaxed font-medium italic mb-6">
              &ldquo;{REVIEWS[current].text}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#1B2A4A]">{REVIEWS[current].name}</p>
                <p className="text-gray-500 text-sm">{REVIEWS[current].neighborhood} · {REVIEWS[current].service}</p>
              </div>
              <span className="text-gray-400 text-xs">{REVIEWS[current].date}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow border flex items-center justify-center hover:bg-[#1B2A4A] hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-[#F5A623]' : 'bg-gray-300'}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow border flex items-center justify-center hover:bg-[#1B2A4A] hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* All reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>
              <p className="text-gray-700 text-sm italic leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
              <div>
                <p className="font-semibold text-[#1B2A4A] text-sm">{review.name}</p>
                <p className="text-gray-400 text-xs">{review.neighborhood} · {review.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 border-2 border-[#1B2A4A] text-[#1B2A4A] font-bold px-8 py-3 rounded-xl hover:bg-[#1B2A4A] hover:text-white transition-colors"
          >
            Read All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
