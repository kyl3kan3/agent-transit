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

- Clean, verified, installed, or complete: Acid plus icon and text.
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
- Reviews require a real install or purchase and disclose the verified-user state.

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

- High-risk findings cannot be overridden without an escalated role and recorded reason.
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

