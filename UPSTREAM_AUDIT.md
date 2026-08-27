# Upstream Audit

## Snapshot

- repository: https://github.com/thlorenz/cardinal
- npm release: `cardinal@2.1.1`, published 2018-05-22
- license: MIT
- public repository: unarchived
- latest upstream repository activity observed: 2020-07-17
- complete-week downloads: 5,956,826 for 2026-08-19 through 2026-08-25

## Source Review

The repository history, package artifact, issues, pull requests, tests, CLI,
settings, themes, alternatives, dependencies, and current downstream source
were reviewed before implementation. Open issue #13 corroborates library theme
inconsistency; issue #22 requests typed and newer-syntax support. Open marker
and configuration pull requests are incomplete and were not copied wholesale.

## Reproductions

- Empty input with `linenos: true` exceeded a two-second process timeout.
- `theme: 'default'`, another built-in name, and an absolute theme path threw in
  the library despite the corresponding CLI model.
- A source line written to `cdl` in two chunks was printed as two lines.
- The upstream npm artifact carried broad repository content.

## Downstream Evidence

Current source was inspected in Netlify Build, Contentful Migration, Refine
CLI, tapjs/treport, and American Express `json-parse-context`. Their use covers
namespace/default imports, destructuring, string and file highlighting, JSX,
line numbers, and theme objects.

## Alternatives

`highlight.js` and `cli-highlight` are capable broader highlighters, but neither
is a drop-in replacement for Cardinal's compact API, exact ANSI output, themes,
file methods, `cdl`, and source-retaining redeyed semantics.

## Decision

GO. Active adoption, reproducible defects, a small maintainable surface, and a
strong differential oracle justify a transparent compatible continuation.
