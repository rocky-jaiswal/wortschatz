import { defineStore } from 'pinia'
import type { QuizMode } from '../domain/deck'

/**
 * Holds where you are in the deck and how it is configured, nothing more. All
 * deck logic lives in `src/domain/deck.ts`; this store only records the result
 * so it can be persisted to localStorage by the plugin in `src/main.ts`.
 */
export const useDeckStore = defineStore('deck', {
  state: () => ({
    /** Position in the current order — not a word index. */
    position: 0,
    /** -1 when we last moved backwards, 1 forwards — drives the slide transition. */
    slide: 1,
    shuffled: false,
    /** Seeds the shuffle, so the shuffled order survives a reload. */
    seed: 1,
    quizMode: 'deToEn' as QuizMode,
  }),
  actions: {
    moveTo(position: number, slide: number) {
      this.position = position
      this.slide = slide
    },
    setShuffle(shuffled: boolean, seed: number, position: number) {
      this.shuffled = shuffled
      this.seed = seed
      this.position = position
    },
    setQuizMode(mode: QuizMode) {
      this.quizMode = mode
    },
  },
})
