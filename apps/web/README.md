# @agent-transit/web

Marketplace frontend. Scaffold only — no framework, dependencies, or pages are wired up yet.

## Intended surfaces

| Route | Audience | Purpose |
| --- | --- | --- |
| `/` | Buyers | Browse and search; filter by outcome, role, category, trust level, price |
| `/templates/[slug]` | Buyers | Template detail: description, pricing, ratings, trust badges, setup requirements, permissions/outbound declarations |
| `/workspace` | Buyers | Installed templates: setup, entitlement-gated ZIP export, deployment instructions, version pinning, support, updates |
| `/creator` | Creators | Profile/org, submissions, scan results, review status, sales, payouts, support tickets |
| `/admin` | Admins | Review queue, moderation, creator verification, collections/taxonomy, refunds/disputes, analytics |

## TODO

- Choose framework (default assumption: Next.js on Vercel) and wire up the routes above.
