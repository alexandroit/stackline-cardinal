import cardinal = require('../../index')

const options: cardinal.HighlightOptions = {
  jsx: true,
  linenos: true,
  firstline: 12,
  theme: 'tomorrow-night'
}
const highlighted: string = cardinal.highlight('const value = true', options)
const returned: void = cardinal.highlightFile('example.js', (error, output) => {
  const possibleError: Error | null = error
  const possibleOutput: string | undefined = output
  void possibleError
  void possibleOutput
})

void highlighted
void returned
