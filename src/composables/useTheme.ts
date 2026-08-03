import { ref, watchEffect } from 'vue'

const storedTheme = localStorage.getItem('theme')
const themeRef = ref<'light' | 'dark'>(
  storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light'
)

const THEME_COLORS = { light: '#00a0d6', dark: '#0c1416' }

watchEffect(() => {
  localStorage.setItem('theme', themeRef.value)
  document.documentElement.setAttribute('data-theme', themeRef.value)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', THEME_COLORS[themeRef.value])
})

export function useTheme() {
  const toggleTheme = () => {
    themeRef.value = themeRef.value === 'light' ? 'dark' : 'light'
  }
  return { theme: themeRef, toggleTheme }
}
