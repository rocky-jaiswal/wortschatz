import { describe, it, expect } from 'vitest'
import {
  answerOf,
  clampIndex,
  flipMode,
  identityOrder,
  indexAt,
  nextIndex,
  orderFor,
  parseIndex,
  positionLabel,
  positionOf,
  prevIndex,
  promptOf,
  shuffleOrder,
} from './deck'

const TOTAL = 5

describe('clampIndex', () => {
  it('leaves an in-range index alone', () => {
    expect(clampIndex(3, TOTAL)).toBe(3)
  })

  it('pulls out-of-range indices back to the edges', () => {
    expect(clampIndex(-7, TOTAL)).toBe(0)
    expect(clampIndex(99, TOTAL)).toBe(TOTAL - 1)
  })

  it('yields 0 for an empty deck', () => {
    expect(clampIndex(4, 0)).toBe(0)
  })
})

describe('nextIndex', () => {
  it('advances by one', () => {
    expect(nextIndex(0, TOTAL)).toBe(1)
  })

  it('wraps from the last word back to the first', () => {
    expect(nextIndex(TOTAL - 1, TOTAL)).toBe(0)
  })

  it('clamps a stale index before advancing', () => {
    expect(nextIndex(99, TOTAL)).toBe(0)
  })

  it('stays at 0 for an empty deck', () => {
    expect(nextIndex(0, 0)).toBe(0)
  })
})

describe('prevIndex', () => {
  it('steps back by one', () => {
    expect(prevIndex(3, TOTAL)).toBe(2)
  })

  it('wraps from the first word to the last', () => {
    expect(prevIndex(0, TOTAL)).toBe(TOTAL - 1)
  })

  it('stays at 0 for an empty deck', () => {
    expect(prevIndex(0, 0)).toBe(0)
  })
})

describe('parseIndex', () => {
  it('accepts a valid index', () => {
    expect(parseIndex('3', TOTAL, 0)).toBe(3)
  })

  it('accepts the first and last positions', () => {
    expect(parseIndex('0', TOTAL, 2)).toBe(0)
    expect(parseIndex('4', TOTAL, 2)).toBe(4)
  })

  it('falls back on anything unusable', () => {
    expect(parseIndex('', TOTAL, 2)).toBe(2)
    expect(parseIndex('   ', TOTAL, 2)).toBe(2)
    expect(parseIndex('abc', TOTAL, 2)).toBe(2)
    expect(parseIndex('1.5', TOTAL, 2)).toBe(2)
    expect(parseIndex('-1', TOTAL, 2)).toBe(2)
    expect(parseIndex('5', TOTAL, 2)).toBe(2)
    expect(parseIndex('Infinity', TOTAL, 2)).toBe(2)
  })
})

describe('positionLabel', () => {
  it('reads as position over last index', () => {
    expect(positionLabel(0, TOTAL)).toBe('0 / 4')
  })

  it('clamps a stale index', () => {
    expect(positionLabel(99, TOTAL)).toBe('4 / 4')
  })
})

describe('identityOrder', () => {
  it('maps each position to the same word index', () => {
    expect(identityOrder(4)).toEqual([0, 1, 2, 3])
  })

  it('handles an empty deck', () => {
    expect(identityOrder(0)).toEqual([])
  })
})

describe('shuffleOrder', () => {
  it('is a permutation — every word appears exactly once', () => {
    const order = shuffleOrder(500, 12345)
    expect(order).toHaveLength(500)
    expect([...order].sort((a, b) => a - b)).toEqual(identityOrder(500))
  })

  it('is deterministic for a given seed', () => {
    expect(shuffleOrder(200, 42)).toEqual(shuffleOrder(200, 42))
  })

  it('gives a different order for a different seed', () => {
    expect(shuffleOrder(200, 42)).not.toEqual(shuffleOrder(200, 43))
  })

  it('actually reorders rather than returning the deck untouched', () => {
    expect(shuffleOrder(200, 7)).not.toEqual(identityOrder(200))
  })

  it('handles empty and single-word decks', () => {
    expect(shuffleOrder(0, 1)).toEqual([])
    expect(shuffleOrder(1, 1)).toEqual([0])
  })
})

describe('orderFor', () => {
  it('is alphabetical when not shuffled', () => {
    expect(orderFor(TOTAL, false, 99)).toEqual(identityOrder(TOTAL))
  })

  it('is shuffled when asked', () => {
    expect(orderFor(200, true, 99)).toEqual(shuffleOrder(200, 99))
  })
})

describe('positionOf', () => {
  it('finds where a word sits in an order', () => {
    expect(positionOf([3, 1, 0, 2], 0)).toBe(2)
  })

  it('falls back to the start when the word is missing', () => {
    expect(positionOf([3, 1, 0, 2], 99)).toBe(0)
  })

  it('round-trips a word through a reshuffle', () => {
    const order = shuffleOrder(500, 2024)
    expect(positionOf(order, indexAt(order, 137))).toBe(137)
  })
})

describe('indexAt', () => {
  it('reads through the order', () => {
    expect(indexAt([3, 1, 0, 2], 1)).toBe(1)
    expect(indexAt([3, 1, 0, 2], 0)).toBe(3)
  })

  it('clamps a position past the end', () => {
    expect(indexAt([3, 1, 0, 2], 99)).toBe(2)
  })

  it('yields 0 for an empty order', () => {
    expect(indexAt([], 5)).toBe(0)
  })
})

describe('quiz direction', () => {
  const word = { germanWord: 'Abenteuer (das)', englishWord: 'adventure' }

  it('asks German and answers English by default', () => {
    expect(promptOf(word, 'deToEn')).toBe('Abenteuer (das)')
    expect(answerOf(word, 'deToEn')).toBe('adventure')
  })

  it('swaps both sides when reversed', () => {
    expect(promptOf(word, 'enToDe')).toBe('adventure')
    expect(answerOf(word, 'enToDe')).toBe('Abenteuer (das)')
  })

  it('flips back and forth', () => {
    expect(flipMode('deToEn')).toBe('enToDe')
    expect(flipMode(flipMode('deToEn'))).toBe('deToEn')
  })
})
