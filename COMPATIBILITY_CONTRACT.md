# Compatibility Contract

## Preserved Surface

- `highlight(code[, options])`
- `highlightFile(fullPath[, options], callback)`
- `highlightFileSync(fullPath[, options])`
- CommonJS object exports and `cdl`
- `theme`, `linenos`, `firstline`, `jsx`, and obsolete `json` acceptance
- all five built-in themes and custom theme objects
- `.cardinalrc`, file highlighting, pipe fallback, and established error prefix
- deep imports for `cardinal`, `settings`, `themes/*`, and `lib/*`

## Preserved Defaults

Esprima tokenization, default theme selection, ANSI sequences, object-theme
resolution, JSON detection, line numbering from one, and file encoding remain
unchanged. Differential tests compare successful output and thrown errors with
the official `cardinal@2.1.1` package.

## Compatible Extensions

- built-in theme names and filesystem paths in the library API
- arbitrary-width line-number formatting
- parser and parser-option forwarding
- native ESM, browser conditions, and first-party TypeScript declarations

## Intentional Corrections

- empty line-number input terminates
- stdin chunk boundaries no longer change source lines
- one trailing input newline no longer creates an extra output line
- browser file calls fail explicitly because browsers cannot read Node paths

Changes to default token labels, ANSI output, callback timing, theme structure,
or CLI commands require a major-version review.
