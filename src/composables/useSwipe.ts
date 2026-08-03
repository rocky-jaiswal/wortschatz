const MIN_DISTANCE = 50
/** How much more horizontal than vertical a drag must be to count as a swipe. */
const HORIZONTAL_BIAS = 1.5

interface SwipeHandlers {
  onLeft: () => void
  onRight: () => void
}

/**
 * Recognises a horizontal swipe from raw touch events. Returns listeners to
 * spread onto an element; it holds the gesture's start point and nothing else.
 */
export function useSwipe({ onLeft, onRight }: SwipeHandlers) {
  let startX = 0
  let startY = 0

  const onTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
  }

  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX
    const dy = e.changedTouches[0].clientY - startY
    const isHorizontalSwipe =
      Math.abs(dx) > MIN_DISTANCE && Math.abs(dx) > Math.abs(dy) * HORIZONTAL_BIAS
    if (!isHorizontalSwipe) return
    if (dx < 0) onLeft()
    else onRight()
  }

  return { onTouchStart, onTouchEnd }
}
