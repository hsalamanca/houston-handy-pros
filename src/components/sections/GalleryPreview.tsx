import Image from 'next/image';
import Link from 'next/link';
import { GALLERY } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function GalleryPreview() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Recent work"
          title="The finish is the point."
          subtitle="Ask for a walkthrough of similar work when you book."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group relative block aspect-[4/3] overflow-hidden rounded-[1.75rem]"
            >
              <Image
                src={item.image}
                alt={`${item.title} in ${item.location}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[12px] text-white/70">
                  {item.category} · {item.location}
                </p>
                <p className="mt-0.5 text-lg font-semibold tracking-tight text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="secondary">
            See the full gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
