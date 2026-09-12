import { useEffect, useRef, useState } from 'react'

const DROPS = Array.from({ length: 9 }, (_, index) => ({
  left: 9 + (index * 7) % 19,
  delay: (index % 3) * 140 + Math.floor(index / 3) * 50,
  duration: 420 + (index % 4) * 80,
}))

export default function CursorRain() {
  const [shower, setShower] = useState(0)
  const layer = useRef(null)
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let timer
    const move = (event) => {
      position.current = { x: event.clientX, y: event.clientY }
      if (layer.current) layer.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }
    const rain = (event) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      move(event)
      setShower(value => value + 1)
      clearTimeout(timer)
      timer = setTimeout(() => setShower(0), 2200)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('dblclick', rain)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('dblclick', rain)
    }
  }, [])

  if (!shower) return null
  return <div ref={layer} className="cursor-rain" aria-hidden="true"
    style={{ transform: `translate3d(${position.current.x}px, ${position.current.y}px, 0)` }}>
    {DROPS.map((drop, index) => <i key={`${shower}-${index}`} className="cursor-raindrop"
      style={{ left: drop.left, animationDelay: `${drop.delay}ms`, animationDuration: `${drop.duration}ms` }} />)}
  </div>
}
