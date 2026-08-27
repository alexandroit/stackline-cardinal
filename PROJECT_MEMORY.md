---
schema: stackline-project-memory-v1
package: cardinal
upstream: https://github.com/thlorenz/cardinal
stackline_package: "@stackline/cardinal"
state: IMPLEMENTING
registry_scope: verdaccio-and-public-npm
public_npm: false
public_github: false
docs_production: false
created: 2026-08-26
last_updated: 2026-08-26
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

Implementation and local release verification are complete. Publication is
pending the immutable artifact and remote CI gates.

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
- 2026-08-26: all local release gates passed; remote publication pending.
