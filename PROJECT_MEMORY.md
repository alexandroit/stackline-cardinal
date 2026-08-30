---
schema: stackline-project-memory-v1
package: cardinal
upstream: https://github.com/thlorenz/cardinal
stackline_package: "@stackline/cardinal"
state: PUBLISHED
registry_scope: verdaccio-and-public-npm
public_npm: true
public_github: true
docs_production: true
created: 2026-08-26
last_updated: 2026-08-30
---

# Project Memory

## Objective

Preserve the complete `cardinal@2.1.1` library and `cdl` command-line contract
while repairing reproducible correctness failures, replacing its two dormant
runtime dependencies with maintained Stackline-compatible implementations, and
shipping first-party modules, TypeScript declarations, verification, and public
documentation.

## Upstream Identity

- npm: `cardinal@2.1.1`
- repository: https://github.com/thlorenz/cardinal
- license: MIT, copyright 2012 Thorsten Lorenz
- latest npm release: 2018-05-22
- latest upstream repository activity: 2020-07-17
- repository state: public, unarchived, four open issues and three open pull requests

## Distribution And Adoption Snapshot

- `cardinal`: 5,956,826 downloads for the complete week 2026-08-19 through 2026-08-25
- source: official npm downloads API
- current consumers verified in source include Netlify Build, Contentful
  Migration, Refine CLI, tapjs/treport, and American Express
  `json-parse-context`
- observed contracts include CommonJS destructuring, TypeScript default and
  namespace imports, `highlight`, `highlightFileSync`, object themes, JSX, and
  line numbering

## Verified Gaps

1. `highlight('', { linenos: true })` never returns because the trailing-line
   loop keeps popping an already empty array.
2. The public library API documents a theme object but users reasonably pass
   the same built-in name or custom path accepted by `.cardinalrc`; those string
   values currently reach `redeyed` and throw. Upstream issue #13 records the
   same inconsistency.
3. The `cdl` pipe implementation parses arbitrary stream chunks as complete
   lines. A source line split across chunks is changed and highlighted as two
   unrelated fragments; trailing newlines can also be duplicated.
4. Cardinal does not forward the existing parser extension surface offered by
   its `redeyed` dependency, preventing opt-in highlighting of current syntax.
5. Types exist only in DefinitelyTyped, require TypeScript 4.5, and type the
   asynchronous `highlightFile` overload as returning a string even though the
   runtime returns `undefined`.
6. The published artifact includes tests, examples, screenshots, and obsolete
   project metadata rather than an explicit runtime allowlist.
7. The old development dependency tree reports six audit findings. The two
   production dependencies report no advisories, but both upstream packages
   were last released in 2014 and 2018.

## Compatibility Boundary

Preserve the `highlight`, `highlightFile`, and `highlightFileSync` signatures;
ANSI output; object themes; built-in themes; JSX, JSON, line-number and first
line behavior; error prefix; `.cardinalrc`; `cdl` file and pipe modes; CommonJS
entry; and historical deep theme imports. Existing code can also retain the
package key `cardinal` through an npm alias.

The default tokenizer and output remain unchanged. Parser adapters and parser
options are opt-in. Theme strings extend the library to match the CLI; they do
not replace object themes.

## Decision Gates

- legal/provenance: PASS - clear MIT grant and original notice
- real problem: PASS - three runtime failures reproduced independently
- forward-looking necessity: PASS - nearly six million weekly downloads and
  actively maintained downstreams
- differentiation: PASS - compact source-preserving ANSI highlighting remains
  materially smaller and more compatible than broad highlighter frameworks
- compatibility feasibility: PASS - 174 upstream assertions, a differential
  oracle, and several live downstream contracts are available
- maintenance burden: PASS - three public methods, five themes, and two already
  maintained Stackline prerequisites
- adoption path: PASS - direct install and `cardinal@npm:@stackline/cardinal`
  require no source edits
- evidence path: PASS - hangs, chunks, themes, output, modules, types, package
  contents, CLI behavior, and downstream installs are automatable

## Decision

GO.

## Implementation Status

Version `1.0.1` is published from one immutable artifact to Verdaccio and the
official npm registry. The public GitHub repository, release-attested assets,
automated CI and CodeQL checks, documentation, catalog entry, and sitemap
discovery are live.

## Public Release

- npm: https://www.npmjs.com/package/@stackline/cardinal/v/1.0.1
- GitHub: https://github.com/alexandroit/stackline-cardinal
- immutable release: https://github.com/alexandroit/stackline-cardinal/releases/tag/stackline-v1.0.1
- documentation: https://alexandro.net/docs/vanilla/cardinal/
- catalog: https://alexandro.net/
- source commit and release tag target: `b9e8b71581b05e974f31735a1e32cb3798685e86`
- tarball SHA-1: `4c43143c3e854a5651c16c9a51b9c25d3352bacf`
- tarball SHA-256: `9baa184a2f6693da7a8bac855184450c78db31fc9f437646c550be7feb48f26e`
- tarball SHA-512: `12545788ddaf0d10c15484442125a71868bbc50c3ac67188d921d2d59cbc35114fed9d9008d29f43c665bc9c6ed09e81a5030f21d0e589dd9799b24cae947a6d`
- npm integrity: `sha512-ElRXiN2vDRDBVIREISWnGGi7xQw6xnGI2SHS1Zy8NRFP7Z2QCNKfQ8ZlvJxu0J6BpQMPIdDlid2XmbJMrpR6bQ==`
- packed size: 121,691 bytes; unpacked size: 540,809 bytes; 40 files
- CI: https://github.com/alexandroit/stackline-cardinal/actions/runs/33298278791
- CodeQL: https://github.com/alexandroit/stackline-cardinal/actions/runs/33298278672

## Local Verification

- 179 upstream assertions passed with current Tape.
- 23 targeted regression assertions passed.
- 700 differential executions matched the official `cardinal@2.1.1` oracle.
- Coverage: 98.78% lines, 94.54% branches, and 100% functions.
- TypeScript 3.9.10 and 7.0.2 compilation passed.
- CJS, ESM, browser global, CLI chunking, packed direct install, and historical
  package-name install passed.
- `publint` and AreTheTypesWrong reported no findings across root, Cardinal,
  settings, package metadata, and wildcard exports.
- Production dependency audit reported zero vulnerabilities.
- 307 dependency signatures and 26 attestations were verified.
- Desktop and mobile production-doc screenshots rendered the live bundle with
  no overlap or blank output.

## Chronological Log

- 2026-08-26: npm metadata, package contents, repository history, issues, pull
  requests, alternatives, dependencies, license, and advisories audited.
- 2026-08-26: the complete upstream suite passed 174 assertions and lint.
- 2026-08-26: production audit passed with zero findings; the baseline
  development tree reported five moderate and one high finding.
- 2026-08-26: empty line-number hang, library theme-string failure, and stdin
  chunk corruption reproduced against the unmodified upstream checkout.
- 2026-08-26: current Netlify, Contentful, Refine, tapjs, and American Express
  usage inspected to define the compatibility boundary.
- 2026-08-26: GO approved before implementation.
- 2026-08-26: empty-input and arbitrary-width line numbering, shared theme
  resolution, parser forwarding, and logical-line CLI buffering implemented.
- 2026-08-26: first-party CJS/ESM types, browser artifacts, explicit package
  exports, artifact allowlist, licensing inventory, and public documentation
  completed.
- 2026-08-26: all local release gates passed.
- 2026-08-27: one `1.0.0` tarball was published to Verdaccio and official npm;
  both registries report the same SHA-1 and integrity values.
- 2026-08-27: direct and `cardinal@npm:@stackline/cardinal` installs from both
  registries passed, including runtime smoke tests and a zero-finding production
  audit.
- 2026-08-27: GitHub `main`, release `stackline-v1.0.0`, checksums, CycloneDX
  SBOM, CI, CodeQL, private vulnerability reporting, and repository topics were
  verified.
- 2026-08-27: documentation and the eleven-package catalog were deployed to
  alexandro.net; all package routes returned HTTP 200 through Cloudflare and
  both aggregate sitemaps exposed exactly six Cardinal URLs.
- 2026-08-30: recursive dependency governance selected a leaf-first update.
  Version `1.0.1` preserves `ansicolors` and `redeyed` while resolving the
  latter exactly to `@stackline/redeyed@1.0.2`; that package resolves Esprima
  exactly to dependency-free `@stackline/esprima@1.0.0`. Release verification
  now rejects install warnings, invalid recursive npm trees, and any
  production or full-lockfile audit finding.
- 2026-08-30: the deterministic `1.0.1` artifact passed direct and historical
  alias installs from Verdaccio and public npm with identical bytes, zero
  warnings, and zero audit findings. CI and CodeQL passed; the GitHub release
  is immutable with the exact tarball, checksum, and CycloneDX SBOM. npm OIDC
  was rejected because this repository is not yet registered as a Trusted
  Publisher, so the accepted artifact was published with the configured
  administrator token. Production documentation and all three catalog locales
  expose version `1.0.1`.
- 2026-08-30: the release-local adoption lane opened a focused exact-alias
  migration at https://github.com/americanexpress/json-parse-context/pull/292.
  Node 18 clean install, the 19-test/15-snapshot suite, lint, lockfile lint,
  commitlint, runtime smoke, dependency-tree validation, and a zero-finding
  production audit passed. External-fork tests await repository approval and
  the contributor CLA is pending; no public response was sent to the bot.
- 2026-08-30: a different-repository maintainer decision was requested at
  https://github.com/refinedev/refine/issues/7589. It identifies both runtime
  call sites and asks whether Refine should remove its local `cardinal.d.ts`,
  retain the narrower shim, keep Cardinal 2.1.1, or choose another highlighter.
  The issue makes no vulnerability claim. The one-PR/one-different-issue
  adoption checkpoint is complete.
