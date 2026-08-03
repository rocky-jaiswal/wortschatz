import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { WordCard } from './WordCard'

describe('WordCard', () => {
  const word = { germanWord: 'Abenteuer (das)', englishWord: 'adventure' }

  it('renders the German word as the prompt', () => {
    const wrapper = mount(WordCard, { props: { word } })
    expect(wrapper.find('h1').text()).toBe('Abenteuer (das)')
  })

  it('renders the meaning behind the reveal animation', () => {
    const wrapper = mount(WordCard, { props: { word } })
    const meaning = wrapper.find('h2')
    expect(meaning.text()).toBe('adventure')
    expect(meaning.classes()).toContain('reveal-meaning')
  })

  it('includes the sweeping reveal bar', () => {
    const wrapper = mount(WordCard, { props: { word } })
    expect(wrapper.find('.reveal-sweep').exists()).toBe(true)
  })
})
