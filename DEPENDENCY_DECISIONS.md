# Dependency Decisions

## Runtime

The historical dependency keys remain intact for compatibility:

| Key | Resolution | Purpose |
| --- | --- | --- |
| `ansicolors` | `npm:@stackline/ansicolors@1.0.1` | Exact ANSI wrappers used by themes |
| `redeyed` | `npm:@stackline/redeyed@1.0.1` | Source-retaining token transforms |

Both Stackline packages independently preserve their upstream API, license,
and attribution. Exact versions make the release artifact reproducible. The
default parser remains Esprima 4 through redeyed.

## Development

Development tools are current and are not shipped as runtime dependencies.
The official `cardinal@2.1.1` package is installed under the private baseline
key solely as a differential oracle. Espree is used only to prove the opt-in
modern parser adapter.

No configuration loader, color framework, stream utility, or TypeScript runtime
was added to production.
