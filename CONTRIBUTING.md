# Contributing

Thank you for helping maintain `@stackline/cardinal`.

## Development

Use a current Node.js LTS release:

```bash
npm ci
npm run verify
```

## Compatibility Rules

- Add a regression before changing ANSI output, line numbering, themes, files,
  callbacks, stream handling, or error behavior.
- Keep Esprima and the default theme unchanged outside a future major release.
- Keep parser adapters opt-in and treat parser token labels as parser-owned.
- Preserve the original license, notices, and independent-fork disclosure.
- Do not add a runtime dependency without documenting the necessity.

Update `CHANGELOG.md` for user-visible changes and keep pull requests focused.
