# Registry Handoff

## Current State

- upstream: `cardinal@2.1.1`
- Stackline release: `@stackline/cardinal@1.0.0`
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

- SHA-1: `537b3fea1116dc90be4dd9011bff15ef0e8137bc`
- integrity: `sha512-n1nxMs8QRkIan8ysMbFk6NJ5iwkQqisFgxgudnxvrKoeTpFhuboZ5U5mz6vx9FeKU19gJR+s6bomp68H2SClgA==`
- source: https://github.com/alexandroit/stackline-cardinal
- release: https://github.com/alexandroit/stackline-cardinal/releases/tag/stackline-v1.0.0
- npm: https://www.npmjs.com/package/@stackline/cardinal/v/1.0.0
- docs: https://alexandro.net/docs/vanilla/cardinal/
- CI: https://github.com/alexandroit/stackline-cardinal/actions/runs/33035766947
- CodeQL: https://github.com/alexandroit/stackline-cardinal/actions/runs/33035766942
