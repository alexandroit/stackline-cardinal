import cardinal, { highlight, highlightFileSync, type HighlightOptions } from '../../index.mjs'

const options: HighlightOptions = { theme: 'default', linenos: true }
const output: string = highlight('const value = 1', options)
const fileOutput: string = highlightFileSync('example.js')
const same: typeof highlight = cardinal.highlight

void output
void fileOutput
void same
