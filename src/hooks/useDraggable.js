import { useRef, useState, useCallback, useEffect } from 'react'

export function useDraggable(initial) {
  const [pos, setPos] = useState(initial)
  const dragState = useRef(null)

  const onPointerDown = useCallback((e) => {
    if (window.innerWidth <= 760) return
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }, [pos])

  const onPointerMove = useCallback((e) => {
    if (!dragState.current) return
    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY
    setPos({
      x: Math.max(4, Math.min(window.innerWidth - 100, dragState.current.origX + dx)),
      y: Math.max(4, Math.min(window.innerHeight - 60, dragState.current.origY + dy)),
    })
  }, [])

  const onPointerUp = useCallback(() => {
    dragState.current = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }, [onPointerMove])

  useEffect(() => () => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }, [onPointerMove, onPointerUp])

  return { pos, onPointerDown }
}
