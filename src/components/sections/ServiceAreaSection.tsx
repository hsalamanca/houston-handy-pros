import Image from 'next/image';
import Link from 'next/link';
import { NEIGHBORHOODS } from '@/lib/constants';
import { NEIGHBORHOOD_DATA } from '@/lib/neighborhoods';
import Button from '@/components/ui/Button';

export default function ServiceAreaSection() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-[13px] font-medium text-muted">Service area</p>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.12]">
            From The Heights to Katy — we come to you.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            Forty miles from downtown. No travel fee inside the metro.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {NEIGHBORHOODS.map((n) => {
              const slug = NEIGHBORHOOD_DATA.find((d) => d.name === n)?.slug;
              const className =
                'inline-flex items-center rounded-full bg-[#f5f5f7] px-3 py-1.5 text-[13px] text-ink/80 hover:bg-[#e8e8ed]';
              return slug ? (
                <Link key={n} href={`/handyman/${slug}`} className={className}>
                  {n}
                </Link>
              ) : (
                <span key={n} className={className}>
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

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/houston-neighborhood.jpg"
            alt="Houston Heights street with craftsman bungalows"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white/85 px-5 py-4 backdrop-blur-xl">
            <p className="text-lg font-semibold tracking-tight text-ink">Houston metro</p>
            <p className="text-sm text-muted">40-mile radius · no travel fee</p>
          </div>
        </div>
      </div>
    </section>
  );
}
