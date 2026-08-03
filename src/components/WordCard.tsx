import { defineComponent } from 'vue'
import { RevealBar } from './RevealBar'

export const WordCard = defineComponent({
  name: 'WordCard',
  props: {
    prompt: { type: String, required: true },
    answer: { type: String, required: true },
    promptLang: { type: String, required: true },
    answerLang: { type: String, required: true },
  },
  setup(props) {
    return () => (
      <article class="flex flex-col h-full">
        {/* The side you guess from */}
        <div class="flex-1 flex items-center justify-center bg-panel text-panel-fg px-6 py-10">
          <h1
            lang={props.promptLang}
            class="font-display text-3xl sm:text-4xl text-center leading-tight break-words"
          >
            {props.prompt}
          </h1>
        </div>

        <RevealBar />

        {/* Revealed after the guessing window */}
        <div class="flex-1 flex items-center justify-center bg-card-bg px-6 py-10">
          <h2
            lang={props.answerLang}
            class="reveal-meaning font-display text-2xl sm:text-3xl text-center leading-tight break-words text-fg"
          >
            {props.answer}
          </h2>
        </div>
      </article>
    )
  },
})
