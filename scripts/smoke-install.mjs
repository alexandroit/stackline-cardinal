import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = path.resolve(new URL('..', import.meta.url).pathname)
const temporary = await mkdtemp(path.join(os.tmpdir(), 'stackline-cardinal-'))

try {
  const packed = spawnSync('npm', ['pack', '--json', '--ignore-scripts'], { cwd: root, encoding: 'utf8' })
  assert.equal(packed.status, 0, packed.stderr)
  const result = JSON.parse(packed.stdout)[0]
  const tarball = path.join(root, result.filename)
  await writeFile(path.join(temporary, 'package.json'), JSON.stringify({
    private: true,
    dependencies: { '@stackline/cardinal': 'file:' + tarball, cardinal: 'file:' + tarball }
  }))
  const installed = spawnSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: temporary, encoding: 'utf8' })
  assert.equal(installed.status, 0, installed.stderr)
  assert.doesNotMatch(installed.stdout + installed.stderr, /npm warn|deprecated/i)

  const tree = spawnSync('npm', ['ls', '--all'], { cwd: temporary, encoding: 'utf8' })
  assert.equal(tree.status, 0, tree.stdout + tree.stderr)
  const audit = spawnSync('npm', ['audit', '--omit=dev', '--audit-level=low'], {
    cwd: temporary,
    encoding: 'utf8'
  })
  assert.equal(audit.status, 0, audit.stdout + audit.stderr)

  const commonjs = spawnSync(process.execPath, ['-e', [
    "const direct = require('@stackline/cardinal');",
    "const legacy = require('cardinal');",
    "const theme = require('@stackline/cardinal/themes/default');",
    "if (typeof theme !== 'object') process.exit(1);",
    "if (direct.highlight('var value = 1;') !== legacy.highlight('var value = 1;')) process.exit(1);"
  ].join('')], { cwd: temporary, encoding: 'utf8' })
  assert.equal(commonjs.status, 0, commonjs.stderr)

  const esm = spawnSync(process.execPath, ['--input-type=module', '-e', [
    "import cardinal, { highlight } from '@stackline/cardinal';",
    "if (highlight !== cardinal.highlight) process.exit(1);",
    "if (!highlight('const value = 1').includes('value')) process.exit(1);"
  ].join('')], { cwd: temporary, encoding: 'utf8' })
  assert.equal(esm.status, 0, esm.stderr)

  const manifest = JSON.parse(await readFile(path.join(temporary, 'node_modules', '@stackline', 'cardinal', 'package.json'), 'utf8'))
  assert.equal(manifest.name, '@stackline/cardinal')
  assert.deepEqual(Object.keys(manifest.dependencies).sort(), ['ansicolors', 'redeyed'])
  assert.equal(manifest.dependencies.ansicolors, 'npm:@stackline/ansicolors@1.0.1')
  assert.equal(manifest.dependencies.redeyed, 'npm:@stackline/redeyed@1.0.2')
  const redeyedManifest = JSON.parse(await readFile(path.join(
    temporary,
    'node_modules',
    'redeyed',
    'package.json'
  ), 'utf8'))
  assert.equal(redeyedManifest.dependencies.esprima, 'npm:@stackline/esprima@1.0.0')
  await rm(tarball, { force: true })
} finally {
  await rm(temporary, { force: true, recursive: true })
}

console.log('Packed direct and legacy-name install checks passed.')
