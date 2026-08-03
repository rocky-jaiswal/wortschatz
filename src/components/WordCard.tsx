import { defineComponent, type PropType } from 'vue'
import type { Word } from '../types/word'
import { RevealBar } from './RevealBar'

export const WordCard = defineComponent({
  name: 'WordCard',
  props: {
    word: { type: Object as PropType<Word>, required: true },
  },
  setup(props) {
    return () => (
      <article class="flex flex-col h-full">
        {/* German word — the prompt */}
        <div class="flex-1 flex items-center justify-center bg-panel text-panel-fg px-6 py-10">
          <h1 class="font-display text-3xl sm:text-4xl text-center leading-tight break-words">
            {props.word.germanWord}
          </h1>
        </div>

        <RevealBar />

        {/* English meaning — revealed after the guessing window */}
        <div class="flex-1 flex items-center justify-center bg-card-bg px-6 py-10">
          <h2 class="reveal-meaning font-display text-2xl sm:text-3xl text-center leading-tight break-words text-fg">
            {props.word.englishWord}
          </h2>
        </div>
      </article>
    )
  },
})
