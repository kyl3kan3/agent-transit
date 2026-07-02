-- Agent Transit database schema (V1 draft outline).
-- Scaffold only: entity list and key relationships, no final DDL.

-- Identity
--   users                    buyers, creators, admins (role flags)
--   creator_profiles         creator identity, verification status, trust tier
--   organizations            creator orgs; members reference users

-- Catalog
--   templates                one row per marketplace listing; owned by creator/org
--   template_versions        immutable versions; manifest snapshot, package pointer, pin target
--   collections              admin-curated groupings
--   taxonomy                 outcome / role / category tags

-- Trust pipeline
--   submissions              repo URL or ZIP intake per version
--   scans                    scan runs; overall severity + findings (JSON)
--   review_queue             first-template and warning-level admin reviews
--   moderation_actions       blocks, takedowns, review moderation

-- Commerce
--   purchases                Stripe Checkout sessions -> completed orders
--   entitlements             paid/free access grants; revoked on refund
--   refunds                  refund requests and resolutions
--   payouts                  Stripe Connect transfers; 20% platform fee, 7-day hold

-- Workspace
--   installs                 template installed into a workspace; pinned version
--   exports                  entitlement-gated ZIP export events
--   workspaces               team workspace; members reference users

-- Feedback
--   ratings_reviews          buyer reviews; feeds trust and ranking
--   support_tickets          buyer -> creator support threads
--   platform_events          audit/analytics event stream

-- TODO: write real DDL (or adopt a migration tool) once the stack is chosen.
