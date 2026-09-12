'use client';

import { useState } from 'react';
import type { PriceListItem } from '@/lib/types';
import PriceListPanel from '@/components/admin/PriceListPanel';

export default function PriceListEditor({ initial }: { initial: PriceListItem[] }) {
  const [items, setItems] = useState(initial);
  return <PriceListPanel items={items} onChange={setItems} pickMode={false} />;
}
