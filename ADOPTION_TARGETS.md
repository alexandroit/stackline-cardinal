# Adoption Targets

Public source review identified these active compatibility contracts:

| Project | Observed use |
| --- | --- |
| Netlify Build | Cardinal is dev-only and used by an intentionally obfuscated esbuild migration fixture; not a genuine runtime adoption target |
| Contentful Migration | Namespace import, `highlight`, and line numbers; qualified but contribution policy requires issue-first discussion |
| Refine CLI | Default import, JSX and plain highlighting plus a local ambient declaration; maintainer decision issue [#7589](https://github.com/refinedev/refine/issues/7589) opened 2026-08-30 |
| tapjs/treport | Destructured `highlightFileSync` and a custom theme; current activity and CI evidence are too weak for this cycle |
| American Express json-parse-context | CommonJS `highlight` for error context; exact-alias migration PR [#292](https://github.com/americanexpress/json-parse-context/pull/292) opened 2026-08-30 |

The lowest-change adoption command is:

```bash
npm install --save-exact cardinal@npm:@stackline/cardinal@1.0.1
```

The 1.0.1 release-local adoption checkpoint is complete: one tested migration
pull request and one different-repository maintainer-decision issue. Incoming
messages remain read-only unless the account owner explicitly authorizes a
response.
