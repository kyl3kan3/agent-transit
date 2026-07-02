# Agent Transit

Agent Transit is a marketplace concept for installable AI agent templates.

The goal is to make AI agents discoverable, trustworthy, installable, and commercially viable in the same way mature marketplaces make apps, plugins, and automation packages easy to evaluate and adopt.

## Concept

Agent Transit is a public marketplace where creators can publish packaged AI agent templates and buyers can browse, install, purchase, and manage them inside a team workspace.

The marketplace is designed around liquidity first:

- Buyers should quickly understand what an agent does, what it needs access to, how risky it is, and how to install it.
- Creators should be able to submit templates from a public repo or ZIP package, pass validation/scanning, and earn from paid templates.
- Platform operators should have review, moderation, trust, support, and commerce controls from day one.

## Core Marketplace Loop

1. A creator submits an agent template package.
2. Agent Transit validates the manifest and scans the package.
3. Clean submissions are published or routed through first-template review.
4. Buyers browse templates by outcome, role, category, trust level, and price.
5. Buyers install free templates or purchase paid templates.
6. Installed templates appear in a workspace with setup, export, deployment, support, and update controls.
7. Reviews, support tickets, refunds, and moderation feed back into trust and ranking.

## Template Submission Model

V1 is built around a manifest-first package contract.

Each template includes:

- A required manifest file.
- Source files for the agent template.
- Setup steps.
- Environment variable requirements.
- Declared integrations and permissions.
- Declared outbound services.
- Pricing metadata.
- Deploy/export metadata.
- Support policy.

V1 supports JavaScript, TypeScript, and Python templates.

## Trust And Safety

Agent Transit treats trust as a first-class marketplace feature.

The V1 scan pipeline is static and does not execute untrusted code. It checks:

- Manifest validity.
- Package size and structure.
- Dependency and configuration risk.
- Static dangerous patterns.
- Potential secrets.
- Permission and outbound-service declarations.
- License and support metadata.

Publishing rules:

- New creators require first-template review.
- Trusted creators can auto-publish clean scans.
- Warning-level scans route to admin review.
- High-risk or blocked scans cannot publish.

## Buyer Experience

Buyers can:

- Search and filter the marketplace.
- Review template detail pages.
- Compare pricing, ratings, trust badges, and setup requirements.
- Install free templates.
- Buy paid templates.
- Manage installed templates in a workspace.
- Pin versions.
- Export entitlement-gated ZIP packages.
- Follow Vercel deployment instructions.
- Request support or refunds.
- Leave reviews.

## Creator Experience

Creators can:

- Create a creator profile or organization.
- Submit a public repo or ZIP package.
- Validate a manifest before review.
- See scan results and review status.
- Publish free or paid templates.
- Connect payout details.
- Track sales.
- Respond to support tickets.
- Maintain versions and updates.

## Admin Experience

Admins can:

- Review first-template submissions.
- Review warning-level scan results.
- Block high-risk versions.
- Verify creators.
- Manage collections and taxonomy.
- Moderate reviews and templates.
- Handle refunds and disputes.
- Review support and platform events.
- Monitor marketplace analytics.

## Commerce Model

V1 uses one-time paid templates.

Default assumptions:

- Stripe Checkout for purchases.
- Stripe Connect for creator payouts.
- 20% platform fee.
- 7-day payout hold.
- Refunds revoke paid access.

Subscriptions, promoted listings, private offers, hosted runtime fees, and advanced analytics are post-V1 opportunities.

## Product Direction

Agent Transit is intentionally not just a template gallery.

The long-term product is a trusted distribution layer for AI work:

- Templates as installable products.
- Trust and scanning as marketplace infrastructure.
- Workspaces as buyer control centers.
- Creator liquidity as the growth engine.
- Deployment and setup as part of the purchase flow, not an afterthought.

## V1 Scope

V1 should prove the marketplace loop:

- Browse.
- Submit.
- Validate.
- Scan.
- Review.
- Publish.
- Install.
- Buy.
- Export.
- Deploy.
- Support.
- Review.

The first version should prioritize credible supply, buyer confidence, and fast installation over advanced automation or hosted runtime features.
