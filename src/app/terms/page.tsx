import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Houston Handy Pros',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">Terms of Service</h1>
      <p className="text-gray-500 text-sm mb-10">Last updated: May 2026</p>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Services</h2>
          <p>Houston Handy Pros provides handyman and home repair services in the Houston, TX metropolitan area. Service availability is subject to technician scheduling and geographic service area limitations.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Bookings & Cancellations</h2>
          <p>Bookings must be cancelled at least 24 hours in advance to avoid a $49 cancellation fee. Same-day cancellations and no-shows may be charged the full minimum job fee. We reserve the right to cancel or reschedule due to weather, emergency, or technician unavailability.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Workmanship Guarantee</h2>
          <p>All labor performed by Houston Handy Pros is guaranteed for one (1) year from the date of service. If a defect in our workmanship is identified within this period, we will remedy it at no charge. This guarantee does not cover damage caused by misuse, third-party modifications, or normal wear and tear.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Payment</h2>
          <p>Payment is due upon completion of service unless otherwise agreed in writing. For jobs over $300, a 50% deposit is required at booking. We accept all major credit cards, Apple Pay, Google Pay, Venmo, and check.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Limitation of Liability</h2>
          <p>Our liability is limited to the value of the work performed. We are not responsible for pre-existing conditions or damage unrelated to our work. We carry $1,000,000 in general liability insurance.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Contact</h2>
          <p>Questions? Call <a href="tel:+17135550190" className="text-[#F5A623] hover:underline">(713) 555-0190</a> or email <a href="mailto:hello@houstonhandypros.com" className="text-[#F5A623] hover:underline">hello@houstonhandypros.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
