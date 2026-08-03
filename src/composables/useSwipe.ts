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
    const touch = e.touches[0]
    if (!touch) return
    startX = touch.clientX
    startY = touch.clientY
  }

  const onTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    if (!touch) return
    const dx = touch.clientX - startX
    const dy = touch.clientY - startY
    const isHorizontalSwipe =
      Math.abs(dx) > MIN_DISTANCE && Math.abs(dx) > Math.abs(dy) * HORIZONTAL_BIAS
    if (!isHorizontalSwipe) return
    if (dx < 0) onLeft()
    else onRight()
  }

  return { onTouchStart, onTouchEnd }
}
