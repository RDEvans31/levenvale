// Bello Beef online store, where customers order food.
export const BELLO_BEEF_STORE_URL = 'https://www.bellobeef.com.au/';

// Where website enquiries (weddings, private events, tours) are sent.
export const ENQUIRIES_EMAIL = 'visit@levenvalefarm.com.au';

export function enquiryMailto(subject: string) {
  return `mailto:${ENQUIRIES_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
