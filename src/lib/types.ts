export type BookingStatus = 'new' | 'scheduled' | 'in_progress' | 'complete' | 'cancelled';

export type QuoteLine = {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
};

export type PriceListItem = {
  id: string;
  description: string;
  unit_price: number;
  category: string;
  sort_order: number;
};

export type Booking = {
  id: string;
  service: string;
  description: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  address: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  is_emergency: boolean | null;
  status: BookingStatus;
  assigned_tech: string | null;
  notes: string | null;
  amount: number | null;
  quote_items: QuoteLine[];
  source: string | null;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  source: string | null;
  quote_items: QuoteLine[];
  quoted_amount: number | null;
  created_at: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  neighborhood: string | null;
  maintenance_plan: string | null;
  notes: string | null;
  created_at: string;
};
