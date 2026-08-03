import { describe, it, expect } from 'vitest'
import { clampIndex, nextIndex, prevIndex, parseIndex, positionLabel } from './deck'

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
