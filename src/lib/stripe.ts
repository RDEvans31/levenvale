export function formatAmountForStripe(amount: number) {
  return Math.round(amount * 100);
}
