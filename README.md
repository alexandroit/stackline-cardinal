# @stackline/cardinal

> Compatible JavaScript and JSON syntax highlighting for terminals, with
> reliable streams, named themes, ESM, browser bundles, and first-party types.

[![npm version](https://img.shields.io/npm/v/@stackline/cardinal.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/cardinal)
[![npm downloads](https://img.shields.io/npm/dm/@stackline/cardinal.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/cardinal)
[![CI](https://img.shields.io/github/actions/workflow/status/alexandroit/stackline-cardinal/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/alexandroit/stackline-cardinal/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@stackline/cardinal.svg?style=flat-square)](LICENSE)

**[Documentation and playground](https://alexandro.net/docs/vanilla/cardinal/)** |
**[npm](https://www.npmjs.com/package/@stackline/cardinal)** |
**[GitHub](https://github.com/alexandroit/stackline-cardinal)** |
**[Migration](MIGRATION.md)** |
**[Security](SECURITY.md)** |
**[Changelog](CHANGELOG.md)**

**Current package version:** `1.0.0`

This package is an independent, maintained continuation of
[`cardinal`](https://github.com/thlorenz/cardinal). It preserves the established
2.1.1 library and `cdl` behavior while fixing an empty-input hang, making theme
selection consistent, buffering piped input by logical line, and adding current
module and type contracts.

## Install

```bash
npm install @stackline/cardinal
```

Keep existing `require('cardinal')` or `import cardinal from 'cardinal'` calls:

```bash
npm install cardinal@npm:@stackline/cardinal
```

## Quick Start

```js
const cardinal = require('@stackline/cardinal')

console.log(cardinal.highlight('const answer = 42'))
```

Line numbers and a built-in theme can be selected together:

```js
const output = cardinal.highlight(source, {
  linenos: true,
  firstline: 20,
  theme: 'tomorrow-night',
  jsx: true
})
```

Theme objects remain fully compatible. Theme names, absolute paths, and paths
relative to the current working directory are also accepted in Node.js.

## API

### `highlight(code[, options])`

Returns ANSI-highlighted source. The default tokenizer and colors match
`cardinal@2.1.1`.

| Option | Default | Purpose |
| --- | --- | --- |
| `theme` | `default` | Theme object, built-in name, or Node.js theme path |
| `linenos` | `false` | Prefix output with line numbers |
| `firstline` | `1` | Number assigned to the first output line |
| `jsx` | `false` | Enable the historical JSX parser path |
| `parser` | Esprima 4 | Opt in to a compatible tokenizer or parser |
| `parserOptions` | `{}` | Pass settings to a custom parser |

### `highlightFileSync(fullPath[, options])`

Reads a UTF-8 file and returns its highlighted source.

### `highlightFile(fullPath[, options], callback)`

Reads asynchronously and calls `callback(error, highlighted)`. As in the
historical runtime, the function itself returns `undefined`.

## Current Syntax

Esprima remains the default so existing token labels and ANSI output do not
change silently. Applications that already use a newer parser can opt in:

```bash
npm install espree
```

```js
const espree = require('espree')
const cardinal = require('@stackline/cardinal')

const output = cardinal.highlight('class Box { #value = 1_000n }', {
  parser: espree,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
})
```

Parser-specific token labels remain parser-specific.

## Command Line

The package exposes the historical `cdl` command:

```bash
cdl source.js
cat source.js | cdl
```

`cdl source.js --nonum` disables line numbers configured in
`~/.cardinalrc`. Piped input is buffered by complete logical line, so stream
chunk boundaries never insert or duplicate source text.

Example `~/.cardinalrc`:

```json
{
  "theme": "hide-semicolons",
  "linenos": true
}
```

## Modules, Types, And Browser

- Callable CommonJS-compatible object API
- Native ESM default and named exports
- First-party TypeScript declarations tested from TypeScript 3.9 through 7.0
- Historical deep imports for `themes`, `settings`, and `lib`
- Self-contained browser CJS, ESM, and global bundles
- Node.js 12 and newer at runtime

File APIs intentionally throw a clear error in browsers. The browser build
supports built-in names and object themes; filesystem theme paths remain a
Node.js feature.

## Compatibility Evidence

The maintained suite includes all upstream assertions, 700 differential
executions against `cardinal@2.1.1`, empty-input and six-digit numbering edges,
named and path themes, adversarial stream chunking, modern parser adapters,
CLI, CJS/ESM, browser, types, packed installs, audits, and package-quality
checks.

Current downstream contracts were verified in Netlify Build, Contentful
Migration, Refine CLI, tapjs/treport, and American Express
`json-parse-context` before implementation.

## Security

Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).
The empty-input fix is a reliability correction; this project does not claim a
CVE or GHSA that has not been assigned.

## Provenance

The upstream history and preserved boundary are recorded in
[UPSTREAM_AUDIT.md](UPSTREAM_AUDIT.md),
[COMPATIBILITY_CONTRACT.md](COMPATIBILITY_CONTRACT.md), and [NOTICE](NOTICE).
Stackline is not affiliated with or endorsed by the upstream author.

## License

MIT. The original Cardinal copyright and permission notice remain in
[LICENSE](LICENSE). Runtime and bundled dependency notices are reproduced in
[THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
