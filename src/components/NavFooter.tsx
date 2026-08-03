import { defineComponent } from 'vue'
import { useDeck } from '../composables/useDeck'

export const NavFooter = defineComponent({
  name: 'NavFooter',
  setup() {
    const { goPrev, goNext } = useDeck()

    return () => (
      <footer class="flex shrink-0 h-20 bg-accent text-white">
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
      </footer>
    )
  },
})
