/**
 * Pure index arithmetic for the word deck. No Vue, no storage, no side effects —
 * every function here is total and independently testable.
 */

/** Clamps an index into `[0, total - 1]`. An empty deck always yields 0. */
export const clampIndex = (index: number, total: number): number =>
  Math.min(Math.max(index, 0), Math.max(total - 1, 0))

/** Next index, wrapping around to the start past the end of the deck. */
export const nextIndex = (index: number, total: number): number =>
  total === 0 ? 0 : (clampIndex(index, total) + 1) % total

/** Previous index, wrapping around to the end past the start of the deck. */
export const prevIndex = (index: number, total: number): number =>
  total === 0 ? 0 : (clampIndex(index, total) + total - 1) % total

/**
 * Reads an index typed into the jump box. Anything unparseable — empty string,
 * letters, a float, out of range — falls back to `fallback`.
 */
export const parseIndex = (raw: string, total: number, fallback: number): number => {
  const parsed = Number(raw)
  const isUsable = raw.trim() !== '' && Number.isInteger(parsed) && parsed >= 0 && parsed < total
  return isUsable ? parsed : fallback
}

/** Human-facing position, e.g. `"41 / 2992"`. */
export const positionLabel = (index: number, total: number): string =>
  `${clampIndex(index, total)} / ${Math.max(total - 1, 0)}`
