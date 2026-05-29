import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Handyman Tips & Resources — Houston Home Repair Blog',
  description:
    'Houston home repair tips, cost guides, and maintenance advice from the pros at Houston Handy Pros.',
};

const posts = [
  {
    slug: 'best-handyman-services-houston',
    title: 'Best Handyman Services in Houston, TX (2025 Guide)',
    excerpt: 'Looking for a reliable handyman in Houston? We break down what to look for, red flags to avoid, and why licensed matters more than you think.',
    category: 'Guides',
    readTime: '8 min read',
    date: 'May 2025',
  },
  {
    slug: 'how-much-does-handyman-cost-houston',
    title: 'How Much Does a Handyman Cost in Houston?',
    excerpt: 'Hourly rates, flat-rate jobs, and what drives prices up — a straight-talk breakdown of what you should expect to pay for handyman services in Houston.',
    category: 'Pricing',
    readTime: '6 min read',
    date: 'April 2025',
  },
  {
    slug: 'home-repairs-houston-humid-climate',
    title: '10 Home Repairs You Shouldn\'t Put Off in Houston\'s Humid Climate',
    excerpt: 'Houston\'s heat and humidity create specific problems for homes. These 10 issues escalate fast — and cost 3x more when ignored.',
    category: 'Maintenance',
    readTime: '7 min read',
    date: 'March 2025',
  },
  {
    slug: 'property-managers-reliable-handyman',
    title: 'Houston Property Managers: Why You Need a Reliable Handyman on Speed Dial',
    excerpt: 'Managing multiple rental units in Houston without a trusted handyman is a disaster waiting to happen. Here\'s how to find one worth keeping.',
    category: 'Property Management',
    readTime: '5 min read',
    date: 'March 2025',
  },
  {
    slug: 'licensed-vs-unlicensed-handyman-texas',
    title: 'Licensed vs. Unlicensed Handyman in Texas: What Homeowners Need to Know',
    excerpt: 'In Texas, unlicensed handymen are legal — up to a point. Know the difference before you hire someone to work on your home.',
    category: 'Guides',
    readTime: '6 min read',
    date: 'February 2025',
  },
  {
    slug: 'home-repairs-houston-humid-climate',
    title: "10 Home Repairs You Shouldn't Put Off in Houston's Humid Climate",
    excerpt: "Houston's heat and humidity create specific problems for homes. These 10 issues escalate fast — and cost 3x more when ignored.",
    category: 'Maintenance',
    readTime: '7 min read',
    date: 'March 2025',
  },
  {
    slug: 'property-managers-reliable-handyman',
    title: 'Houston Property Managers: Why You Need a Reliable Handyman on Speed Dial',
    excerpt: "Managing multiple rental units in Houston without a trusted handyman is a disaster waiting to happen. Here's how to find one worth keeping.",
    category: 'Property Management',
    readTime: '5 min read',
    date: 'March 2025',
  },
  {
    slug: 'licensed-vs-unlicensed-handyman-texas',
    title: 'Licensed vs. Unlicensed Handyman in Texas: What Homeowners Need to Know',
    excerpt: "In Texas, unlicensed handymen are legal — up to a point. Know the difference before you hire someone to work on your home.",
    category: 'Guides',
    readTime: '6 min read',
    date: 'February 2025',
  },
];

const categories = ['All', 'Guides', 'Pricing', 'Maintenance', 'Property Management'];

export default function BlogPage() {
  return (
    <div>
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Knowledge Base</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-5">
            Houston Home Repair Tips
          </h1>
          <p className="text-white/70 text-lg">
            Straight talk about home maintenance, repair costs, and when to call a pro — from people who do this every day.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Featured post */}
          <div className="bg-[#1B2A4A] rounded-3xl p-8 sm:p-10 mb-12 text-white">
            <span className="inline-block bg-[#F5A623] text-[#1B2A4A] text-xs font-bold px-3 py-1 rounded-full mb-4">Featured</span>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">{posts[0].title}</h2>
            <p className="text-white/70 leading-relaxed mb-6">{posts[0].excerpt}</p>
            <Link
              href={`/blog/${posts[0].slug}`}
              className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-bold px-6 py-3 rounded-xl hover:bg-[#e8941a] transition-colors text-sm"
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                  cat === 'All' ? 'bg-[#1B2A4A] text-white' : 'bg-[#F8F9FA] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <span className="inline-block bg-[#F8F9FA] text-[#F5A623] text-xs font-bold px-3 py-1 rounded-full mb-3">{post.category}</span>
                <h3 className="font-black text-[#1B2A4A] text-base mb-2 group-hover:text-[#F5A623] transition-colors leading-snug">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-gray-400 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                  <span>·</span>
                  {post.date}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
