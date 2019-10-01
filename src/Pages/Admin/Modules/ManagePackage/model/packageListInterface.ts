export interface PricingBasis {
  id: number;
  name: string;
}
export interface DataEntity {
  id: number;
  account_id: number;
  title: string;
  destination?: null;
  teaser_title?: null;
  tour_type_id?: null;
  difficulty_level_id?: null;
  altitude_in_meter?: null;
  altitude_in_feet?: null;
  description?: null;
  min_people?: number | null;
  max_people?: number | null;
  min_age?: number | null;
  max_age?: number | null;
  duration_days?: number | null;
  duration_nights?: number | null;
  pricing_basis_id?: number | null;
  base_price?: string | null;
  cancellation_info?: null;
  extra_info?: null;
  status: number;
  created_at: string;
  updated_at: string;
  pre_bookings: number;
  bookings: number;
  tour_type?: null;
  difficulty_level?: null;
  pricing_basis?: PricingBasis | null;
}