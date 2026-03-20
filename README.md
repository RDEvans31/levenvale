# Levenvale Farm

Next.js 15 e-commerce platform for Levenvale Farm, a regenerative farm and Private Members Club (PMC) based in Bellingen, NSW, Australia.

## Overview

Levenvale Farm supports two purchasing channels:

- **PMC Members**: Token-based credit wallet system with subscriptions
- **Public Shop**: Non-members can purchase food directly via card payment

## Getting Started

```bash
npm install              # Install dependencies
docker-compose up -d     # Start local PostgreSQL
npm run dev              # Start dev server (Turbopack)
```

For Stripe webhook testing, run in a separate terminal:

```bash
npm run stripe:listen
```

## Architecture

See [CLAUDE.md](./CLAUDE.md) for detailed architecture docs, code patterns, and conventions.
