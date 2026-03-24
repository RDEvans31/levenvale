# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Development Commands

```bash
npm run dev          # Start development server (uses Turbopack)
npm run build        # Production build
npm run lint         # Run ESLint + TypeScript checking
npm run format       # Format code with Prettier
npm run format:check # Check Prettier formatting without fixing
npm run stripe:listen # Start Stripe CLI webhook listener (run separately)
```

For local PostgreSQL setup:

```bash
docker-compose up -d      # Start local PostgreSQL via Docker
```

## Architecture Overview

Next.js 15 e-commerce platform for Levenvale Farm (Bellingen, NSW, Australia):

- **Database**: PostgreSQL with raw `pg` driver and custom NextAuth adapter (`src/lib/custom-adapter.ts`)
- **Backend API**: Little Farma API for user/membership data (`src/lib/little-farma/`)
- **Authentication**: NextAuth.js v5 with passwordless email authentication
- **State Management**: Zustand with localStorage persistence
- **Payments**: Stripe integration for subscriptions, credit top-ups, public shop purchases, and self top-up (honesty box)
- **Styling**: Tailwind CSS with Framer Motion animations
- **Forms**: React Hook Form
- **Charts**: Recharts for credit transaction visualization
- **Icons**: Lucide React

### Dual Shopping Model

Levenvale Farm operates two purchasing channels:

- **PMC (Private Members Club)**: Members pay via credit wallet (token-based system)
- **Public Shop**: Non-members can browse and purchase food directly via card payment

## Key Systems

### Credit Wallet System

Users have credit balances tracked in `CreditTransaction` table:

- Token-based payments with dynamic exchange rate (`tokensPerLocalCurrency` from org info API)
- Decimal precision for credit amounts
- Debit/credit transaction history
- Self top-up (honesty box): members can self-report cash deposits when `canSelfTopUp` is enabled

### Org Context

Organisation info (exchange rate, currency) is fetched via `getOrgInfo()` (`src/actions/members/org-info.ts`), cached with the `orgInfo` tag, and provided to client components via `OrgProvider` (`src/context/OrgContext.tsx`) in the members-v2 layout. Use `useOrg()` hook in client components to access `tokensPerLocalCurrency` and `localCurrency`. Server components should call `getOrgInfo()` directly.

### Role-Based Access Control

Seven-tier user role system defined in `src/lib/roles.ts`:

```typescript
basic (1) → member/freeMember (2) → co_owner (3) → tester (4) → manager (5) → admin (6) → owner (7)
```

### Zustand Stores

Two main stores in `src/store/`:

- `cartStore`: Shopping cart with delivery/pickup modes, stock management
- `userStore`: Checkout form data (addresses, phone, instructions)

Both persist to localStorage.

## App Router Structure

```
src/app/
├── (public)/       # Unauthenticated pages (home, learning)
├── api/            # API routes (stripe, orders, users, etc.)
├── authorized/     # Post-login landing
├── login/          # Authentication flow
├── onboarding/     # Multi-step user setup
├── members-v2/     # Member dashboard and pantry
├── pmc/            # Private Member Club application
└── unauthorized/   # Access denied page
```

## Server Action Pattern

Use the `Result<T>` type from `src/types/result.ts` for all server actions:

```typescript
import { Result } from '@/types/result';

export const exampleAction = async (): Promise<Result<ReturnType>> => {
  try {
    if (invalidCondition) {
      return { success: false, error: 'Validation error message' };
    }

    const result = await someOperation();
    return { success: true, value: result };
  } catch (error) {
    return { success: false, error: 'Unexpected error occurred' };
  }
};
```

## Utility Functions

Located in `src/lib/helper/`:

```typescript
convertCashToToken(cash: number, rate: number): number   // cash * rate
convertTokensToCash(tokens: number, rate: number): number // tokens / rate
areAddressesEqual(addr1, addr2): boolean
```

The `rate` parameter is `tokensPerLocalCurrency` from org info. In client components, get it via `useOrg()`. In server components, call `getOrgInfo()` directly.

## Component Organization

### Shared Components (`src/components/shared/`)

- `LoadingSpinner`: Consistent loading indicator
- `ErrorDisplay`: Standardized error messaging
- `AutoSignOut`: Automatic logout for security
- `Collapsible`: Expandable content sections

### Pantry Components (`src/components/pantry-v2/`)

- `ProductModal`: Product detail modals
- `FloatingBasket`: Persistent cart access
- `CardProduct`: Product cards

## Loading Skeleton Pattern

Use blur + spinner overlay for loading states:

```typescript
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  return (
    <div className="relative min-h-screen">
      <div className="blur-sm">
        {/* Realistic page content preview */}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <LoadingSpinner />
      </div>
    </div>
  );
}
```

Examples: `src/app/members-v2/[userId]/loading.tsx`, `src/app/members-v2/pantry/(selecting)/loading.tsx`

## Configuration Files

- `tailwind.config.ts`: Custom colors (forest, forestDark, ebony, lint)
- `next.config.ts`: Image domains for Little Farma
- `docker-compose.yml`: Local PostgreSQL setup
- `.prettierrc`: Code formatting

## Environment Variables

```bash
# App
NEXT_PUBLIC_APP_URL=

# Database
DATABASE_URL=

# Authentication
AUTH_SECRET=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Little Farma API
LF_API_URL=
LF_API_KEY=
ORG_ID=
```

## Git Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `update`: An enhancement to an existing feature
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `style`: Formatting, missing semicolons, etc. (no code change)
- `docs`: Documentation only changes
- `test`: Adding or updating tests
- `chore`: Build process, tooling, or dependency changes

Examples:

```
feat: add dark mode toggle to settings
fix: prevent crash when cart is empty
update: rename collapsible title on members portal
refactor: extract checkout logic into shared hook
```

## Development Notes

- Server actions go in `src/actions/` - always use the `Result<T>` pattern
- Stripe CLI required for webhook testing (`npm run stripe:listen` in separate terminal)
- Husky pre-commit hooks enforce lint + format
- Database access uses raw `pg` queries (no ORM) — see `src/lib/helper/dbConfig.ts` for connection config
