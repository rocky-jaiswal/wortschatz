import { computed } from 'vue'
import wordsData from '../data/words.json'
import type { Word } from '../types/word'
import { useDeckStore } from '../stores/deck'
import {
  answerLang,
  answerOf,
  clampIndex,
  flipMode,
  indexAt,
  nextIndex,
  orderFor,
  parseIndex,
  positionLabel,
  positionOf,
  prevIndex,
  promptLang,
  promptOf,
} from '../domain/deck'

const words = wordsData as Word[]

/** Shown only if the bundled word list is empty — blanks rather than a crash. */
const NO_WORD: Word = { germanWord: '', englishWord: '' }

/**
 * Composes the pure deck functions over the persisted store state. Every
 * position that reaches the store has already been through
 * `src/domain/deck.ts`, so a stale position restored from localStorage can
 * never point past the deck.
 */
export function useDeck() {
  const store = useDeckStore()
  const total = words.length

  const order = computed(() => orderFor(total, store.shuffled, store.seed))
  const position = computed(() => clampIndex(store.position, total))
  const currentWord = computed<Word>(() => words[indexAt(order.value, position.value)] ?? NO_WORD)

  const quizMode = computed(() => store.quizMode)
  const prompt = computed(() => promptOf(currentWord.value, quizMode.value))
  const answer = computed(() => answerOf(currentWord.value, quizMode.value))
  const promptLanguage = computed(() => promptLang(quizMode.value))
  const answerLanguage = computed(() => answerLang(quizMode.value))

  const label = computed(() => positionLabel(position.value, total))
  const slide = computed(() => store.slide)
  const shuffled = computed(() => store.shuffled)

  const goNext = () => store.moveTo(nextIndex(position.value, total), 1)
  const goPrev = () => store.moveTo(prevIndex(position.value, total), -1)

  const goToPosition = (next: number) =>
    store.moveTo(clampIndex(next, total), next < position.value ? -1 : 1)

  const goToTyped = (raw: string) => goToPosition(parseIndex(raw, total, position.value))

  /** Toggles shuffle, staying on the word you are currently looking at. */
  const toggleShuffle = () => {
    const wordIndex = indexAt(order.value, position.value)
    const nextShuffled = !store.shuffled
    const nextSeed = nextShuffled ? Date.now() % 0x7fffffff : store.seed
    store.setShuffle(nextShuffled, nextSeed, positionOf(orderFor(total, nextShuffled, nextSeed), wordIndex))
  }

  const toggleQuizMode = () => store.setQuizMode(flipMode(store.quizMode))

  return {
    words,
    total,
    position,
    currentWord,
    prompt,
    answer,
    promptLanguage,
    answerLanguage,
    quizMode,
    label,
    slide,
    shuffled,
    goNext,
    goPrev,
    goToPosition,
    goToTyped,
    toggleShuffle,
    toggleQuizMode,
  }
}
