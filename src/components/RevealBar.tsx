import { defineComponent } from 'vue'

/**
 * The sweeping line that times the guess. Purely decorative — the timing lives
 * in the `reveal-sweep` keyframes in `src/styles/index.css`.
 */
export const RevealBar = defineComponent({
  name: 'RevealBar',
  setup() {
    return () => (
      <div class="w-full h-1.5 overflow-hidden" aria-hidden="true">
        <div class="reveal-sweep h-full w-full bg-accent" />
      </div>
    )
  },
})
