import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileCallBar from '@/components/layout/MobileCallBar';
import { BUSINESS } from '@/lib/constants';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Houston Handy Pros | Handyman Services in Houston, TX',
    template: '%s | Houston Handy Pros',
  },
  description:
    'Bonded and insured handyman serving Houston and the metro. Carpentry, plumbing, electrical, drywall, fencing, and more. Same-week booking. 1-year guarantee.',
  keywords: [
    'handyman Houston TX',
    'Houston handyman',
    'home repair Houston',
    'Houston handyman service',
    'fence repair Houston',
    'drywall repair Houston',
    'handyman Katy Sugar Land Pearland',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://houstonhandypros.com',
    siteName: 'Houston Handy Pros',
    title: 'Houston Handy Pros | Handyman Services in Houston, TX',
    description:
      'Bonded & insured. Same-week booking. 1-year workmanship guarantee. Serving Houston metro since 2015.',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Houston Handy Pros' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Houston Handy Pros | Handyman Services in Houston, TX',
    description: 'Bonded & insured handyman serving Greater Houston.',
    images: ['/images/hero.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://houstonhandypros.com' },
  metadataBase: new URL('https://houstonhandypros.com'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': 'https://houstonhandypros.com/#business',
  name: BUSINESS.name,
  description: "Bonded and insured handyman serving Houston and the surrounding metro since 2015.",
  url: 'https://houstonhandypros.com',
  telephone: '+18322150668',
  email: BUSINESS.email,
  image: 'https://houstonhandypros.com/images/hero.jpg',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77002',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 29.7604, longitude: -95.3698 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Houston' },
    { '@type': 'City', name: 'Sugar Land' },
    { '@type': 'City', name: 'Katy' },
    { '@type': 'City', name: 'Pearland' },
    { '@type': 'City', name: 'The Woodlands' },
    { '@type': 'City', name: 'Spring' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Handyman services',
    itemListElement: [
      'Carpentry',
      'Plumbing repairs',
      'Electrical',
      'Drywall & painting',
      'Flooring',
      'Pressure washing',
      'Fence & gate repair',
      'Commercial handyman',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name, areaServed: 'Houston, TX' },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f5f5f7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="pb-20 pt-14 md:pb-0">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
