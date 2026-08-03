import { defineComponent, ref, watch } from 'vue'
import { useDeck } from '../composables/useDeck'
import { useTheme } from '../composables/useTheme'

export const AppHeader = defineComponent({
  name: 'AppHeader',
  setup() {
    const { total, currentIndex, goToTyped } = useDeck()
    const { theme, toggleTheme } = useTheme()

    // Local draft so typing "150" doesn't navigate through 1 and 15 on the way.
    const draft = ref(String(currentIndex.value))
    watch(currentIndex, (index) => (draft.value = String(index)))

    const commit = () => {
      goToTyped(draft.value)
      draft.value = String(currentIndex.value)
    }

    return () => (
      <header class="flex items-center justify-between gap-3 bg-brand text-white px-4 h-14 shrink-0">
        <h1 class="font-display text-lg tracking-wide">Wortschatz</h1>

        <div class="flex items-center gap-3">
          <label class="flex items-center gap-1 text-sm">
            <span class="sr-only">Jump to word</span>
            <input
              class="w-16 px-1.5 py-0.5 rounded bg-white/15 text-white text-center outline-none focus:bg-white/25 transition-colors"
              type="number"
              min="0"
              max={total - 1}
              value={draft.value}
              onInput={(e) => (draft.value = (e.target as HTMLInputElement).value)}
              onKeydown={(e: KeyboardEvent) => {
                e.stopPropagation()
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
              }}
              onBlur={commit}
            />
            <span class="text-white/80 tabular-nums">/ {total - 1}</span>
          </label>

          <button
            class="p-2 rounded-full hover:bg-white/15 transition-colors"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme.value === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme.value === 'light' ? (
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>
      </header>
    )
  },
})
