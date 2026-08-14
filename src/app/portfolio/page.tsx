import type { Metadata } from 'next';
import Image from 'next/image';
import { GALLERY } from '@/lib/constants';
import PageHero from '@/components/ui/PageHero';
import CtaBand from '@/components/ui/CtaBand';

export const metadata: Metadata = {
  title: 'Project Gallery — Houston Handyman Work',
  description:
    'See recent Houston Handy Pros projects: fence repair, drywall, flooring, TV mounting, and more across Houston, Katy, Sugar Land, and Pearland.',
};

export default function PortfolioPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our work"
        title="Before the punch list. After the walkthrough."
        subtitle="A sample of recent Houston jobs. Ask for photos of similar work when you book."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {GALLERY.map((project) => (
            <article key={project.id} className="overflow-hidden border border-line bg-cream">
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={`${project.title} in ${project.location}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  <span className="bg-ink/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream">
                    After
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">
                  {project.category}
                </p>
                <h3 className="mt-1 font-display text-xl text-ink">{project.title}</h3>
                <p className="mt-1 text-sm text-muted">{project.location}, Houston TX</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Want results like these?" subtitle="Book a visit. We’ll photograph the finish so you have a record." />
    </div>
  );
}
