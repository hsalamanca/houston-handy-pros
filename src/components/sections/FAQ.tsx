'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { BUSINESS, FAQS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad bg-cream">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Questions"
          title="What Houston homeowners ask first."
        />

        <div className="divide-y divide-line">
          {FAQS.map((faq, i) => (
            <div key={faq.q}>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-[17px] font-medium tracking-tight text-ink">{faq.q}</span>
                {open === i ? (
                  <Minus className="h-4 w-4 shrink-0 text-muted" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-muted" />
                )}
              </button>
              {open === i && (
                <p className="pb-5 text-[15px] leading-relaxed text-muted">{faq.a}</p>
              )}
            </div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />

        <p className="mt-10 text-center text-sm text-muted">
          Still deciding?{' '}
          <a href={BUSINESS.phoneHref} className="font-medium text-copper hover:underline">
            Call {BUSINESS.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
