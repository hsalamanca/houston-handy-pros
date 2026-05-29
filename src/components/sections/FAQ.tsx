'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '@/lib/constants';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-2 mb-4">
            We&apos;ve Got Answers
          </h2>
          <p className="text-gray-600">The most common questions Houston homeowners ask us before booking.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-[#F8F9FA] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-[#1B2A4A] text-base">{faq.q}</span>
                {open === i
                  ? <Minus className="w-5 h-5 text-[#F5A623] shrink-0" />
                  : <Plus className="w-5 h-5 text-gray-400 shrink-0" />}
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="tel:+17135550190"
            className="inline-flex items-center gap-2 bg-[#1B2A4A] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#2d3f6b] transition-colors"
          >
            Call Us — We&apos;re Friendly
          </a>
        </div>
      </div>
    </section>
  );
}
