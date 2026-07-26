# hello-agent

Reference template package showing the shape every Agent Transit submission takes: an `agent.manifest.json` at the package root plus the source files it declares.

- Manifest contract: `docs/manifest-spec.md`
- Machine-readable schema: `packages/manifest/schema/agent-manifest.schema.json`

The agent itself is intentionally unimplemented — this package exists to exercise manifest validation and the static scan pipeline.
