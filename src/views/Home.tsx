import { defineComponent, onMounted, onUnmounted, Transition } from 'vue'
import { useDeck } from '../composables/useDeck'
import { useSwipe } from '../composables/useSwipe'
import { WordCard } from '../components/WordCard'

export default defineComponent({
  name: 'Home',
  setup() {
    const { currentWord, currentIndex, direction, goPrev, goNext } = useDeck()
    const { onTouchStart, onTouchEnd } = useSwipe({ onLeft: goNext, onRight: goPrev })

    const KEY_ACTIONS: Record<string, () => void> = {
      ArrowLeft: goPrev,
      ArrowRight: goNext,
    }

    const onKeydown = (e: KeyboardEvent) => {
      const action = KEY_ACTIONS[e.key]
      if (!action) return
      e.preventDefault()
      action()
    }

    onMounted(() => window.addEventListener('keydown', onKeydown))
    onUnmounted(() => window.removeEventListener('keydown', onKeydown))

    const transitionName = () => (direction.value < 0 ? 'slide-right' : 'slide-left')

    return () => (
      <div class="h-full" onTouchstart={onTouchStart} onTouchend={onTouchEnd}>
        <Transition name={transitionName()} mode="out-in">
          <WordCard key={currentIndex.value} word={currentWord.value} />
        </Transition>
      </div>
    )
  },
})
