import type { HighlightOptions, Theme } from './index.mjs'

export function resolveTheme(home?: string): Theme | undefined
export function getSettings(home?: string): HighlightOptions | undefined

declare const settings: {
  resolveTheme: typeof resolveTheme
  getSettings: typeof getSettings
}
export default settings
