import type { Metadata } from 'next';
import AdminHeader from '@/components/admin/AdminHeader';
import PriceListEditor from '@/components/admin/PriceListEditor';
import { listPriceList } from '@/lib/db';

export const metadata: Metadata = { title: 'Price list | Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PricesPage() {
  const items = await listPriceList();

  return (
    <div>
      <AdminHeader current="/admin/prices" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-gray-500 text-sm font-semibold">Shop floor</p>
        <h1 className="text-3xl font-black text-[#1B2A4A] mt-1">Price list</h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500">
          These jobs show up when you build a quote. Change a description or price here and it is saved for the next request.
        </p>
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
          <PriceListEditor initial={items} />
        </div>
      </div>
    </div>
  );
}
