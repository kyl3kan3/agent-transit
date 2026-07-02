// V1 static scan pipeline. Static-only by design: it never executes untrusted code.
// Scaffold only — not implemented.

export type Severity = 'clean' | 'warning' | 'high_risk' | 'blocked'

export interface Finding {
  check: CheckId
  severity: Severity
  message: string
  file?: string
}

export interface ScanResult {
  overall: Severity
  findings: Finding[]
}

export type CheckId =
  | 'manifest_validity'
  | 'package_size_structure'
  | 'dependency_config_risk'
  | 'dangerous_patterns'
  | 'secrets'
  | 'permission_outbound_declarations'
  | 'license_support_metadata'

// Publishing rules consume ScanResult.overall:
//   clean      -> auto-publish (trusted creators) or first-template review (new creators)
//   warning    -> admin review
//   high_risk  -> cannot publish
//   blocked    -> cannot publish
//
// TODO: implement each check as an independent function returning Finding[],
// run them over the unpacked package, and reduce to the highest severity.
export async function scanPackage(_packagePath: string): Promise<ScanResult> {
  throw new Error('Not implemented (scaffold only)')
}
