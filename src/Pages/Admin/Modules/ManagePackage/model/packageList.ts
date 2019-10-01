import { DataEntity } from "@/Pages/Admin/Modules/ManagePackage/model/packageListInterface";
export class PricingBasis {
  id: number;
  name: string;
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
  }
  
}
export class Package implements DataEntity{
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

  constructor(obj: any) {
    this.id = obj.id;
    this.account_id = obj.account_id;
    this.title = obj.title;
    this.destination = obj.destination;
    this.teaser_title = obj.teaser_title;
    this.tour_type_id = obj.tour_type_id;
    this.difficulty_level_id = obj.difficulty_level_id;
    this.altitude_in_meter = obj.altitude_in_meter;
    this.altitude_in_feet = obj.altitude_in_feet;
    this.description = obj.description;
    this.min_people = obj.min_people;
    this.max_people = obj.max_people;
    this.min_age = obj.min_age;
    this.max_age = obj.max_age;
    this.duration_days = obj.duration_days;
    this.duration_nights = obj.duration_nights;
    this.pricing_basis_id = obj.pricing_basis_id;
    this.base_price = obj.base_price;
    this.cancellation_info = obj.cancellation_info;
    this.extra_info = obj.extra_info;
    this.status = obj.status;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
    this.pre_bookings = obj.pre_bookings;
    this.bookings = obj.bookings;
    this.tour_type = obj.tour_type;
    this.difficulty_level = obj.difficulty_level;
    this.pricing_basis = obj.pricing_basis;
  }
}