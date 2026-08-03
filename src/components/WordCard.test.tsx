import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { WordCard } from './WordCard'

describe('WordCard', () => {
  const deToEn = {
    prompt: 'Abenteuer (das)',
    answer: 'adventure',
    promptLang: 'de',
    answerLang: 'en',
  }

  it('renders the prompt as the question', () => {
    const wrapper = mount(WordCard, { props: deToEn })
    expect(wrapper.find('h1').text()).toBe('Abenteuer (das)')
    expect(wrapper.find('h1').attributes('lang')).toBe('de')
  })

  it('renders the answer behind the reveal animation', () => {
    const wrapper = mount(WordCard, { props: deToEn })
    const answer = wrapper.find('h2')
    expect(answer.text()).toBe('adventure')
    expect(answer.attributes('lang')).toBe('en')
    expect(answer.classes()).toContain('reveal-meaning')
  })

  it('includes the sweeping reveal bar', () => {
    const wrapper = mount(WordCard, { props: deToEn })
    expect(wrapper.find('.reveal-sweep').exists()).toBe(true)
  })

  it('renders the reversed direction', () => {
    const wrapper = mount(WordCard, {
      props: { prompt: 'adventure', answer: 'Abenteuer (das)', promptLang: 'en', answerLang: 'de' },
    })
    expect(wrapper.find('h1').text()).toBe('adventure')
    expect(wrapper.find('h1').attributes('lang')).toBe('en')
    expect(wrapper.find('h2').text()).toBe('Abenteuer (das)')
    expect(wrapper.find('h2').attributes('lang')).toBe('de')
  })
})
