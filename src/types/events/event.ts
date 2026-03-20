export interface EventCategoryDto {
  id: string;
  name: string;
  description: string | null;
  public: boolean;
  eventCount: number;
}

export interface EventImageDto {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
}

export interface EventProductDto {
  id: string;
  name: string;
  description: string | null;
  priceInTokens: number;
  priceInCurrency: number | null;
  maxQuantity: number | null;
  sortOrder: number;
  productType: string;
  additionalInfoQuestion: string | null;
}

export interface EventDto {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  depositInTokens: number;
  status: 'draft' | 'live' | 'cancelled';
  public: boolean;
  city: string | null;
  postcode: string | null;
  mapLink: string | null;
  closeBookingDateTime: string | null;
  category: {
    id: string;
    name: string;
    color: string;
  } | null;
  images: EventImageDto[];
  products: EventProductDto[];
  bookingCount: number;
}
