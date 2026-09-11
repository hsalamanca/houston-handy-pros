export type BookingStatus = 'new' | 'scheduled' | 'in_progress' | 'complete' | 'cancelled';

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
