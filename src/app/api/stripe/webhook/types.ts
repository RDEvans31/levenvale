export type LittleFarmaEvent = {
  type: 'subscription_updated' | 'subscription_created' | 'invoice_paid';
  data: {
    membershipId: string;
    externalPaymentId: string;
    amount: number;
    currency: string;
  };
};
