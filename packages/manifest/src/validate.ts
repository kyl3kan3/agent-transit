// Manifest validation for agent template packages.
// Used by the submission flow and the pre-review "validate a manifest" step.
// Scaffold only — not implemented.

export interface ValidationIssue {
  path: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  issues: ValidationIssue[]
}

// TODO: validate the parsed manifest against schema/agent-manifest.schema.json,
// then apply contract rules the schema can't express (e.g. pricing.amount
// required when pricing.model is one_time, entrypoint extension matches language).
export function validateManifest(_manifest: unknown): ValidationResult {
  throw new Error('Not implemented (scaffold only)')
}
