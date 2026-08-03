import { defineComponent } from 'vue'
import { useDeck } from '../composables/useDeck'

const PILL =
  'px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-black/15 hover:bg-black/25 transition-colors'

export const NavFooter = defineComponent({
  name: 'NavFooter',
  setup() {
    const { goPrev, goNext, shuffled, quizMode, toggleShuffle, toggleQuizMode } = useDeck()

    return () => (
      <footer class="shrink-0 bg-accent text-white">
        {/* Mode strip — labelled rather than iconised, so the current mode is readable */}
        <div class="flex items-center justify-center gap-2 py-1.5 border-b border-white/20">
          <button
            class={PILL}
            onClick={toggleQuizMode}
            aria-label="Swap the direction you are quizzed in"
          >
            {quizMode.value === 'deToEn' ? 'DE → EN' : 'EN → DE'}
          </button>
          <button
            class={PILL}
            onClick={toggleShuffle}
            aria-label={shuffled.value ? 'Switch to alphabetical order' : 'Shuffle the deck'}
          >
            {shuffled.value ? 'Shuffled' : 'A–Z'}
          </button>
        </div>

        <div class="flex h-16">
          <button
            class="w-1/2 text-4xl leading-none hover:bg-black/10 active:bg-black/20 transition-colors"
            onClick={goPrev}
            aria-label="Previous word"
          >
            &#12296;
          </button>
          <button
            class="w-1/2 text-4xl leading-none hover:bg-black/10 active:bg-black/20 transition-colors"
            onClick={goNext}
            aria-label="Next word"
          >
            &#12297;
          </button>
        </div>
      </footer>
    )
  },
})
