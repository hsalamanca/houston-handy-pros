import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, ChevronRight } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import DbBanner, { LivePill } from '@/components/admin/DbBanner';
import { listLeads, probeDatabase } from '@/lib/db';
import { money } from '@/lib/quote';

export const metadata: Metadata = { title: 'Website Leads | Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const probe = await probeDatabase();
  const leads = probe.ok ? await listLeads().catch(() => []) : [];

  return (
    <div>
      <AdminHeader current="/admin/leads" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-[#1B2A4A]">Website Leads</h1>
            <LivePill ok={probe.ok} />
          </div>
          <span className="text-gray-500 text-sm">{leads.length} messages</span>
        </div>
        <DbBanner ok={probe.ok} message={probe.message} />

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {leads.length === 0 ? (
            <p className="px-6 py-10 text-sm text-gray-500">
              Quote and contact form messages land here. You also get an email and text for every one.
            </p>
          ) : (
            <div className="divide-y">
              {leads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="block px-6 py-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-[#1B2A4A]">{lead.name}</p>
                      <p className="text-[#F5A623] text-xs font-semibold mt-0.5">
                        {lead.service || 'General inquiry'} · {lead.source || 'contact'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {lead.quoted_amount != null && lead.quoted_amount > 0 && (
                        <span className="text-[#1B2A4A] text-xs font-black">{money(lead.quoted_amount)}</span>
                      )}
                      <p className="text-gray-400 text-xs">{new Date(lead.created_at).toLocaleString()}</p>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </span>
                    {lead.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-700 line-clamp-2">{lead.message}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
