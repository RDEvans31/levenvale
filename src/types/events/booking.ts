export interface BookingEventProductDto {
  id: string;
  name: string;
  productType: string;
  priceInTokens: number;
  additionalInfoQuestion: string | null;
}

export interface BookingPurchaseDto {
  id: string;
  quantity: number;
  additionalInfo: string | null;
  eventProduct: BookingEventProductDto;
}

export interface BookingEventDto {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  status: 'draft' | 'live' | 'cancelled';
  address: {
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    postcode: string;
    country: string;
  } | null;
  mapLink: string | null;
  category: string | null;
  images: { id: string; url: string; altText: string | null }[];
  depositInTokens: number;
}

export interface UserBookingDto {
  id: string;
  eventId: string;
  attended: boolean;
  paymentMethod: string;
  createdAt: string;
  event: BookingEventDto;
  purchases: BookingPurchaseDto[];
}

export interface UserBookingsResponse {
  success: boolean;
  bookings: UserBookingDto[];
  membershipId: string;
  total: number;
  hasMore: boolean;
}
