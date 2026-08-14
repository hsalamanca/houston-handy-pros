import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { NEIGHBORHOODS } from '@/lib/constants';
import { NEIGHBORHOOD_DATA } from '@/lib/neighborhoods';
import Button from '@/components/ui/Button';

export default function ServiceAreaSection() {
  return (
    <section className="section-pad bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-copper">
            Service area
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-[2.6rem]">
            From The Heights to Katy — we come to you.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Forty miles from downtown. No travel fee inside the metro. Neighborhood pages below
            if you want the local version of the story.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {NEIGHBORHOODS.map((n) => {
              const slug = NEIGHBORHOOD_DATA.find((d) => d.name === n)?.slug;
              const className =
                'inline-flex items-center gap-1 rounded-full border border-line bg-cream px-3 py-1 text-xs text-ink/80 hover:border-copper';
              return slug ? (
                <Link key={n} href={`/handyman/${slug}`} className={className}>
                  <MapPin className="h-3 w-3 text-copper" />
                  {n}
                </Link>
              ) : (
                <span key={n} className={className}>
                  <MapPin className="h-3 w-3 text-copper" />
                  {n}
                </span>
              );
            })}
          </div>

          <div className="mt-8">
            <Button href="/service-area" variant="secondary">
              Check my area
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src="/images/houston-neighborhood.jpg"
            alt="Houston Heights street with craftsman bungalows"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-4 left-4 right-4 border border-white/15 bg-ink/80 p-4 text-cream backdrop-blur-sm">
            <p className="font-display text-xl">Houston metro</p>
            <p className="text-sm text-cream/70">40-mile radius · no travel fee</p>
          </div>
        </div>
      </div>
    </section>
  );
}
