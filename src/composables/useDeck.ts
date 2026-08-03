import { computed } from 'vue'
import wordsData from '../data/words.json'
import type { Word } from '../types/word'
import { useDeckStore } from '../stores/deck'
import { clampIndex, nextIndex, prevIndex, parseIndex, positionLabel } from '../domain/deck'

const words = wordsData as Word[]

/**
 * Composes the pure deck functions over the persisted store state. Every index
 * that reaches the store has already been through `src/domain/deck.ts`, so a
 * stale index restored from localStorage can never point past the deck.
 */
export function useDeck() {
  const store = useDeckStore()
  const total = words.length

  const currentIndex = computed(() => clampIndex(store.currentIndex, total))
  const currentWord = computed<Word>(() => words[currentIndex.value])
  const position = computed(() => positionLabel(currentIndex.value, total))
  const direction = computed(() => store.direction)

  const goNext = () => store.moveTo(nextIndex(currentIndex.value, total), 1)
  const goPrev = () => store.moveTo(prevIndex(currentIndex.value, total), -1)

  const goToIndex = (index: number) =>
    store.moveTo(clampIndex(index, total), index < currentIndex.value ? -1 : 1)

  const goToTyped = (raw: string) => goToIndex(parseIndex(raw, total, currentIndex.value))

  return { words, total, currentIndex, currentWord, position, direction, goNext, goPrev, goToIndex, goToTyped }
}
