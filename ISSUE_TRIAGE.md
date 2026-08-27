# Issue Triage

## Addressed

- Issue #13: string theme selection is now consistent between library and CLI.
- Issue #22: first-party TypeScript declarations and opt-in newer parsers are
  available without changing the default tokenizer.
- Issue #29 and PR #31: replacement documentation uses valid maintained links.

## Deferred

- Issue #23 and PR #24 markers: the proposed surface is incomplete and changes
  theme and CLI behavior. It needs a separate compatibility design.
- PR #25 configuration loader changes: adding runtime configuration machinery
  is unnecessary for the verified defects and could alter `.cardinalrc` rules.

Deferred upstream work is not represented as completed.
