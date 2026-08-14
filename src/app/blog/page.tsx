import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Handyman Tips & Resources — Houston Home Repair Blog',
  description:
    'Houston home repair tips, cost guides, and maintenance advice from Houston Handy Pros.',
};

const posts = [
  {
    slug: 'best-handyman-services-houston',
    title: 'Best Handyman Services in Houston, TX (2026 Guide)',
    excerpt: 'What to look for, red flags to avoid, and why licensed matters more than a cheap hourly rate.',
    category: 'Guides',
    readTime: '8 min read',
    date: 'May 2026',
  },
  {
    slug: 'how-much-does-handyman-cost-houston',
    title: 'How Much Does a Handyman Cost in Houston?',
    excerpt: 'Hourly rates, flat-rate jobs, and what actually drives the price up.',
    category: 'Pricing',
    readTime: '6 min read',
    date: 'April 2026',
  },
  {
    slug: 'home-repairs-houston-humid-climate',
    title: "10 Home Repairs You Shouldn't Put Off in Houston's Humid Climate",
    excerpt: 'Heat and humidity create specific problems. These ten escalate fast — and cost more when ignored.',
    category: 'Maintenance',
    readTime: '7 min read',
    date: 'March 2026',
  },
  {
    slug: 'property-managers-reliable-handyman',
    title: 'Houston Property Managers: Why You Need a Handyman on Speed Dial',
    excerpt: 'Managing rentals without a trusted crew is a Friday-night emergency waiting to happen.',
    category: 'Property Management',
    readTime: '5 min read',
    date: 'March 2026',
  },
  {
    slug: 'licensed-vs-unlicensed-handyman-texas',
    title: 'Licensed vs. Unlicensed Handyman in Texas',
    excerpt: 'Unlicensed work is legal up to a point. Know the line before someone opens a wall.',
    category: 'Guides',
    readTime: '6 min read',
    date: 'February 2026',
  },
];

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Knowledge"
        title="Houston home repair, without the fluff."
        subtitle="Straight talk on maintenance, costs, and when to call a pro — from people who do this every day."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <article className="mb-10 border border-line bg-ink p-8 text-cream sm:p-10">
            <span className="inline-block bg-copper px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
              Featured
            </span>
            <h2 className="mt-4 font-display text-3xl">{posts[0].title}</h2>
            <p className="mt-3 text-cream/70">{posts[0].excerpt}</p>
            <Button href={`/blog/${posts[0].slug}`} className="mt-6">
              Read article <ArrowRight className="h-4 w-4" />
            </Button>
          </article>

          <div className="grid gap-5 sm:grid-cols-2">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-line bg-cream p-6 hover:border-copper"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-copper">
                  {post.category}
                </span>
                <h3 className="mt-2 font-display text-xl text-ink group-hover:text-copper">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} · {post.date}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
