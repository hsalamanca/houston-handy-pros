import type { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { REVIEWS, BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Customer Reviews — Houston Handyman',
  description:
    `Houston Handy Pros has ${BUSINESS.reviewCount}+ 5-star reviews on Google. Read what Houston homeowners say about our handyman services.`,
};

export default function ReviewsPage() {
  return (
    <div>
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">What People Say</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-5">
            {BUSINESS.reviewCount}+ Five-Star Reviews
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-7 h-7 fill-[#F5A623] text-[#F5A623]" />)}
          </div>
          <p className="text-white/60 text-lg">{BUSINESS.rating} average · Google, Yelp & Nextdoor</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          {/* Rating breakdown */}
          <div className="bg-white rounded-2xl p-8 mb-12 max-w-lg mx-auto shadow-sm">
            <h2 className="font-black text-[#1B2A4A] text-xl mb-6 text-center">Rating Breakdown</h2>
            {[
              { stars: 5, pct: 91 },
              { stars: 4, pct: 6 },
              { stars: 3, pct: 2 },
              { stars: 2, pct: 0.5 },
              { stars: 1, pct: 0.5 },
            ].map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-600 w-4">{stars}</span>
                <Star className="w-3.5 h-3.5 text-[#F5A623] fill-[#F5A623]" />
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-[#F5A623] h-2 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-10 text-right">{pct}%</span>
              </div>
            ))}
          </div>

          {/* Reviews grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="border-t pt-3">
                  <p className="font-bold text-[#1B2A4A] text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.neighborhood} · {review.service} · {review.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-10 py-4 rounded-xl hover:bg-[#e8941a] transition-colors"
            >
              Join Our Happy Customers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
