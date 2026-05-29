import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileCallBar from '@/components/layout/MobileCallBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Houston Handy Pros | Licensed Handyman Services in Houston, TX',
    template: '%s | Houston Handy Pros',
  },
  description:
    "Houston's most trusted handyman service. Licensed, bonded & insured. Plumbing, carpentry, electrical, drywall, flooring & more. Book online today — same-week availability.",
  keywords: [
    'handyman Houston TX',
    'home repair Houston',
    'licensed handyman near me',
    'Houston handyman service',
    'home maintenance Houston',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://houstonhandypros.com',
    siteName: 'Houston Handy Pros',
    title: 'Houston Handy Pros | Licensed Handyman Services',
    description: "Houston's most trusted handyman service. Licensed, bonded & insured.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Houston Handy Pros' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Houston Handy Pros | Licensed Handyman Services',
    description: "Houston's most trusted handyman service. Licensed, bonded & insured.",
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://houstonhandypros.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1B2A4A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Houston Handy Pros',
              description: "Houston's most trusted handyman service.",
              url: 'https://houstonhandypros.com',
              telephone: '+17135550190',
              email: 'hello@houstonhandypros.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Houston',
                addressRegion: 'TX',
                addressCountry: 'US',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 29.7604, longitude: -95.3698 },
              openingHours: 'Mo-Sa 07:00-19:00',
              priceRange: '$$',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '847',
              },
              areaServed: { '@type': 'City', name: 'Houston' },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="pt-[88px] pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
