# Migration

## Direct Scoped Import

```bash
npm remove cardinal
npm install @stackline/cardinal
```

```js
const cardinal = require('@stackline/cardinal')
```

## No Source Changes

Use npm's alias syntax to keep the historical package name:

```bash
npm install cardinal@npm:@stackline/cardinal
```

Existing code remains unchanged:

```js
const cardinal = require('cardinal')
```

The same alias works with TypeScript and ESM imports.

## Behavioral Notes

- Default highlighting and object themes preserve Cardinal 2.1.1 output.
- Empty input with `linenos: true` now returns an empty string instead of
  looping indefinitely.
- Piped CLI input is grouped by newline rather than operating on transport
  chunks. This prevents source corruption and duplicate trailing lines.
- Theme strings now work in the library. Existing theme objects are unchanged.
- Modern parser support is opt-in; Esprima remains the default.
- Runtime support starts at Node.js 12.
