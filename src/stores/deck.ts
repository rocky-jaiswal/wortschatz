import { defineStore } from 'pinia'

/**
 * Holds where you are in the deck, nothing more. All index arithmetic lives in
 * `src/domain/deck.ts`; this store only records the result so it can be
 * persisted to localStorage by the plugin in `src/main.ts`.
 */
export const useDeckStore = defineStore('deck', {
  state: () => ({
    currentIndex: 0,
    /** -1 when we last moved backwards, 1 forwards — drives the slide transition. */
    direction: 1,
  }),
  actions: {
    moveTo(index: number, direction: number) {
      this.currentIndex = index
      this.direction = direction
    },
  },
})
