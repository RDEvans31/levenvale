export interface ProductDto {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  organisationId: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  backorderAllowed: boolean;
  images: {
    id: string;
    url: string;
    altText: string | null;
    productId: string;
  }[];
  variations: {
    id: string;
    amount: number;
    value: number;
    unitType: string;
    stockQuantity: number;
    isActive: boolean;
    productId: string;
  }[];
  salesChannels: {
    id: string;
    productId: string;
    salesChannelId: string;
    createdAt: Date;
  }[];
  collections: {
    id: string;
    productId: string;
    collectionId: string;
    createdAt: Date;
    collection: {
      id: string;
      name: string;
      description: string | null;
      isActive: boolean;
      organisationId: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  discounts: {
    id: string;
    productId: string;
    discountId: string;
    discount: {
      id: string;
      name: string;
      description: string | null;
      discountType: string;
      value: number;
      isActive: boolean;
      startDate: Date;
      endDate: Date | null;
      organisationId: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
}
