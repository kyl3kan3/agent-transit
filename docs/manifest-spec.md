# Agent Template Manifest Spec (V1 Draft)

> Draft contract. See `packages/manifest/schema/agent-manifest.schema.json` for the machine-readable skeleton and `examples/hello-agent/agent.manifest.json` for a filled example.

Every template package must include an `agent.manifest.json` at its root. V1 supports JavaScript, TypeScript, and Python templates.

## Fields

| Field | Required | Description |
| --- | --- | --- |
| `manifestVersion` | yes | Spec version this manifest targets (currently `"1.0"`). |
| `name` | yes | Unique slug for the template. |
| `displayName` | yes | Human-readable name shown in the marketplace. |
| `version` | yes | Semver version of the template package. |
| `description` | yes | What the agent does, in buyer-facing terms. |
| `language` | yes | `javascript`, `typescript`, or `python`. |
| `entrypoint` | yes | Path to the template's main source file. |
| `categories` | no | Marketplace taxonomy tags (outcome, role, category). |
| `setup.steps` | yes | Ordered human-readable setup steps. |
| `env` | yes | Environment variables the template needs (`name`, `description`, `required`, `secret`). Empty array if none. |
| `integrations` | yes | Declared third-party integrations. Empty array if none. |
| `permissions` | yes | Declared permissions/access the agent requires. Empty array if none. |
| `outboundServices` | yes | Hostnames the agent contacts at runtime. Empty array if none. |
| `pricing` | yes | `{ "model": "free" }` or `{ "model": "one_time", "amount": <cents>, "currency": "usd" }`. |
| `deploy` | yes | Deploy/export metadata: supported targets and export format. |
| `support` | yes | Support policy and contact. |
| `license` | yes | SPDX license identifier. |

## Validation and scanning

- Manifest validity is the first check in the static scan pipeline (`packages/scanner`).
- Undeclared outbound services, permissions, or env requirements discovered by static analysis are scan findings, not warnings to ignore.
