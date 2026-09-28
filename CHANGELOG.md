# Changelog

## [1.0.2] - 2026-09-28

- Organize package documentation, preserve API and migration examples, and add Stackline community links.
- Improve package discovery keywords with precise domain terms and `stackline`.
- Pin GitHub Actions release tooling and require an explicit missing-version response before publication.


All notable changes to `@stackline/cardinal` are documented here.

## 1.0.1 - 2026-08-30

### Changed

- Preserve the historical `redeyed` dependency key while resolving it exactly
  to maintained `@stackline/redeyed@1.0.2`.
- Close the parser chain through maintained `@stackline/esprima@1.0.0`, which
  has no runtime dependencies.
- Require warning-free packed installs, valid dependency trees, and zero
  production and full-lockfile audit findings.
- Correct the npm publication workflow to address the local tarball path
  explicitly.

## 1.0.0 - 2026-08-26

### Added

- Native ESM entry with default and named exports.
- First-party declarations tested with TypeScript 3.9 and current TypeScript.
- Self-contained browser CJS, ESM, and global bundles.
- Named and filesystem-path themes in the library API, matching the CLI model.
- Opt-in `parser` and `parserOptions` forwarding to maintained redeyed.
- CI, CodeQL, package checks, packed-install smoke tests, and public docs.

### Fixed

- Terminate line-number processing for empty or trailing-empty input.
- Render arbitrary-width line numbers instead of failing after 99,999.
- Buffer piped CLI data by logical lines instead of arbitrary stream chunks.
- Emit exactly one line for one newline-terminated piped source line.
- Correct the async TypeScript return type to `void`.

### Changed

- Preserve dependency keys `ansicolors` and `redeyed` while resolving them to
  maintained `@stackline/ansicolors` and `@stackline/redeyed` packages.
- Restrict the npm artifact to runtime files, types, bundles, and legal docs.
