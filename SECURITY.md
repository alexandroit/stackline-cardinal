# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| 1.x | Yes |
| Upstream 2.x | Maintained by its upstream owner |

## Reporting A Vulnerability

Use GitHub private vulnerability reporting for this repository. If that
channel is unavailable, contact the security address on the Stackline
organization profile.

Include the affected version, runtime, input, a minimal reproduction, impact,
and known workarounds. Do not open a public issue before a coordinated fix is
available. A complete report will be acknowledged within five business days.

## Scope Note

Version 1.0.0 fixes an infinite loop triggered by empty highlighted input with
line numbers. This is treated as a reliability and availability hardening fix.
No CVE or GHSA is claimed unless one is assigned by an appropriate authority.

## Dependency Chain

Version 1.0.1 preserves the historical dependency keys with exact aliases to
`@stackline/ansicolors@1.0.1` and `@stackline/redeyed@1.0.2`. Redeyed preserves
its own parser key through `@stackline/esprima@1.0.0`, whose runtime graph has
no further dependencies. Release gates require a warning-free packed install,
a valid recursive npm tree, and zero production and full-lockfile audit
findings.
