'use client';

import { createContext, useContext } from 'react';

interface OrgContextValue {
  tokensPerLocalCurrency: number;
  localCurrency: string;
  stripeAccountId: string;
}

const OrgContext = createContext<OrgContextValue | null>(null);

export function OrgProvider({
  children,
  tokensPerLocalCurrency,
  localCurrency,
  stripeAccountId,
}: {
  children: React.ReactNode;
  tokensPerLocalCurrency: number;
  localCurrency: string;
  stripeAccountId: string;
}) {
  return (
    <OrgContext.Provider
      value={{ tokensPerLocalCurrency, localCurrency, stripeAccountId }}
    >
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error('useOrg must be used within an OrgProvider');
  }
  return context;
}
