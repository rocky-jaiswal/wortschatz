import { defineComponent } from 'vue'
import { useInstallPrompt } from '../composables/useInstallPrompt'

export const InstallBanner = defineComponent({
  name: 'InstallBanner',
  setup() {
    const { canShow, install, dismiss } = useInstallPrompt()

    return () =>
      canShow() ? (
        <div class="shrink-0 flex items-center gap-3 border-b border-card-border bg-card-bg px-4 py-3">
          <div class="flex-1">
            <p class="text-sm font-medium text-fg">Install on your device</p>
            <p class="text-xs text-muted mt-0.5">
              Add it to your home screen or desktop for the best experience
            </p>
          </div>
          <button
            class="px-3 py-1.5 text-xs font-medium rounded-lg bg-brand text-white hover:opacity-90 transition-opacity"
            onClick={install}
          >
            Install
          </button>
          <button
            class="p-1 text-muted hover:text-fg transition-colors"
            onClick={dismiss}
            aria-label="Dismiss"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : null
  },
})
