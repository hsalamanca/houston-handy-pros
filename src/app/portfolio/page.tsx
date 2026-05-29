import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project Gallery — Before & After Photos',
  description: 'See before and after photos of handyman projects completed by Houston Handy Pros across Houston, TX.',
};

const projects = [
  { id: 1, title: 'Kitchen Faucet Replacement', category: 'Plumbing', location: 'River Oaks', before: '#2d4a7a', after: '#1B2A4A' },
  { id: 2, title: 'Deck Board Replacement', category: 'Carpentry', location: 'Memorial', before: '#4a3020', after: '#2d1f0f' },
  { id: 3, title: 'Drywall Patch & Paint', category: 'Drywall', location: 'The Heights', before: '#888', after: '#1B2A4A' },
  { id: 4, title: 'TV Mounting + Cord Hiding', category: 'TV Mounting', location: 'Montrose', before: '#333', after: '#1B2A4A' },
  { id: 5, title: 'Fence Repair (Storm Damage)', category: 'Fence', location: 'Katy', before: '#6b4226', after: '#3d2412' },
  { id: 6, title: 'LVP Flooring Installation', category: 'Flooring', location: 'Sugar Land', before: '#8b7355', after: '#5c4a2a' },
  { id: 7, title: 'Bathroom Caulk & Refresh', category: 'Drywall', location: 'West University', before: '#aaa', after: '#1B2A4A' },
  { id: 8, title: 'Pressure Wash Driveway', category: 'Pressure Washing', location: 'Pearland', before: '#666', after: '#999' },
  { id: 9, title: 'Ceiling Fan Installation', category: 'Electrical', location: 'Garden Oaks', before: '#444', after: '#1B2A4A' },
];

const categories = ['All', 'Carpentry', 'Plumbing', 'Electrical', 'Drywall', 'Flooring', 'Pressure Washing', 'Fence', 'TV Mounting'];

export default function PortfolioPage() {
  return (
    <div>
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Our Work</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-5">
            Before &amp; After Gallery
          </h1>
          <p className="text-white/70 text-lg">
            Real jobs. Real results. See the quality of work we deliver for Houston homeowners every day.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Category filter — static for SSR */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  cat === 'All'
                    ? 'bg-[#1B2A4A] text-white'
                    : 'bg-[#F8F9FA] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow group">
                {/* Before/After image comparison */}
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div
                      className="w-1/2 flex items-end pb-2 pl-2 transition-all duration-500 group-hover:w-[35%]"
                      style={{ backgroundColor: project.before }}
                    >
                      <span className="text-white text-xs font-bold bg-black/40 px-2 py-0.5 rounded">BEFORE</span>
                    </div>
                    <div className="w-0.5 bg-white/80 z-10" />
                    <div
                      className="flex-1 flex items-end pb-2 pr-2 justify-end transition-all duration-500"
                      style={{ backgroundColor: project.after }}
                    >
                      <span className="text-white text-xs font-bold bg-[#F5A623]/80 px-2 py-0.5 rounded">AFTER</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center z-20">
                      <div className="w-2 h-4 border-l border-r border-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-[#F5A623] uppercase tracking-wider mb-1">{project.category}</p>
                  <h3 className="font-bold text-[#1B2A4A] text-base mb-1">{project.title}</h3>
                  <p className="text-gray-500 text-xs">{project.location}, Houston TX</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Want results like these for your home?</p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-10 py-4 rounded-xl hover:bg-[#e8941a] transition-colors"
            >
              Book Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
