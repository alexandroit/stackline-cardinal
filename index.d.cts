declare namespace cardinal {
  type ColorTransform = (value: string) => string
  interface ThemeToken { [value: string]: ColorTransform | undefined }
  interface Theme { [token: string]: ThemeToken | ColorTransform | undefined }
  interface ParserOptions { [option: string]: unknown }
  interface Parser {
    tokenize?: (...args: any[]) => any
    parse?: (...args: any[]) => any
    parseScript?: (...args: any[]) => any
  }
  interface HighlightOptions {
    theme?: Theme | string
    linenos?: boolean
    firstline?: number
    jsx?: boolean
    json?: boolean
    parser?: Parser
    parserOptions?: ParserOptions
  }
  type HighlightCallback = (error: Error | null, highlighted?: string) => void
  function highlight(code: string, options?: HighlightOptions): string
  function highlightFile(fullPath: string, callback: HighlightCallback): void
  function highlightFile(fullPath: string, options: HighlightOptions, callback: HighlightCallback): void
  function highlightFileSync(fullPath: string, options?: HighlightOptions): string
}

export = cardinal
