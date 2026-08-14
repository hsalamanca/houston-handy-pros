import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Houston Handy Pros',
  description:
    'Call, email, or send a message to Houston Handy Pros. Same-week booking across Houston metro. Bonded and insured.',
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about the job."
        subtitle="Ready to book or just want a straight answer? A person answers the phone."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink">Reach us directly</h2>
            <div className="mt-8 space-y-5">
              {[
                { icon: Phone, label: 'Phone', value: BUSINESS.phone, href: BUSINESS.phoneHref },
                { icon: Mail, label: 'Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
                { icon: MapPin, label: 'Service area', value: BUSINESS.serviceRadius, href: '/service-area' },
                { icon: Clock, label: 'Hours', value: `${BUSINESS.hours} · Sunday closed`, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-ink text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="font-semibold text-ink hover:text-copper">
                        {value}
                      </a>
                    ) : (
                      <p className="font-semibold text-ink">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-line bg-cream p-6">
              <h3 className="font-semibold text-ink">Fastest way to book</h3>
              <p className="mt-2 text-sm text-muted">
                Call or use online booking for same-week appointments. Contact-form replies usually land in 4–8 hours.
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="mt-4 inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-semibold text-cream"
              >
                <Phone className="h-4 w-4" />
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
