# Architecture (Draft)

> Concept-stage sketch. Nothing described here is implemented yet.

## Components

- **apps/web** — Marketplace frontend. Browse/search, template detail pages, buyer workspace, creator dashboard, admin console.
- **apps/api** — Backend API. Submissions, scanning orchestration, publishing, purchases, entitlements, installs, reviews, support, admin actions.
- **packages/manifest** — The manifest contract: JSON Schema plus validation used by both the submission flow and the CLI-facing "validate before review" step.
- **packages/scanner** — V1 static scan pipeline. Never executes untrusted code.
- **packages/db** — Database schema for marketplace entities.
- **examples/hello-agent** — Reference template package demonstrating the manifest contract.

## External services (default assumptions)

- Stripe Checkout (purchases) and Stripe Connect (creator payouts, 20% platform fee, 7-day hold).
- Vercel as the default deployment target for exported templates.
- Object storage for submitted packages and entitlement-gated ZIP exports.

## Core flows

### Publish flow

1. Creator submits a public repo URL or ZIP package.
2. `packages/manifest` validates the manifest.
3. `packages/scanner` runs static checks and produces severity-ranked findings.
4. Routing: clean + trusted creator → auto-publish; new creator → first-template review; warnings → admin review; high-risk/blocked → cannot publish.

### Purchase/install flow

1. Buyer browses, filters, and opens a template detail page.
2. Free templates install directly; paid templates go through Stripe Checkout.
3. Purchase creates an entitlement; the template appears in the buyer's workspace.
4. Workspace exposes setup steps, entitlement-gated ZIP export, deployment instructions, version pinning, support, and updates.
5. Reviews, support tickets, refunds, and moderation feed back into trust and ranking.
