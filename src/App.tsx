import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { AppHeader } from './components/AppHeader'
import { InstallBanner } from './components/InstallBanner'
import { NavFooter } from './components/NavFooter'

export default defineComponent({
  name: 'App',
  setup() {
    // Mounted for its side effect: syncs data-theme and the theme-color meta tag.
    useTheme()

    return () => (
      <div class="flex flex-col h-full min-h-screen">
        <AppHeader />
        <InstallBanner />

        <main class="flex-1 overflow-hidden">
          <RouterView />
        </main>

        <NavFooter />
      </div>
    )
  },
})
