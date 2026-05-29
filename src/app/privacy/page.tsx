import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Houston Handy Pros',
  description: 'Privacy policy for Houston Handy Pros.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-10">Last updated: May 2026</p>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Information We Collect</h2>
          <p>We collect information you provide when booking a service: name, email address, phone number, and service address. We also collect information about the services you request and how you interact with our website.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">How We Use It</h2>
          <p>We use your information to: confirm and fulfill your service bookings, send appointment reminders and follow-up communications, improve our services, and respond to your questions. We do not sell your personal information to third parties.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">SMS & Email Communications</h2>
          <p>By providing your phone number, you consent to receive SMS messages related to your booking (confirmation, reminders, technician dispatch notifications). You may opt out at any time by replying STOP. Standard message and data rates may apply.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Data Security</h2>
          <p>We use industry-standard encryption and security practices to protect your information. Payment information is processed securely through Stripe and is never stored on our servers.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#1B2A4A] mb-3">Contact</h2>
          <p>Questions about this policy? Email us at <a href="mailto:hello@houstonhandypros.com" className="text-[#F5A623] hover:underline">hello@houstonhandypros.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
