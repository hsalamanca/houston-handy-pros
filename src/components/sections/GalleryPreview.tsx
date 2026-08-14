import Image from 'next/image';
import Link from 'next/link';
import { GALLERY } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function GalleryPreview() {
  return (
    <section className="section-pad bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Recent work"
          title="The finish is the point."
          subtitle="Real Houston jobs. Ask for a walkthrough of similar work when you book."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group relative block aspect-[4/3] overflow-hidden rounded-sm"
            >
              <Image
                src={item.image}
                alt={`${item.title} in ${item.location}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {item.category} · {item.location}
                </p>
                <p className="mt-1 font-display text-lg text-cream">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/portfolio" variant="outline">
            See the full gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
