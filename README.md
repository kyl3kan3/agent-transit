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

- A required **agenttransit.json** manifest file.
- Source files for the agent template.
- Setup steps.
- Environment variable requirements.
- Declared integrations and permissions.
- Declared outbound services.
- License metadata; marketplace pricing is controlled by the listing and is never trusted from package content.
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

V1 uses free installs and one-time workspace licenses for paid templates.

Locked V1 decisions:

- Public beta launches in the United States with USD pricing.
- Stripe Checkout processes buyer payments.
- Stripe Connect Express handles creator onboarding and identity verification.
- Separate charges and transfers keep creator funds on the platform during the seven-day hold.
- Creators receive 80% of the pre-tax item subtotal; Agent Transit retains 20% and pays Stripe processing and Connect fees.
- Stripe Tax calculates checkout tax. Paid launch requires legal confirmation of which entity must collect and remit it.
- V1 supports full refunds only. Refunds revoke future gated access but cannot erase packages already exported or deployments already created.
- Disputes freeze the related entitlement and unpaid creator transfer until resolved.

Stripe is the payment processor, not a merchant-of-record service. Agent Transit remains responsible for the marketplace payment, refund, dispute, tax, and creator-risk model.

Subscriptions, promoted listings, private offers, hosted runtime fees, additional currencies, and international seller payouts are post-V1 opportunities.

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


## Complete V1 Architecture

This section is the build contract for Agent Transit V1. Product behavior, data ownership, security boundaries, and state transitions defined here take precedence over looser wording elsewhere in this document.

### Locked V1 Boundaries

- Agent Transit distributes source templates; it does not run buyer agents.
- V1 never executes submitted packages during scanning.
- V1 never stores buyer secret values, provider access tokens, or deployment credentials.
- JavaScript, TypeScript, and Python are the only supported package languages.
- Submission sources are a public repository or a ZIP file up to 50 MB compressed.
- Every accepted package becomes an immutable, content-addressed snapshot.
- Free templates create a free entitlement and workspace install record.
- Paid templates use a one-time license assigned to the purchasing workspace.
- Paid checkout is USD-only and United States-only during public beta.
- All package downloads are entitlement-gated, including free snapshots created by Agent Transit.
- Public repositories may also expose a Vercel Deploy Button. Paid or private snapshots use gated download plus deployment instructions.
- High-risk and blocked artifacts can never publish. There is no direct administrative override.
- Trusted creators may skip manual review for clean scans, but never skip scanning.
- No subscriptions, hosted runtime, automatic Vercel account control, private offers, promoted listings, or buyer-managed OAuth connections ship in V1.

### System Topology

~~~mermaid
flowchart TB
    U["Buyer, creator, or admin browser"] --> V["Vercel CDN and Firewall"]
    V --> N["Next.js App Router application"]
    N --> A["Neon Auth"]
    N --> D["Neon Postgres through Drizzle"]
    N --> BP["Private Vercel Blob package store"]
    N --> BA["Public Vercel Blob asset store"]
    N --> S["Stripe Checkout and Connect"]
    N --> O["Postgres outbox and job queue"]
    O --> G["Private GitHub Actions scanner"]
    G --> BP
    G --> C["Signed scan callback"]
    C --> N
    S --> W["Signed Stripe webhook"]
    W --> N
    O --> E["Transactional email provider"]
~~~

### Technology Decisions

| Concern | V1 choice | Boundary |
| --- | --- | --- |
| Web application | Next.js App Router on the latest patched stable Next.js 16 release | Server Components for reads; Client Components only for interactive controls |
| Hosting and edge | Vercel | CDN, Functions, preview deployments, firewall, cron, logs |
| Identity | Neon Auth | Authentication and sessions; authorization remains in Agent Transit |
| Relational data | Neon Postgres | Transactional source for marketplace state |
| ORM and migrations | Drizzle ORM and checked-in SQL migrations | Runtime uses the Neon serverless driver; migrations use a direct administrative connection |
| Package storage | Private Vercel Blob | Immutable package snapshots and scan reports |
| Listing assets | Public Vercel Blob | Screenshots, creator avatars, and public media |
| Payments | Stripe Checkout | One-time buyer payments |
| Creator onboarding | Stripe Connect Express | KYC, payout account, and Express Dashboard |
| Funds flow | Separate charges and transfers | Seven-day hold before the creator transfer |
| Scanner | Dedicated private GitHub Actions workflow | Static analysis only; package code and install scripts are never run |
| Search | Neon Postgres full-text search plus pg_trgm | No external search cluster in V1 |
| Background work | Postgres jobs and transactional outbox dispatched by Vercel Cron | Durable retries without holding web requests open |
| Email | Provider adapter fed by the outbox | Provider can change without changing domain state |

Database, Stripe, Blob, and other service clients must be initialized lazily inside server-only modules so builds do not require live runtime credentials. The browser never receives database credentials, Stripe secret keys, Blob store credentials, or scanner secrets.

### Logical Modules

- **Identity and tenancy:** users, sessions, workspaces, creator organizations, memberships, and authorization.
- **Catalog:** templates, versions, creators, categories, tags, collections, listing assets, and public discovery.
- **Submission:** repository import, direct upload, manifest validation, artifact snapshotting, and version creation.
- **Trust:** scan dispatch, findings, risk scoring, creator trust, review cases, security freezes, and moderation.
- **Commerce:** prices, orders, Checkout Sessions, webhooks, ledger entries, refunds, disputes, transfers, and creator balances.
- **Entitlements and installs:** workspace licenses, version pins, setup progress, exports, deploy instructions, and update availability.
- **Reviews and support:** verified reviews, tickets, messages, status ownership, and escalation.
- **Search and ranking:** text index, filters, ranking signals, abuse controls, and curated boosts.
- **Administration:** review queues, creator verification, taxonomy, collections, refunds, support, analytics, and audit history.
- **Jobs and notifications:** outbox events, scheduled work, retries, dead-letter handling, and user notifications.

Each module owns its state transitions. Cross-module effects are written to the outbox in the same database transaction as the originating change.

### Sources Of Truth

| Data | Authoritative system | Agent Transit behavior |
| --- | --- | --- |
| User identity and session | Neon Auth | Store only the auth user identifier and application profile data |
| Marketplace metadata | Neon Postgres | All listing, version, review, support, and moderation reads originate here |
| Package and report bytes | Vercel Blob | Postgres stores the path, hash, size, media type, and lifecycle state |
| Payment and settlement | Stripe | Mirror signed events into orders, ledger entries, refunds, disputes, and transfers |
| Buyer access | Neon Postgres entitlement state | Never infer access from a success redirect or client-provided Stripe data |
| Scan decision | Signed scanner report plus moderation decision | Badge always references artifact hash, scanner version, result, and timestamp |
| Search ranking | Versioned ranking configuration and indexed marketplace signals | No hidden paid placement in V1 |

### Identity, Tenancy, And Authorization

Every user has a Neon Auth identity and an Agent Transit application profile. A new buyer receives one personal workspace and may create or join additional workspaces. A creator organization is separate from a buyer workspace even when they share members.

All authorization is checked in the Server Component, Server Action, or Route Handler that reads or mutates protected data. Vercel proxy rules may redirect unauthenticated users, but they are never the sole authorization control.

All workspace-owned rows carry a workspace identifier. All creator-owned rows carry a creator organization identifier. Public catalog queries can only return published, non-frozen versions. Administrative queries require a platform role.

#### Workspace Roles

| Role | Permissions |
| --- | --- |
| Owner | All workspace actions, ownership transfer, member administration, purchases, refunds, exports, and deletion |
| Admin | Member administration, purchases, installs, exports, updates, reviews, and support |
| Member | View and use entitled installs, complete setup, export packages, deploy, review, and open support |
| Billing | View billing, create purchases, view invoices, and request refunds; no package export or member administration |

#### Creator Organization Roles

| Role | Permissions |
| --- | --- |
| Owner | All creator actions, ownership transfer, Stripe onboarding, payouts, and organization deletion |
| Admin | Manage members, listings, releases, support, sales, and settings except ownership transfer and payout-bank changes |
| Editor | Create and edit listings, submit versions, view scans, and respond to review requests |
| Support | View entitled customer tickets and reply; no package, pricing, or payout changes |
| Finance | View sales, refunds, disputes, transfers, tax documents, and payout status |

#### Platform Roles

| Role | Permissions |
| --- | --- |
| Super Admin | Emergency full access; every action requires step-up authentication and is audited |
| Reviewer | Review clean and warning submissions, request changes, approve eligible versions |
| Security | Freeze versions, suppress a documented false positive for an exact hash, trigger rescans, and handle security incidents |
| Support | Manage tickets, moderation reports, and customer communications |
| Finance | Issue refunds, manage disputes, hold or release transfers, and view financial records |
| Curator | Manage categories, tags, collections, and editorial boosts |

Roles are deny-by-default. Sensitive operations require recent authentication. No role can directly publish a blocked artifact.

### Core Data Model

All primary keys are UUIDs generated by the application. Timestamps are UTC. Money is stored as integer minor units with an ISO currency code. Public slugs are normalized and unique. Foreign keys and database constraints enforce ownership and lifecycle invariants.

#### Identity And Organizations

| Entity | Purpose and required constraints |
| --- | --- |
| <code>user_profiles</code> | Auth user reference, public display name, avatar, locale, and account state |
| <code>workspaces</code> | Buyer tenant, billing identity, type, and lifecycle state |
| <code>workspace_memberships</code> | Unique user and workspace pair with one workspace role |
| <code>creator_orgs</code> | Seller identity, public profile, support policy, trust level, and account state |
| <code>creator_memberships</code> | Unique user and creator organization pair with one creator role |
| <code>creator_verifications</code> | Identity, business, domain, and manual verification evidence and decision history |
| <code>connected_accounts</code> | Stripe account identifier, onboarding state, capabilities, charges-enabled, payouts-enabled, and restriction reason |

#### Catalog And Packages

| Entity | Purpose and required constraints |
| --- | --- |
| <code>templates</code> | Mutable listing owned by one creator organization; slug, title, summary, price, currency, support terms, and listing state |
| <code>template_versions</code> | Immutable semantic version, manifest JSON, source commit when applicable, artifact hash, compatibility, and publication state |
| <code>artifacts</code> | Private Blob path, SHA-256 hash, byte size, media type, storage state, and retention class; hash is unique |
| <code>template_assets</code> | Public screenshots and media with sort order, dimensions, alt text, and moderation state |
| <code>categories</code> | Controlled department and outcome taxonomy |
| <code>tags</code> | Controlled integration, runtime, capability, and use-case terms |
| <code>template_categories</code> | Many-to-many template category mapping |
| <code>template_tags</code> | Many-to-many template tag mapping |
| <code>collections</code> | Curated result set, owner, publication state, and update timestamp |
| <code>collection_items</code> | Ordered template membership with curator rationale |

A template may have many immutable versions but only one current public version. Price and merchandising copy belong to the mutable listing; package bytes, manifest, scan result, and semantic version never change in place.

#### Submission, Trust, And Moderation

| Entity | Purpose and required constraints |
| --- | --- |
| <code>submissions</code> | Creator, template, proposed version, source type, source reference, artifact, and intake state |
| <code>validation_runs</code> | Schema version, validation result, structured field errors, package limits, and validator version |
| <code>scan_runs</code> | Artifact hash, scanner version, rule-set version, state, aggregate risk, timestamps, and signed report path |
| <code>scan_findings</code> | Detector, severity, file path, line, fingerprint, explanation, evidence, declaration mismatch, and suppression state |
| <code>review_cases</code> | Reason, queue state, assignee, SLA timestamp, and linked submission or incident |
| <code>review_decisions</code> | Approve, request changes, reject, freeze, or suppress finding; actor, reason, and evidence |
| <code>moderation_events</code> | Append-only audit stream for listing, creator, review, and security actions |
| <code>creator_trust_history</code> | Trust-level transitions, calculated inputs, actor, and reason |

#### Commerce And Access

| Entity | Purpose and required constraints |
| --- | --- |
| <code>orders</code> | Workspace, buyer, template, price snapshot, tax, currency, Stripe identifiers, and payment state |
| <code>webhook_events</code> | Unique provider event identifier, signature result, processing state, attempts, and error |
| <code>ledger_entries</code> | Append-only gross, tax, platform fee, creator share, processing fee, refund, dispute, and transfer entries |
| <code>entitlements</code> | Workspace and template license, source, state, order, granted time, revoked time, and reason |
| <code>entitlement_events</code> | Append-only grant, revoke, restore, refund, dispute, and administrative events |
| <code>creator_transfers</code> | Creator, order, amount, hold-until time, Stripe transfer, and transfer state |
| <code>refunds</code> | Order, amount, reason, requester, approver, Stripe refund, and state |
| <code>disputes</code> | Stripe dispute, order, evidence deadline, amount, state, and resolution |
| <code>installs</code> | Unique workspace and template pair, pinned version, state, setup progress, and update state |
| <code>install_events</code> | Install, pin, export, deploy-link, update, freeze, and removal events |
| <code>export_events</code> | Entitlement, version, user, artifact hash, timestamp, request identifier, and result |

An active entitlement is unique per workspace and template. An install is unique per workspace and template. A paid order can grant access only after a signed Stripe event is processed successfully.

#### Community And Operations

| Entity | Purpose and required constraints |
| --- | --- |
| <code>reviews</code> | One review per workspace and template, rating, body, verified source, version used, and moderation state |
| <code>support_tickets</code> | Workspace, creator, template, order, priority, owner, status, SLA, and escalation state |
| <code>support_messages</code> | Ticket messages, author role, attachments, visibility, and timestamp |
| <code>notifications</code> | In-app notification, recipient, event type, read state, and deep link |
| <code>outbox_events</code> | Transactional event payload, destination, attempts, next-attempt time, and state |
| <code>jobs</code> | Scheduled job type, payload, lock, attempts, timeout, result, and dead-letter state |
| <code>audit_events</code> | Append-only actor, action, target, tenant, request identifier, IP hash, user agent, and before/after references |
| <code>ranking_snapshots</code> | Versioned ranking inputs and computed score used to explain marketplace ordering |

### Database Rules

- Use foreign keys for every ownership relationship.
- Use unique constraints for slugs, template semantic versions, provider event identifiers, active entitlements, installs, and reviews.
- Store the submitted manifest as JSONB and project commonly queried fields into typed columns.
- Use check constraints for money, ratings, enumerated states, and percentage totals.
- Use transactions for every state transition that affects more than one table.
- Use optimistic version columns for administrative decisions and mutable listings.
- Use append-only event tables for money, entitlement, moderation, and security history.
- Soft-delete public business records; never cascade-delete financial, entitlement, scan, or moderation history.
- Runtime application queries use a pooled Neon connection and the serverless driver. Schema migrations use a separate direct administrative connection.
- Production is a protected Neon branch. Preview deployments use isolated schema-only or sanitized branches and never clone production secrets or buyer data.
- The Neon client and Drizzle instance are created lazily inside server-only accessors.

### Manifest Contract

The required file is **agenttransit.json** at the package root. Its schema is versioned at:

<code>https://agentransit.com/schemas/agenttransit-v1.json</code>

Minimum contract:

~~~json
{
  "$schema": "https://agentransit.com/schemas/agenttransit-v1.json",
  "schemaVersion": "1",
  "id": "com.example.support-router",
  "name": "Support Router",
  "version": "1.2.0",
  "summary": "Classifies and routes inbound support requests.",
  "runtime": {
    "language": "typescript",
    "version": ">=20",
    "entrypoint": "src/index.ts"
  },
  "permissions": [
    {
      "key": "email.read",
      "reason": "Reads inbound support messages"
    }
  ],
  "environment": [
    {
      "name": "OPENAI_API_KEY",
      "required": true,
      "secret": true,
      "description": "Used for model inference"
    }
  ],
  "integrations": [
    {
      "provider": "gmail",
      "scopes": ["gmail.readonly"],
      "required": true
    }
  ],
  "outbound": [
    {
      "host": "api.openai.com",
      "protocol": "https",
      "reason": "Model inference"
    }
  ],
  "deployTargets": [
    {
      "provider": "vercel",
      "mode": "instructions"
    }
  ],
  "license": {
    "spdx": "MIT",
    "file": "LICENSE"
  },
  "support": {
    "channel": "marketplace",
    "responseDays": 3
  }
}
~~~

Manifest rules:

- <code>schemaVersion</code>, <code>id</code>, <code>name</code>, <code>version</code>, <code>summary</code>, <code>runtime</code>, <code>permissions</code>, <code>environment</code>, <code>outbound</code>, <code>license</code>, and <code>support</code> are required.
- Version is valid semantic versioning and must equal the proposed marketplace version.
- Runtime language is exactly JavaScript, TypeScript, or Python; entrypoint must resolve inside the package.
- Permissions and integration scopes come from a platform-controlled taxonomy. Unknown values require review.
- Secret declarations contain names and descriptions only, never values.
- Outbound hosts must be exact hosts or documented constrained patterns. Wildcards require warning review.
- Marketplace price, creator identity, scan state, trust state, install counts, and ratings are server-controlled and ignored if present in package content.
- The JSON Schema is backward compatible within major version 1. Breaking manifest changes require a new schema major version.
- Validation errors return a stable code, JSON path, human explanation, and correction guidance.

### Package Intake And Artifact Lifecycle

ZIP intake:

1. The creator requests a scoped upload token.
2. The browser uploads directly to a private Blob staging path so package bytes do not pass through a Vercel Function.
3. The token restricts path prefix, content type, maximum size, one upload, creator organization, and expiration.
4. Blob completion creates or reconciles the submission record.
5. The scanner recomputes size and SHA-256; client-provided values are advisory only.
6. A validated artifact is copied to <code>packages/sha256/first-two-hash-characters/full-hash.zip</code> with overwrite disabled.
7. The staging object is deleted after successful snapshotting or by orphan cleanup.

Repository intake:

1. Accept only a public HTTPS repository URL and optional branch, tag, or commit.
2. Resolve it to an exact commit SHA before download.
3. Download the repository archive without running repository workflows, hooks, submodules, or package scripts.
4. Record repository URL, requested reference, resolved commit, archive hash, and retrieval time.
5. Store the same immutable content-addressed snapshot used by ZIP submissions.

Package constraints:

- Maximum compressed size: 50 MB.
- Maximum extracted size: 250 MB.
- Maximum file count: 10,000.
- Reject absolute paths, parent traversal, device files, hard links, symbolic links, duplicate normalized paths, encrypted archives, and archive bombs.
- Reject nested archives unless explicitly allowed by a future schema.
- Normalize paths before validation but preserve original bytes for evidence.
- Public listing assets live in a separate public Blob store and pass independent media validation.
- Package and report objects are private. Download URLs are signed for one path and GET operation, expire after five minutes, and are generated only after server-side entitlement checks.
- Artifact overwrite is never enabled. Deletion requires retention-policy eligibility and an audited job.

### Static Scanner Architecture

The scanner is a private GitHub Actions workflow in a dedicated scanner repository. The application dispatches a job containing a scan identifier, expected artifact hash, short-lived signed download URL, callback URL, and one-time callback nonce.

Scanner isolation:

- Use an ephemeral hosted runner and a pinned scanner container image.
- Verify the downloaded SHA-256 before extraction.
- Never run package code, tests, build commands, package managers, install scripts, Git hooks, or declared entrypoints.
- Parse files with resource, file-count, memory, and time limits.
- Disable general outbound network access during package inspection. Vulnerability databases and rules are built into the pinned scanner image or fetched before the package is mounted.
- Mount extracted content read-only.
- Treat filenames, manifests, source comments, and generated reports as untrusted data.
- Upload the full report to private Blob and send only signed structured results to the callback.
- Sign the callback with HMAC over timestamp, nonce, scan identifier, artifact hash, report hash, and result.
- Reject callbacks with an invalid signature, reused nonce, mismatched hash, stale timestamp, or invalid state transition.

Required detectors:

- Archive and path safety.
- Manifest schema and semantic validation.
- File-type and binary inventory.
- Secret scanning.
- JavaScript, TypeScript, and Python dependency inventory from lock files.
- Known dependency vulnerabilities using a pinned advisory database.
- Dangerous static patterns such as shell execution, dynamic evaluation, credential access, filesystem escape, obfuscation, persistence, and undeclared network activity.
- Declared-versus-detected permission, integration, environment, and outbound-host comparison.
- License presence, SPDX validity, and obvious license conflict signals.
- Deployment and configuration checks.
- Package metadata and support-policy completeness.

Risk model:

| Aggregate result | Meaning | Publishing result |
| --- | --- | --- |
| Clean | No medium, high, or critical finding under the recorded scanner and rule-set versions | Auto-publish only for trusted creators; otherwise first-template review |
| Warning | One or more medium findings, declaration mismatches, unknown permissions, or policy uncertainty | Manual review required |
| Blocked | Any high or critical finding, unsafe archive behavior, detected secret, or scanner integrity failure | Cannot publish |
| Failed | Infrastructure failure, timeout, invalid report, or incomplete scan | Retry; cannot publish |

The public badge must say “No known issues found by static scan” rather than “Safe.” It links to the artifact hash, scanner version, rule-set version, timestamp, aggregate result, declarations, and publish decision.

Every new version receives a new scan. Existing published versions are rescanned when high-impact rules or advisory data change. A newly blocked rescan freezes future downloads and updates, alerts entitled workspaces, preserves the artifact as evidence, and opens a security case.

### Review And Creator Trust Policy

New creators require manual review of their first clean template. Warning results always require review. During the invite-only and early public-beta phases, a feature flag may require manual review for every creator.

A creator becomes eligible for trusted auto-publishing only after:

- Stripe identity onboarding or equivalent verified identity is complete.
- At least three versions have been manually approved.
- The account is at least 30 days old.
- There is no unresolved security, IP, fraud, or payout restriction.
- Support response and refund health remain within configured thresholds.
- A platform reviewer records the trust decision.

Trust status affects review routing only. It never skips intake validation, scanning, entitlement rules, or incident response.

High-risk artifacts have no publish override. When a finding is a false positive, Security may create a narrowly scoped suppression for the exact artifact hash and detector fingerprint with evidence and expiration. The artifact must then be rescanned. Only the new non-blocked result can continue to review or publication.

### State Machines

#### Template Version

| Current state | Allowed next states |
| --- | --- |
| Draft | Uploading, abandoned |
| Uploading | Validating, upload_failed |
| Validating | Invalid, queued_scan |
| Invalid | Validating, abandoned |
| Queued scan | Scanning, scan_failed |
| Scanning | Clean, warning, blocked, scan_failed |
| Scan failed | Queued scan, abandoned |
| Clean | Review required, published |
| Warning | Review required |
| Review required | Changes requested, approved, rejected |
| Changes requested | Abandoned; correction creates a new immutable version |
| Approved | Published |
| Published | Paused, frozen, superseded, removed |
| Blocked | Abandoned, security evidence retained |
| Frozen | Published after a successful rescan, or removed |
| Superseded | Frozen, removed |
| Removed | Terminal for public discovery; retention rules still apply |

#### Order And Entitlement

| Event | Order state | Entitlement effect |
| --- | --- | --- |
| Checkout created | Pending | None |
| Checkout expired or canceled | Canceled | None |
| Signed payment success | Paid | Create or activate workspace entitlement |
| Payment failure | Failed | None |
| Refund submitted | Refund pending | Suspend new exports |
| Signed refund success | Refunded | Revoke future gated access |
| Dispute opened | Disputed | Freeze access and unpaid transfer |
| Dispute won | Paid | Restore entitlement if otherwise valid |
| Dispute lost | Charged back | Revoke entitlement and reverse creator balance |

#### Install

| State | Meaning |
| --- | --- |
| Setup required | Entitlement exists but setup checklist is incomplete |
| Ready | Required setup items are marked complete |
| Update available | A newer non-blocked published version exists |
| Frozen | Pinned version has a security, legal, entitlement, or dispute restriction |
| Removed | Workspace removed the install record; entitlement may still exist |

#### Support

Open moves to waiting on creator, waiting on buyer, escalated, or resolved. Resolved tickets can reopen within 14 days. SLA clocks pause only while waiting on the buyer. All assignment and state changes are audited.

### Exact Install And License Contract

“Install” has one precise V1 meaning: create or confirm a workspace entitlement, create a workspace install record, pin a specific non-blocked version, and expose that version’s setup, export, deployment, update, support, and review controls.

Free template:

1. User chooses a workspace.
2. Server verifies the current version is published and non-blocked.
3. One transaction creates a free entitlement, install record, install event, and outbox notification.
4. Public-repository templates may show a repository link and Vercel Deploy Button.
5. The Agent Transit snapshot remains available through an entitlement-checked export.

Paid template:

1. User chooses a workspace and the server creates a pending order with a price snapshot.
2. Stripe Checkout collects payment.
3. The success page shows pending until a signed webhook marks the order paid.
4. The webhook transaction creates the entitlement, install, ledger entries, creator transfer hold, and notification.
5. The workspace can then export the pinned package or follow deployment instructions.

V1 standard paid license:

- The entitlement belongs to one workspace representing one buyer organization.
- All workspace members with source-access permission may use it.
- It permits unlimited internal deployments owned and controlled by that buyer organization.
- It prohibits resale, redistribution, republishing, sublicensing, or using the package to create a competing template listing.
- It includes access to all future non-blocked versions of the same template product.
- A creator price change affects new orders only.
- Delisting preserves existing access to the last non-blocked entitled version.
- A security or legal takedown can freeze a version and remove future download access.
- A refund or lost dispute revokes future gated downloads, updates, and support entitlement.
- Agent Transit cannot technically erase source already exported or deployments already created; license terms continue to govern those copies.

Free templates retain their declared open-source or source-available license. The Agent Transit entitlement is still created for install history, reviews, update notices, and support.

V1 records environment-variable names and checklist completion only. Secret values and provider tokens are configured by the buyer directly in the deployment platform.

### Commerce And Payout Architecture

Creator onboarding:

- Use Stripe Connect Express hosted onboarding.
- Paid listings require charges and payouts capabilities to be enabled and no blocking requirement.
- Store only Stripe identifiers and capability state; Stripe owns bank, tax-ID, and identity documents.
- Account-update webhooks can pause paid sales or transfers without affecting eligible free listings.

Checkout:

- The application, not the browser, loads authoritative price, currency, creator, version, workspace, and entitlement state.
- Create the order before the Checkout Session.
- Include order, workspace, template, creator, and price-version identifiers in Stripe metadata.
- Use one item per Checkout Session in V1.
- Use idempotency keys so retries cannot create duplicate sessions or orders.
- Never grant access from the success URL.

Funds:

- Charge the buyer on the Agent Transit platform account.
- Use separate charges and transfers.
- Buyer tax is excluded from the creator revenue split.
- Creator share is 80% of the pre-tax item subtotal.
- Agent Transit share is 20% and absorbs Stripe payment and Connect fees.
- Create a pending creator transfer with <code>hold_until = paid_at + 7 days</code>.
- A scheduled job releases the transfer only when the order is paid, no refund or dispute is open, the version is not frozen for fraud, and the connected account can receive transfers.
- Stripe availability rules can delay funds beyond Agent Transit’s hold; the creator UI distinguishes platform hold, Stripe pending, available, transferred, and bank payout.
- A refund before transfer cancels the pending transfer. A refund after transfer creates a transfer reversal or negative creator ledger balance.
- A dispute freezes the related transfer and can place a risk hold on the creator account.
- Payout and transfer failures remain retryable and visible to Finance; they never silently mark a creator paid.

Tax:

- Enable Stripe Tax for checkout calculation.
- The technical design treats Agent Transit as the marketplace tax collector and excludes collected tax from creator revenue.
- Stripe is not a merchant-of-record service.
- Paid launch is blocked until qualified legal and tax advisors confirm marketplace-facilitator, seller-of-record, refund, 1099, and state-registration obligations.
- Store Stripe tax transaction identifiers and immutable order tax snapshots.

Refunds and disputes:

- V1 supports full refunds only.
- Buyer submits a reason and evidence through Agent Transit.
- Automatic duplicate-charge and confirmed-fraud refunds are allowed.
- Product-quality refunds within seven days route to Support or Finance under the published digital-goods policy.
- A signed refund webhook is authoritative for final state and entitlement revocation.
- Dispute evidence includes the listing snapshot, license, checkout consent, entitlement, export events, support history, and refund history.
- Creator balances can become negative; future transfers first offset that balance.
- Creator terms must authorize transfer reversals, reserves, and withholding for fraud, refunds, security incidents, and chargebacks.

Required Stripe event handling includes Checkout completion and expiration, asynchronous payment success and failure, refunds, disputes, account capability updates, transfers, and payouts. Every provider event is stored once by unique event identifier and processed idempotently from the raw signature-verified request body.

### UI Route Architecture

#### Public Routes

| Route | Purpose |
| --- | --- |
| <code>/</code> | Marketplace home |
| <code>/discover</code> | Search, filters, sorting, and results |
| <code>/collections/[slug]</code> | Curated collection |
| <code>/templates/[slug]</code> | Template detail and install or buy action |
| <code>/creators/[slug]</code> | Public creator profile |
| <code>/docs</code> | Manifest, trust, installation, commerce, and policy documentation |

#### Buyer Routes

| Route | Required access |
| --- | --- |
| <code>/workspace</code> | Workspace membership |
| <code>/workspace/installs/[id]</code> | Workspace membership plus install access |
| <code>/workspace/billing</code> | Owner, Admin, or Billing |
| <code>/checkout/success</code> | Authenticated buyer; display-only payment reconciliation |
| <code>/checkout/cancel</code> | Authenticated buyer |
| <code>/support/[id]</code> | Ticket participant, creator support role, or platform support |

#### Creator Routes

| Route | Required access |
| --- | --- |
| <code>/creator</code> | Creator membership |
| <code>/creator/templates/new</code> | Owner, Admin, or Editor |
| <code>/creator/templates/[id]</code> | Creator membership scoped to owning organization |
| <code>/creator/sales</code> | Owner, Admin, or Finance |
| <code>/creator/support</code> | Owner, Admin, or Support |
| <code>/creator/settings</code> | Owner or Admin; payout-bank changes require Owner |

#### Admin Routes

| Route | Required platform role |
| --- | --- |
| <code>/admin/review</code> | Reviewer, Security, or Super Admin |
| <code>/admin/templates/[id]</code> | Reviewer, Security, Support, or Super Admin |
| <code>/admin/scans/[id]</code> | Reviewer, Security, or Super Admin |
| <code>/admin/collections</code> | Curator or Super Admin |
| <code>/admin/creators</code> | Reviewer, Security, Finance, Support, or Super Admin with field-level limits |
| <code>/admin/support</code> | Support or Super Admin |
| <code>/admin/analytics</code> | Role-limited aggregate data |
| <code>/admin/moderation</code> | Reviewer, Security, Support, or Super Admin |

### Action And API Contracts

Internal forms should use Server Actions where they improve progressive enhancement. Route Handlers are required for uploads, downloads, externally called callbacks, webhooks, and machine-readable APIs.

| Method and route | Caller | Contract |
| --- | --- | --- |
| <code>GET /api/catalog/templates</code> | Public | Cursor-paginated published results with validated filters |
| <code>POST /api/uploads/token</code> | Creator | Issue one scoped private-Blob upload token |
| <code>POST /api/submissions/repository</code> | Creator | Resolve a public repository reference and create submission |
| <code>POST /api/submissions/[id]/finalize</code> | Creator | Confirm upload, validate ownership, and queue validation |
| <code>POST /api/scans/callback</code> | Scanner | HMAC-signed idempotent scan result |
| <code>POST /api/admin/reviews/[id]/decision</code> | Reviewer or Security | Optimistic, audited review transition |
| <code>POST /api/installs</code> | Buyer | Idempotently create free entitlement and install |
| <code>POST /api/checkout/sessions</code> | Buyer | Create pending order and Stripe Checkout Session |
| <code>POST /api/stripe/webhook</code> | Stripe | Raw-body signature verification and idempotent event ingestion |
| <code>POST /api/exports</code> | Entitled workspace user | Authorize exact version and return five-minute signed URL |
| <code>POST /api/deploy-links</code> | Entitled workspace user | Generate only an allowed public-repo deploy link or instructions |
| <code>POST /api/refunds</code> | Buyer | Create refund request; no direct client refund state |
| <code>POST /api/support/tickets</code> | Buyer or creator | Open scoped support case |
| <code>POST /api/support/tickets/[id]/messages</code> | Ticket participant | Add message with visibility and attachment validation |
| <code>POST /api/reviews</code> | Verified workspace | Create or replace the workspace’s one review |
| <code>POST /api/creator/connect</code> | Creator Owner | Create Stripe onboarding link |

API rules:

- All mutations validate session, tenant membership, role, resource ownership, and current state on the server.
- Browser mutations require same-origin or approved-origin checks and CSRF protection where cookies are used.
- Money, install, upload-finalization, review-decision, and callback requests accept an idempotency key.
- Responses use stable machine codes, a human message, request identifier, and field errors when applicable.
- Lists use cursor pagination. Offset pagination is limited to small administrative lists.
- External callbacks have independent secrets, timestamp windows, nonce replay protection, and rate limits.
- No GET request performs a mutation.
- Public rate limits apply by IP and route; authenticated quotas also apply by user, workspace, and creator organization.

### Search, Ranking, And Liquidity

V1 search uses Postgres full-text search for title, summary, creator, outcomes, and integrations, with pg_trgm for typo tolerance. Indexed filters cover category, tag, runtime, price, trust result, rating, creator verification, and update date.

Eligibility precedes ranking:

- Listing is published.
- Current version is published and non-blocked.
- Creator and template are not suspended.
- Paid template has a valid sale configuration.
- Requested filters match.

Recommended ranking is versioned and explainable:

- Query relevance: 40%.
- Static trust and declaration completeness: 15%.
- Bayesian-adjusted verified rating: 10%.
- Unique verified workspace installs in the last 30 days: 10%.
- Detail-to-install or purchase conversion: 8%.
- Setup completion and retained installs: 7%.
- Creator support health: 5%.
- Update freshness: 3%.
- Disclosed editorial boost: 2%.

Refunds, disputes, unresolved support, stale compatibility, abuse signals, and security history apply bounded penalties. A security freeze removes eligibility entirely.

Anti-abuse rules:

- Count one install per workspace and template for ranking.
- Paid purchases carry more confidence than free installs.
- Free installs influence ranking only after a setup, export, or deploy event.
- One review is allowed per workspace and template.
- Creator members, related workspaces, suspicious account clusters, repeated payment instruments, and rapid install bursts are excluded or down-weighted.
- Rating uses a Bayesian prior so a single five-star review cannot outrank established products.
- Editorial boosts are labeled, expire automatically, and are recorded in ranking snapshots.
- Paid placement does not exist in V1.

Liquidity launch:

- Begin with invited creators and a curated minimum of 30 clean templates across Support, Engineering, and Sales.
- Require manual review for all launch inventory.
- Open buyer access after each focus line has at least five credible alternatives for its primary outcomes.
- Open creator self-service submissions before enabling trusted auto-publish.
- Turn on paid checkout only after free install activation, entitlement, export, support, refund, and incident flows pass production-readiness tests.
- Track search coverage, time to first install, time to first creator sale, install activation, support resolution, refund rate, and percentage of searches returning at least three eligible results.

### Rendering, Caching, And Performance

- Public home, collection, creator, and template pages use Server Components with tagged cache entries and on-demand invalidation after publish, price, trust, rating, or availability changes.
- Search is dynamic and may use a short shared cache keyed by normalized query and filters.
- Workspace, creator, admin, order, entitlement, and support data is never placed in a shared public cache.
- Interactive filters, upload progress, checkout controls, and setup checklists are narrow Client Components.
- Revalidate catalog tags after a transaction commits through an outbox event; never invalidate before the authoritative write.
- Private package responses use <code>Cache-Control: private, no-store</code> or a five-minute signed direct URL.
- Public assets use immutable URLs and long-lived caching.
- Search queries have covering indexes and capped result windows.
- Public read paths may add a Neon read replica only after measured load justifies it.

Performance targets:

- Public cached page response p95 under 500 ms at the application edge.
- Uncached catalog and search p95 under 750 ms under expected beta load.
- Authenticated mutation p95 under 1 second, excluding Stripe, Blob upload, and scan duration.
- Entitlement visible within 60 seconds of receipt of a valid payment event.
- 95% of valid 50 MB-or-smaller scans complete within 10 minutes.
- No layout shift from loading, badge, price, or status changes.

### Jobs, Events, And Idempotency

The Postgres outbox is written in the same transaction as domain changes. Vercel Cron dispatchers claim due rows with row locks, process bounded batches, and record attempt, timeout, next-attempt, and result.

Required jobs:

- Scan dispatch and timeout reconciliation.
- Blob upload completion reconciliation.
- Orphan staging-object cleanup.
- Email and in-app notification delivery.
- Catalog cache invalidation.
- Search projection refresh.
- Scheduled rescans after rule or advisory changes.
- Seven-day creator transfer release.
- Transfer and payout reconciliation.
- Refund and dispute reconciliation.
- Support SLA escalation.
- Retention and anonymization.
- Dead-letter alerting.

Retry policy:

- Exponential backoff with jitter.
- Provider-specific retry ceilings.
- A permanent domain error goes directly to failed with a visible reason.
- Exhausted infrastructure failures move to dead letter and page the owning team.
- Every handler is safe to run more than once.
- Every external provider identifier has a unique database constraint.
- State transitions use transactions and reject stale expected versions.

Core domain events include submission created, artifact snapshotted, validation failed, scan completed, review requested, version published, version frozen, order paid, entitlement granted, install created, refund completed, dispute opened, transfer released, update available, ticket escalated, and review published.

### Security Architecture

- Use the latest patched stable Next.js and React releases. Vercel Firewall is defense in depth, not a substitute for dependency updates.
- Neon, Stripe, and Blob credentials exist only in Vercel server environments.
- Use OIDC and short-lived credentials where the provider supports them.
- Database access is server-only; V1 does not expose the Neon Data API directly to browsers.
- Use least-privilege database roles for runtime, migrations, analytics, and administrative jobs.
- Encrypt traffic with TLS and rely on provider encryption at rest.
- Do not store buyer secrets, Stripe identity documents, bank details, package-extracted secrets, or deployment credentials.
- Never log package contents, environment values, Stripe payload secrets, signed Blob URLs, session tokens, or authorization headers.
- Apply Content Security Policy, secure cookies, strict transport security, frame restrictions, MIME sniffing protection, and safe referrer policy.
- Validate and sanitize all public listing text and media metadata.
- Rate-limit sign-in, upload token, repository import, checkout, export, review, support, and callback endpoints.
- Require step-up authentication for ownership transfer, payout changes, destructive moderation, large refunds, and Super Admin actions.
- Preserve append-only audit history for protected actions.
- Download authorization fails closed when Neon, entitlement, or security state cannot be verified.
- Scanner, Stripe, and Blob callbacks reject invalid signatures before parsing business fields.

Incident response:

1. Freeze the affected artifact hash and all versions referencing it.
2. Disable new exports, updates, checkout, and deploy links.
3. Preserve package, report, findings, audit events, and relevant logs.
4. Identify entitled workspaces and export history.
5. Notify Security, affected creators, and buyers with specific remediation.
6. Publish or recommend the last known non-blocked version where appropriate.
7. Rotate platform credentials if exposure is possible.
8. Record root cause, containment, recovery, and rule changes.
9. Rescan related artifacts and only unfreeze after a clean or reviewed warning result.

### Privacy, Legal, And Marketplace Policy Gates

Before paid public launch, publish and obtain appropriate acceptance for:

- Buyer terms of service.
- Creator marketplace agreement.
- Agent Transit Standard Marketplace License.
- Privacy policy and cookie policy.
- Acceptable-use and prohibited-content policy.
- Static-scan limitations and security disclosure policy.
- Refund and dispute policy.
- Creator payout, reserve, reversal, and tax policy.
- IP ownership warranty, DMCA or equivalent takedown process, and repeat-infringer policy.
- Support and response-time policy.
- Data retention and account-deletion policy.

Creators retain ownership of their packages and grant Agent Transit the rights needed to scan, store, market, distribute, preserve evidence, and provide entitled access. Creators warrant that they control submitted content and dependencies. Buyers receive only the declared open-source license or the Agent Transit Standard Marketplace License.

Legal or IP removal differs from security freezing: a legal takedown can restrict even previously entitled downloads, while a normal creator delisting preserves access to the last non-blocked version.

### Data Retention And Recovery

Default retention, subject to legal confirmation:

- Published package snapshots: while published or while any entitlement remains active.
- Delisted but entitled non-blocked snapshots: while an entitlement remains active.
- Blocked security evidence: at least one year after case closure.
- Orders, ledger, refunds, disputes, transfers, and tax records: seven years.
- Moderation and entitlement events: seven years.
- Support tickets: two years after resolution.
- Application logs: 30 days, with longer security-event retention when required.
- Orphan staging uploads: delete after 24 hours.
- Expired upload tokens and nonces: retain hashes only as needed for replay protection.
- Deleted-user public profile data: anonymize within 30 days unless financial, security, support, or legal retention applies.

Neon production uses a protected branch with a restore window selected to meet a five-minute recovery-point target and one-hour recovery-time target. Restore procedures are tested quarterly. Blob metadata and package hashes in Postgres make missing-object reconciliation possible. Stripe event replay and a financial reconciliation job repair missed webhook processing.

### Environments And Delivery

| Environment | Database | Blob | Stripe | Scanner |
| --- | --- | --- | --- | --- |
| Local | Developer Neon branch or local Postgres | Development store | Stripe test mode | Local fixture scanner or test workflow |
| Preview | Ephemeral schema-only or sanitized Neon branch per pull request | Isolated preview prefix or store | Stripe test mode | Non-production workflow and callback secret |
| Staging | Stable sanitized Neon branch | Staging public and private stores | Stripe test mode | Staging scanner |
| Production | Protected Neon production branch | Production public and private stores | Stripe live mode | Production scanner |

Delivery rules:

- GitHub is the source repository and Vercel creates preview deployments for pull requests.
- Preview environments never receive production Stripe, Blob, scanner, auth, or database credentials.
- Drizzle migrations are generated as reviewed SQL and tested against an isolated Neon branch.
- Migrations are forward-compatible with the currently deployed application.
- Production migrations run through a gated CI step before code that requires them is promoted.
- Destructive schema cleanup occurs in a later release after old code is gone.
- Seed data contains no production buyer, creator, package, or payment information.
- The production domain is <code>agentransit.com</code>; preview domains are never accepted as Stripe live return or webhook origins.
- Feature flags control paid checkout, creator submissions, trusted auto-publish, exports, payouts, and emergency marketplace maintenance.

### Observability And Operational Control

Every request receives a request identifier propagated through database events, outbox jobs, scanner jobs, Stripe metadata, support context, and audit events.

Required dashboards and alerts:

- Request error rate and latency by route.
- Authentication and authorization failures.
- Upload failures, orphan objects, and package-size rejections.
- Validation and scan queue age, duration, failure, warning, and block rate.
- Review queue age and SLA breaches.
- Checkout creation, payment success, webhook lag, and entitlement lag.
- Refund and dispute rate by creator and template.
- Transfers approaching or exceeding hold release.
- Export authorization denials and unusual download volume.
- Support backlog and response SLA.
- Search zero-result rate and marketplace coverage.
- Neon connection, query latency, storage, and branch health.
- Blob errors and missing-object reconciliation.
- Dead-letter jobs and repeated provider failures.

Operational kill switches can disable new submissions, auto-publishing, paid checkout, exports, deploy links, refunds, or creator transfers independently without taking down public browsing.

### Testing And Release Gates

Unit tests:

- Manifest schema and semantic validation.
- Archive path and package-limit enforcement.
- Permission and outbound declaration comparison.
- Risk scoring and publishing matrix.
- Role and tenant authorization.
- Pricing, tax exclusion, 80/20 split, refunds, reversals, and negative balances.
- Entitlement, install, update, delisting, freezing, and revocation.
- Ranking inputs, Bayesian rating, penalties, and anti-abuse rules.
- Every state-machine transition.

Integration tests:

- Direct ZIP upload and Blob callback reconciliation.
- Public repository resolution to immutable commit.
- Clean scan auto-publish and first-template review.
- Warning review, blocked artifact, false-positive rescan, and scanner failure.
- Free install transaction.
- Paid Checkout webhook through entitlement and held transfer.
- Duplicate and out-of-order Stripe events.
- Refund before and after transfer.
- Dispute open, win, and loss.
- Entitlement-protected signed export.
- Update availability and version pinning.
- Creator support and verified review creation.
- Search indexing after publication and freeze.

End-to-end tests:

- Buyer browse to free install to setup to export.
- Paid purchase to webhook-confirmed workspace access.
- Creator repository and ZIP submission through validation, scan, review, and publication.
- Buyer refund and support request.
- Admin scan review, creator verification, freeze, and notification.
- Mobile and desktop responsive flows with keyboard navigation.

Security tests:

- Cross-workspace and cross-creator authorization attempts.
- Admin role separation and step-up authentication.
- Stripe and scanner signature tampering and replay.
- CSRF, open redirects, SSRF through repository URLs, archive traversal, zip bombs, symlinks, malicious filenames, and stored XSS.
- Unauthorized Blob access and expired signed URLs.
- Secret leakage in logs, reports, and error messages.
- Frozen-version download and checkout denial.
- Rate-limit and abuse-control behavior.
- Scanner corpus with known malicious and false-positive fixtures.

Release gates:

- Migrations pass on an isolated Neon branch and have a rollback or forward-fix procedure.
- All critical and high security findings are resolved.
- Payment, refund, dispute, payout, and entitlement reconciliation pass in Stripe test mode.
- Restore drill succeeds.
- No route relies on proxy alone for authorization.
- Accessibility checks meet WCAG 2.2 AA targets.
- The architecture’s core flows pass in both desktop and mobile E2E tests.
- Paid launch legal and tax gates are signed off.
- Incident contacts, kill switches, and runbooks are verified.

### Architecture Acceptance Criteria

The V1 architecture is complete when an implementation can demonstrate:

- Every protected row belongs to a defined tenant and every action maps to a role.
- Every submitted package maps to one immutable hash, manifest, scan history, and decision history.
- No blocked artifact can become public or downloadable through an administrative shortcut.
- Every paid entitlement traces to a signed, idempotently processed Stripe event.
- Every creator transfer traces to an order, ledger split, hold, and release decision.
- Every export traces to an active entitlement, exact version, user, and artifact hash.
- Refunds, disputes, delisting, and security freezes have deterministic access outcomes.
- Search and ranking exclude ineligible versions and can explain major signals.
- Every external event can be retried without duplicating money, access, installs, or notifications.
- Preview, staging, and production data and secrets are isolated.
- The system can recover from missed webhooks, scanner timeouts, orphan uploads, failed transfers, and database restoration.
- The documented buyer, creator, and admin flows can be implemented without inventing an undefined business rule.

### Architecture References

- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Neon Auth](https://neon.com/docs/guides/neon-auth)
- [Neon branching workflows](https://neon.com/docs/guides/branching-intro)
- [Vercel Blob](https://vercel.com/docs/vercel-blob)
- [Vercel Private Blob signed access](https://vercel.com/docs/vercel-blob/private-storage)
- [Stripe Connect account types](https://docs.stripe.com/connect/accounts)
- [Stripe separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers)
- [Stripe connected-account payouts](https://docs.stripe.com/connect/marketplace/tasks/payout)
- [Stripe Tax with Connect](https://docs.stripe.com/tax/connect)

---

## Design Specification

This section is the source of truth for the Agent Transit product design. It describes the intended experience and interaction model; it does not represent completed application code.

### Design Thesis

Agent Transit should feel like a working transit network for AI labor: immediate, systematic, information-rich, and easy to navigate under pressure.

The product is a marketplace interface, not a generic AI landing page. The first screen must expose real templates, search, categories, price, and trust signals. The transit metaphor should strengthen orientation and status without replacing familiar marketplace language.

Design personality:

- Editorial and industrial rather than glossy or futuristic.
- Dense enough for serious comparison, but consistently spaced and scannable.
- Sharp geometry, thin rules, large route signage, compact operational labels.
- High contrast with one primary action color and distinct department line colors.
- Confident, direct copy with minimal promotional filler.
- Motion is functional: route changes, scans, installs, and status transitions.

### Brand Language

- Product name: **Agent Transit**
- Domain: **agentransit.com**
- Primary mark: compact **AT** station-sign monogram.
- Brand promise: find, trust, board, and operate useful AI agents.
- Template metaphor: an **agent line**.
- Category metaphor: a **line** or **department**.
- Curated group metaphor: a **route** or **destination**.
- Install action: **Install** is the primary label; **Board** may appear as supporting brand language.
- Purchase summary: **Ticket**.
- Marketplace directory: **Discover** or **Lines directory**.
- Workspace: **Your network** may be used as a secondary label.

Use plain marketplace terms whenever the metaphor could make a task ambiguous. Never make users decode transit language to understand price, permissions, refunds, or security.

### Visual System

#### Core Colors

| Token | Value | Use |
| --- | --- | --- |
| Ink | #0D0D0C | Main background |
| Rail | #151514 | Secondary surface and tool panels |
| Cream | #ECE7DA | Primary text and light controls |
| Stone | #A39E92 | Secondary text |
| Muted | #6F6A5E | Tertiary metadata |
| Acid | #D4FF3F | Primary action, focus, selection, and clean trust accent |

#### Department Lines

| Line | Code | Color |
| --- | --- | --- |
| Support | S | #FF5A3C |
| Engineering | E | #4D9FFF |
| Sales | L | #3FD98A |
| Operations | O | #B07CFF |
| Research | R | #FFB03C |
| Marketing | M | #FF7AC4 |

Department colors identify categories, never risk level. Always pair a line color with a label or code so meaning is not conveyed by color alone.

#### Semantic Status Colors

- Clean static scan: Acid plus shield icon and explicit scan wording.
- Verified creator identity: blue plus identity-check icon and text.
- Installed or complete: Cream or neutral plus completion icon and text.
- Needs review or warning: amber plus icon and text.
- Blocked, revoked, failed, or destructive: red plus icon and text.
- Processing, queued, or draft: blue or neutral plus icon and text.
- Never reuse department colors as standalone security status indicators.

#### Typography

- Display: **Anton** for true page-level statements and major route names.
- Body and interface: **Archivo** for navigation, descriptions, forms, and dense operational content.
- Metadata: **Space Mono** for line codes, prices, versions, scan states, timestamps, and small labels.
- Display text is uppercase, compact, and reserved for true headlines.
- Card headings and dashboard headings must stay smaller than hero type.
- Use normal letter spacing; never use negative tracking.
- Font size must not scale directly with viewport width.

#### Shape And Surface

- Borders: 1 px, low-contrast cream on dark surfaces.
- Corners: square by default; up to 4 px for inputs, menus, and compact tools.
- Cards: up to 8 px only when a repeated item genuinely needs a container.
- Route markers may be circular; primary controls remain rectangular.
- Avoid shadows unless needed to separate a menu, popover, or modal.
- Avoid gradients, glassmorphism, decorative blobs, and ornamental background art.
- Do not nest cards inside cards. Page sections are full-width bands or unframed grid regions.

### Layout System

- Maximum public content width: 1280 px.
- Desktop: 12-column mental model with common 8/4 and 4/4/4 splits.
- Tablet: two-column browsing grid where content permits.
- Mobile: one primary column with filters in a drawer and purchase actions fixed near the bottom when useful.
- Base spacing rhythm: 4, 8, 12, 16, 24, 32, 48, and 64 px.
- Repeated cards and tool rows must use stable dimensions so badges, loading states, and longer labels do not cause layout shifts.
- Thin border grids should connect related items like a station board, rather than making every section float.
- Every viewport must avoid overlapping text, controls, badges, and sticky regions.

### Global Navigation

Public navigation:

- Agent Transit mark and wordmark.
- Discover.
- Collections.
- Creators.
- Docs.
- Search.
- Submit Template.
- Sign In or workspace account control.

Authenticated buyer navigation:

- Marketplace.
- Installed.
- Updates.
- Support.
- Billing.
- Workspace switcher.
- Account menu.

Creator navigation:

- Overview.
- Templates.
- Sales.
- Support.
- Settings.
- New Template as the primary action.

Admin navigation:

- Review Queue.
- Templates.
- Scans.
- Creators.
- Collections.
- Support.
- Analytics.
- Moderation log.

Desktop navigation is sticky. Mobile uses a familiar menu pattern and keeps search and the main action easy to reach.

### Public Marketplace Screens

#### Home

The first viewport contains:

- Sticky global navigation.
- A direct operational headline, not a marketing slogan.
- Marketplace search by outcome, integration, creator, or agent name.
- Visible department lines and active template counts.
- At least one row of real template cards visible without excessive scrolling.
- A clear Submit Template action.

Below the first viewport:

- Trust-weighted trending templates.
- Outcome-based collections.
- New and recently updated templates.
- Verified creators.
- A compact creator submission path.
- Marketplace trust explanation tied directly to scan badges.

#### Discover

- Search remains the dominant control.
- Filters cover department, outcome, integration, language, price, trust status, rating, and update recency.
- Sort options include Recommended, Trending, Most Installed, Highest Rated, Newest, and Recently Updated.
- Desktop filters may use a left rail or compact toolbar.
- Mobile filters open in a full-height drawer and show the active filter count.
- Results display total count, active filter chips, clear-all, loading, empty, and error states.
- Search state must be encoded in the URL so results can be shared.

#### Collections

- Collection title, practical outcome, curator, and update date appear first.
- Collections contain real template results, not decorative editorial cards.
- A collection explains why each included template belongs without duplicating the template description.
- Related collections appear after the primary result set.

#### Template Detail

The detail page must answer these questions before asking for payment:

- What job does this agent perform?
- Who made it?
- What does it cost?
- What data, permissions, environment variables, and outbound services does it require?
- What did the scan find?
- How is it installed and deployed?
- When was it last updated?
- What support and refund policy applies?

Desktop structure:

- Main content column for purpose, workflow, setup, permissions, changelog, reviews, and support.
- Sticky ticket rail for price, version, compatibility, license, install count, and Install or Buy action.
- Trust summary near the title and again in the purchase rail.
- Related templates after the complete product information.

Mobile structure:

- Single column in the same information order.
- Compact sticky action bar with price and Install or Buy.
- Security and permission details remain visible before checkout.

#### Creator Profile

- Creator identity, verification, support response time, joined date, total installs, rating, and refund health.
- Published templates with search and category filters.
- Organization members are shown only when public.
- Clear distinction between verified identity, trusted publishing status, and individual template scan status.

#### Documentation

- Manifest reference for **agenttransit.json**.
- Package and size rules.
- Scan policy and risk levels.
- Pricing, fees, refunds, and payout timing.
- Versioning and update rules.
- Buyer installation and deployment guidance.
- Support and marketplace policies.

### Template Card Anatomy

Every marketplace template card includes:

1. Department line strip or route marker.
2. Line code and department label.
3. Template title.
4. One concise outcome-focused description.
5. Creator name and verification state.
6. Trust or scan status.
7. Rating and review count.
8. Install count.
9. Price.
10. Last updated state when relevant.
11. A clear detail or install action.

Cards use a consistent height within a result grid. The primary hover treatment is a restrained surface or border change. Trust, price, and creator information may never be hidden behind hover.

Featured cards may use the Acid surface, but only one featured item should dominate a browsing section.

### Buyer Workspace

The workspace is operational software, not a decorative dashboard.

Workspace home:

- Installed templates.
- Setup progress.
- Available updates.
- Recent support activity.
- Failed or revoked access states.
- Team members and roles where relevant.

Install detail:

- Current pinned version.
- Setup checklist with explicit completion state.
- Required environment variables without exposing secret values.
- Integration connection state.
- ZIP export for entitled users.
- Vercel deployment instructions or deploy action.
- Update comparison and changelog.
- Rollback or remain-pinned choice.
- Creator support and review action.
- Purchase, entitlement, refund, and access history.

Use rows, tables, and split panels for repeated operational information. Avoid a dashboard made entirely from oversized statistic cards.

### Creator Console

Creator overview:

- Drafts, scans in progress, review requests, published templates, sales, payouts, refunds, and unanswered support.
- Primary action: New Template.
- Alerts are ordered by action required, not by vanity metrics.

Submission flow:

1. Choose public repository or ZIP upload.
2. Check the 50 MB package limit and supported JavaScript, TypeScript, or Python format.
3. Locate and validate **agenttransit.json**.
4. Show manifest errors inline with exact paths and corrections.
5. Review detected permissions, integrations, environment variables, license, price, and support policy.
6. Create an immutable package snapshot.
7. Run the static scan.
8. Display clean, warning, blocked, or manual-review status.
9. Allow submission for review when eligible.
10. Publish immediately only when trust policy permits.

Template management:

- Version history is immutable and chronological.
- A new release always creates a new version.
- Scan findings stay attached to the scanned version.
- Creators can edit listing copy separately from versioned package contents when policy permits.
- Sales, refunds, conversion, support response, and rating health appear in context.
- Payout onboarding clearly separates platform fees, pending balance, hold period, available balance, and paid balance.

### Admin Console

The admin experience prioritizes decisions and auditability.

Review queue rows include:

- Template and creator.
- Review reason.
- First-template status.
- Scan risk and finding count.
- Package language and size.
- Price.
- Submitted time.
- Queue age.
- Assigned reviewer.

Review detail includes:

- Manifest summary.
- File tree.
- Scan findings grouped by severity and detector.
- Declared versus detected permissions and outbound services.
- Creator history.
- Version history.
- License and support details.
- Approve, request changes, block, and escalate actions.
- Mandatory reason for every decision.
- Immutable moderation event log.

Collections, taxonomy, creator verification, support, refunds, disputes, and analytics use dense work-focused views with filters, bulk actions where safe, and explicit confirmation for destructive actions.

### Buyer Flow

~~~mermaid
flowchart LR
    A["Home or Discover"] --> B["Search and filter"]
    B --> C["Template detail"]
    C --> D["Review trust, permissions, setup, support, and price"]
    D --> E{"Free or paid?"}
    E -->|Free| F["Confirm install"]
    E -->|Paid| G["Stripe Checkout"]
    G --> H{"Payment webhook confirms entitlement"}
    H -->|Yes| F
    H -->|No| I["Recover or contact support"]
    F --> J["Workspace install detail"]
    J --> K["Complete setup"]
    K --> L["Export or deploy"]
    L --> M["Pin or update version"]
    M --> N["Support, refund, or review"]
~~~

Buyer rules:

- A user may inspect every trust and compatibility requirement before authentication or checkout.
- Paid downloads and exports require a valid entitlement.
- Checkout success is provisional until the signed webhook creates the entitlement.
- A refund visibly revokes access while preserving order and support history.
- Reviews require a verified workspace entitlement. Paid purchases qualify after payment; free installs qualify after a setup, export, or deploy event plus anti-abuse checks. Each workspace may leave one review per template.

### Creator Flow

~~~mermaid
flowchart LR
    A["Creator dashboard"] --> B["New template"]
    B --> C{"Repository or ZIP?"}
    C --> D["Package intake"]
    D --> E["Validate agenttransit.json"]
    E -->|Invalid| F["Inline corrections"]
    F --> E
    E -->|Valid| G["Immutable snapshot"]
    G --> H["Static scan"]
    H --> I{"Risk result"}
    I -->|Blocked| J["Frozen version and findings"]
    I -->|Warning| K["Admin review"]
    I -->|Clean, new creator| L["First-template review"]
    I -->|Clean, trusted creator| M["Publish"]
    K -->|Approved| M
    L -->|Approved| M
    K -->|Changes requested| N["Create corrected version"]
    L -->|Changes requested| N
    N --> E
    M --> O["Sales, support, and updates"]
~~~

Creator rules:

- Upload progress, validation, scan, and review are distinct states.
- A creator can leave and return without losing draft progress.
- Blocked versions cannot be altered or silently replaced.
- Review decisions include a reason and next action.
- Publishing success links directly to the public listing and creator management page.

### Admin Flow

~~~mermaid
flowchart LR
    A["Review queue"] --> B["Open submission"]
    B --> C["Inspect manifest, files, scan findings, and creator history"]
    C --> D{"Decision"}
    D -->|Approve| E["Publish or schedule"]
    D -->|Request changes| F["Return findings to creator"]
    D -->|Block| G["Freeze version and revoke publish eligibility"]
    D -->|Escalate| H["Security or policy review"]
    E --> I["Write moderation event"]
    F --> I
    G --> I
    H --> I
    I --> J["Notify affected parties"]
~~~

Admin rules:

- High-risk or blocked artifacts cannot be published by any role. A security reviewer may document a false-positive suppression for that exact artifact hash, but the artifact must be rescanned and receive a non-blocked result before publication.
- Decisions are version-specific.
- Creator trust may influence routing but never hides scan findings.
- Refund, entitlement, and moderation actions must be auditable.

### Interaction Rules

- One primary action per decision region.
- Buttons use icons for familiar tool actions; text labels remain for consequential commands.
- Unfamiliar icon-only controls require tooltips and accessible labels.
- Search responds immediately but preserves a clear submit action and URL state.
- Filters show selected state, result count, and an obvious reset path.
- Forms validate inline and retain entered data after recoverable errors.
- Package upload shows file name, size, progress, cancel, retry, and rejection reason.
- Scan progress shows queued, scanning, complete, warning, blocked, and failed states.
- Checkout, installation, publishing, refunding, and destructive actions prevent duplicate submission.
- Toasts confirm minor actions; consequential results remain visible in the page state.
- Motion uses short, restrained transitions and respects reduced-motion settings.
- Focus indicators use Acid on dark surfaces and Ink on Acid surfaces.

### Required Product States

Every core screen must design:

- Loading and skeleton state.
- Empty state with a relevant next action.
- No search results.
- Validation error.
- Permission or role denied.
- Network or service failure.
- Draft and unsaved changes.
- Queued and processing.
- Clean, warning, blocked, and scan-failed.
- Checkout pending, paid, failed, canceled, and refunded.
- Entitled, expired or revoked, and unauthorized.
- Install incomplete, ready, update available, and frozen.
- Support open, waiting on buyer, waiting on creator, resolved, and escalated.

### Responsive Rules

- Design reference frames: 1440 px desktop, 1024 px tablet, and 390 px mobile.
- Public card grids move from three columns to two to one.
- Long filters become drawers or menus instead of wrapping into unusable rows.
- Dense tables become labeled list rows on mobile; no critical column may simply disappear.
- Sticky desktop side rails become inline sections or bottom action bars on mobile.
- Touch targets are at least 44 by 44 px.
- Long names, prices, versions, and status labels wrap safely without moving neighboring controls.
- Hero content must leave the marketplace inventory visible or clearly hinted at on common desktop and mobile viewports.

### Accessibility And Trust

- Target WCAG 2.2 AA contrast and keyboard operation.
- Do not rely on color, position, or icon alone to communicate status.
- All form fields have visible labels and associated error text.
- Focus order follows the visual task order.
- Dialogs trap focus and return it to the launching control.
- Scan findings and permissions use plain-language summaries with technical detail available.
- Security badges link to the exact scan result and timestamp.
- Paid actions clearly state price, fee responsibility, license, refund policy, and what access the buyer receives.

### Marketplace Patterns To Borrow

These are product-behavior references, not visual templates to copy:

- Shopify App Store: outcome-oriented discovery, consistent listing structure, and visible reviews.
- ThemeForest: compatibility, version history, technical metadata, support, and update expectations.
- Vercel Marketplace: installation as the center of the conversion flow.
- Hugging Face: structured technical metadata and trust information near the artifact.
- Etsy and Gumroad: creator identity, product ownership, and understandable seller economics.
- Product Hunt: new, trending, and launch-driven discovery.

Agent Transit should combine these proven behaviors with its own transit-signage identity.

### Design Constraints

Do not:

- Build a generic SaaS landing page as the primary experience.
- Hide the marketplace below an oversized hero.
- Use purple-blue gradients, decorative orbs, glass cards, or stock AI imagery.
- Fill the interface with rounded pill controls when a standard control works better.
- Put page sections inside floating cards or place cards inside cards.
- Hide permissions, scan findings, support terms, or version history until after purchase.
- Treat seller submission, support, refunds, or moderation as secondary edge cases.
- Use fake analytics or decorative charts where actionable rows are needed.
- Use the transit metaphor where standard commerce or security language is clearer.

### Design Completion Checklist

A design is ready for implementation only when:

- A new buyer can identify purpose, price, trust, permissions, and install path from a template page.
- A buyer can complete free and paid installation flows and recover from failure.
- A creator can submit, correct, scan, review, publish, update, sell, and support a template.
- An admin can understand why an item entered review and make an auditable decision.
- All routes have responsive desktop and mobile behavior.
- All core loading, empty, error, risk, payment, entitlement, and update states are represented.
- Shared components have stable anatomy and reusable states.
- The marketplace first screen contains real inventory and actionable discovery.
- The visual system consistently uses Agent Transit branding without reducing usability.

