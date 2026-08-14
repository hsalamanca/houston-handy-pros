'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { BUSINESS, FAQS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Questions"
          title="What Houston homeowners ask first."
        />

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="border border-line bg-paper">
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-ink">{faq.q}</span>
                {open === i ? (
                  <Minus className="h-4 w-4 shrink-0 text-copper" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-muted" />
                )}
              </button>
              {open === i && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{faq.a}</p>
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
          <a href={BUSINESS.phoneHref} className="font-semibold text-copper">
            Call {BUSINESS.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
