# Registry Handoff

## Current State

- upstream: `cardinal@2.1.1`
- Stackline release: `@stackline/cardinal@1.0.1`
- decision: GO
- state: published and verified
- registry scope: Verdaccio and official npm
- runtime dependencies: two Stackline-owned compatibility aliases

## Completed Release Gates

- complete upstream and regression suites
- differential oracle
- CJS, ESM, browser, TypeScript 3.9 and current TypeScript
- CLI chunk-boundary regression
- packed direct and legacy-name installs
- package quality, production audit, signatures, CI, and CodeQL
- immutable tarball hash, SBOM, GitHub release, and production docs

All gates passed. Official npm and Verdaccio expose the same artifact:

- SHA-1: `4c43143c3e854a5651c16c9a51b9c25d3352bacf`
- SHA-256: `9baa184a2f6693da7a8bac855184450c78db31fc9f437646c550be7feb48f26e`
- integrity: `sha512-ElRXiN2vDRDBVIREISWnGGi7xQw6xnGI2SHS1Zy8NRFP7Z2QCNKfQ8ZlvJxu0J6BpQMPIdDlid2XmbJMrpR6bQ==`
- source: https://github.com/alexandroit/stackline-cardinal
- release: https://github.com/alexandroit/stackline-cardinal/releases/tag/stackline-v1.0.1
- npm: https://www.npmjs.com/package/@stackline/cardinal/v/1.0.1
- docs: https://alexandro.net/docs/vanilla/cardinal/
- CI: https://github.com/alexandroit/stackline-cardinal/actions/runs/33298278791
- CodeQL: https://github.com/alexandroit/stackline-cardinal/actions/runs/33298278672

The exact artifact was accepted by Verdaccio and then published to official npm
under `alex360qc`. GitHub's publish workflow built and verified those bytes but
npm rejected its OIDC publish because the repository/workflow was not yet
registered as a Trusted Publisher. Register that mapping before a future
version; never republish or mutate 1.0.1.
