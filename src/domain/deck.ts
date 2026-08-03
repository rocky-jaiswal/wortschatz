import type { Word } from '../types/word'

/**
 * Pure deck logic. No Vue, no storage, no side effects — every function here is
 * total and independently testable.
 *
 * The deck is addressed by *position*, not by word index. An order (a
 * permutation of word indices) sits in between, so shuffling changes which word
 * a position points at without touching the navigation maths.
 */

export type QuizMode = 'deToEn' | 'enToDe'

/** Clamps a position into `[0, total - 1]`. An empty deck always yields 0. */
export const clampIndex = (index: number, total: number): number =>
  Math.min(Math.max(index, 0), Math.max(total - 1, 0))

/** Next position, wrapping around to the start past the end of the deck. */
export const nextIndex = (index: number, total: number): number =>
  total === 0 ? 0 : (clampIndex(index, total) + 1) % total

/** Previous position, wrapping around to the end past the start of the deck. */
export const prevIndex = (index: number, total: number): number =>
  total === 0 ? 0 : (clampIndex(index, total) + total - 1) % total

/**
 * Reads a position typed into the jump box. Anything unparseable — empty string,
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

/**
 * mulberry32 — a small, fast PRNG. Seeded so a shuffled deck keeps the same
 * order across reloads; re-seeding is what reshuffles it.
 */
const randomFrom = (seed: number) => {
  let state = seed | 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** The deck in its natural (alphabetical) order: position === word index. */
export const identityOrder = (total: number): number[] =>
  Array.from({ length: total }, (_, i) => i)

/**
 * A deterministic shuffle of `[0, total)` — Fisher-Yates driven by `seed`.
 * The same seed always yields the same order.
 */
export const shuffleOrder = (total: number, seed: number): number[] => {
  const order = identityOrder(total)
  const random = randomFrom(seed)
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

/** The order for the deck as configured. */
export const orderFor = (total: number, shuffled: boolean, seed: number): number[] =>
  shuffled ? shuffleOrder(total, seed) : identityOrder(total)

/**
 * Where a given word sits in an order. Used to stay on the current word when
 * the order changes underneath you. Falls back to the start if it isn't there.
 */
export const positionOf = (order: number[], wordIndex: number): number => {
  const position = order.indexOf(wordIndex)
  return position === -1 ? 0 : position
}

/** The side of the card you have to guess from. */
export const promptOf = (word: Word, mode: QuizMode): string =>
  mode === 'deToEn' ? word.germanWord : word.englishWord

/** The side revealed after the guessing window. */
export const answerOf = (word: Word, mode: QuizMode): string =>
  mode === 'deToEn' ? word.englishWord : word.germanWord

/** The language of the prompt, for `lang` attributes and speech. */
export const promptLang = (mode: QuizMode): 'de' | 'en' => (mode === 'deToEn' ? 'de' : 'en')

/** The language of the answer. */
export const answerLang = (mode: QuizMode): 'de' | 'en' => (mode === 'deToEn' ? 'en' : 'de')

/** Flips the quiz direction. */
export const flipMode = (mode: QuizMode): QuizMode => (mode === 'deToEn' ? 'enToDe' : 'deToEn')
