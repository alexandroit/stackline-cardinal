import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdir } from 'node:fs/promises'
import { build } from 'esbuild'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outdir = path.join(root, 'dist')
const browserResolver = path.join(root, 'lib', 'resolve-theme-browser.js')
const redeyedSource = path.join(root, 'node_modules', 'redeyed', 'redeyed.js')

await mkdir(outdir, { recursive: true })

const replaceThemeResolver = {
  name: 'cardinal-browser-theme-resolver',
  setup(builder) {
    builder.onResolve({ filter: /^\.\/resolve-theme$/ }, (args) => {
      if (path.basename(args.importer) === 'highlight.js') return { path: browserResolver }
      return null
    })
    builder.onResolve({ filter: /^redeyed$/ }, () => ({ path: redeyedSource }))
  }
}

const shared = {
  bundle: true,
  entryPoints: [path.join(root, 'browser.mjs')],
  legalComments: 'external',
  minify: true,
  platform: 'browser',
  plugins: [replaceThemeResolver],
  target: ['es2018']
}

await Promise.all([
  build({ ...shared, format: 'cjs', outfile: path.join(outdir, 'cardinal.browser.cjs') }),
  build({ ...shared, format: 'esm', outfile: path.join(outdir, 'cardinal.browser.mjs') }),
  build({ ...shared, format: 'iife', globalName: 'Cardinal', outfile: path.join(outdir, 'cardinal.global.js') })
])

console.log('Built self-contained Cardinal browser artifacts.')
