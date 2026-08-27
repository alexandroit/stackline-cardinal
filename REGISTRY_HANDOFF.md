# Registry Handoff

## Current State

- upstream: `cardinal@2.1.1`
- Stackline target: `@stackline/cardinal@1.0.0`
- decision: GO
- state: implementation verification in progress
- registry scope: Verdaccio and official npm
- runtime dependencies: two Stackline-owned compatibility aliases

## Release Gates

- complete upstream and regression suites
- differential oracle
- CJS, ESM, browser, TypeScript 3.9 and current TypeScript
- CLI chunk-boundary regression
- packed direct and legacy-name installs
- package quality, production audit, signatures, CI, and CodeQL
- immutable tarball hash, SBOM, GitHub release, and production docs

Artifact hashes and public URLs are recorded only after publication.
