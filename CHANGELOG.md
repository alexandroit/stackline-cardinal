# Changelog

All notable changes to `@stackline/cardinal` are documented here.

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
