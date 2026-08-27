export type ColorTransform = (value: string) => string
export interface ThemeToken { [value: string]: ColorTransform | undefined }
export interface Theme { [token: string]: ThemeToken | ColorTransform | undefined }
export interface ParserOptions { [option: string]: unknown }
export interface Parser {
  tokenize?: (...args: any[]) => any
  parse?: (...args: any[]) => any
  parseScript?: (...args: any[]) => any
}
export interface HighlightOptions {
  theme?: Theme | string
  linenos?: boolean
  firstline?: number
  jsx?: boolean
  json?: boolean
  parser?: Parser
  parserOptions?: ParserOptions
}
export type HighlightCallback = (error: Error | null, highlighted?: string) => void
export function highlight(code: string, options?: HighlightOptions): string
export function highlightFile(fullPath: string, callback: HighlightCallback): void
export function highlightFile(fullPath: string, options: HighlightOptions, callback: HighlightCallback): void
export function highlightFileSync(fullPath: string, options?: HighlightOptions): string
declare const cardinal: {
  highlight: typeof highlight
  highlightFile: typeof highlightFile
  highlightFileSync: typeof highlightFileSync
}
export default cardinal
