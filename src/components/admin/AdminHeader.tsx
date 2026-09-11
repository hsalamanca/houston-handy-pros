import Link from 'next/link';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/jobs', label: 'Jobs' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/customers', label: 'Customers' },
];

export default function AdminHeader({ current }: { current: string }) {
  return (
    <div className="bg-[#1B2A4A] px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center shrink-0">
          <span className="text-[#1B2A4A] font-black text-sm">H</span>
        </div>
        <span className="text-white font-bold hidden sm:inline">Admin</span>
        <nav className="flex items-center gap-3 sm:gap-4 ml-2 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm whitespace-nowrap ${
                current === link.href ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Link href="/" className="text-white/70 hover:text-white text-sm hidden sm:inline">
          View site
        </Link>
        <form action="/api/admin-logout" method="POST">
          <button
            type="submit"
            className="text-white/40 hover:text-white text-xs border border-white/20 px-3 py-1.5 rounded-lg hover:border-white/40 transition-colors"
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
