# Adoption Targets

Public source review identified these active compatibility contracts:

| Project | Observed use |
| --- | --- |
| Netlify Build | Exact Cardinal dependency in zip-it-and-ship-it fixtures |
| Contentful Migration | Namespace import, `highlight`, and line numbers |
| Refine CLI | Default import, JSX, and plain highlighting |
| tapjs/treport | Destructured `highlightFileSync` and a custom theme |
| American Express json-parse-context | CommonJS `highlight` for error context |

The lowest-change adoption command is:

```bash
npm install cardinal@npm:@stackline/cardinal
```

No outreach or automated pull request is implied by this inventory.
