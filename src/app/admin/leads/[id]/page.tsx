import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Mail, Phone } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import { getLead, insertBooking, upsertCustomer } from '@/lib/db';

export const metadata: Metadata = { title: 'Lead | Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();

  async function convertToJob() {
    'use server';
    const current = await getLead(id);
    if (!current) return;
    const job = await insertBooking({
      service: current.service || 'General inquiry',
      description: current.message,
      preferred_date: '',
      preferred_time: '',
      address: '',
      customer_name: current.name,
      customer_email: current.email,
      customer_phone: current.phone || '',
      is_emergency: false,
      source: current.source === 'quote' ? 'quote' : 'lead',
    });
    await upsertCustomer({
      name: current.name,
      email: current.email,
      phone: current.phone || undefined,
    }).catch(() => undefined);
    redirect(`/admin/jobs/${job.id}`);
  }

  return (
    <div>
      <AdminHeader current="/admin/leads" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/admin/leads" className="text-sm text-gray-500 hover:text-[#1B2A4A] font-semibold">
          ← All leads
        </Link>
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-4">
          <p className="text-[#F5A623] text-xs font-bold uppercase tracking-wider">
            {lead.service || 'General inquiry'} · {lead.source || 'contact'}
          </p>
          <h1 className="text-2xl font-black text-[#1B2A4A] mt-1">{lead.name}</h1>
          <p className="text-gray-400 text-xs mt-1">{new Date(lead.created_at).toLocaleString()}</p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-[#1B2A4A] hover:underline">
              <Mail className="w-4 h-4" />
              {lead.email}
            </a>
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 text-[#1B2A4A] hover:underline">
                <Phone className="w-4 h-4" />
                {lead.phone}
              </a>
            )}
          </div>

          <p className="mt-6 text-sm text-gray-800 whitespace-pre-wrap">{lead.message}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="bg-[#F5A623] text-[#1B2A4A] font-bold text-sm px-4 py-2.5 rounded-lg"
              >
                Call
              </a>
            )}
            <a
              href={`mailto:${lead.email}`}
              className="bg-[#1B2A4A] text-white font-bold text-sm px-4 py-2.5 rounded-lg"
            >
              Email
            </a>
            <form action={convertToJob}>
              <button
                type="submit"
                className="border border-[#1B2A4A] text-[#1B2A4A] font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-[#1B2A4A] hover:text-white transition-colors"
              >
                Convert to job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
