import { useEffect, useState } from 'react'

export default function MapRain() {
  const [raining, setRaining] = useState(false)
  useEffect(() => {
    let keys = ''
    let lastKey = 0
    let timer
    const listen = event => {
      const target = event.target
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat ||
        target instanceof Element && target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]')) return
      if (event.key.length !== 1) { keys = ''; return }
      const now = Date.now()
      if (now - lastKey > 1800) keys = ''
      lastKey = now
      keys = (keys + event.key.toLowerCase()).slice(-4)
      if (keys !== 'rain') return
      keys = ''
      setRaining(true)
      clearTimeout(timer)
      timer = setTimeout(() => setRaining(false), 6000)
    }
    window.addEventListener('keydown', listen)
    return () => { window.removeEventListener('keydown', listen); clearTimeout(timer) }
  }, [])
  if (!raining) return null
  return <div className="map-rain" aria-hidden="true">
    {Array.from({length: 48}, (_, index) => <span key={index} className="map-rain-drop" style={{left: `${(index * 37) % 100}%`, top: `${(index * 23) % 92}%`, animationDelay: `-${index % 7 * .12}s`, animationDuration: `${.6 + index % 4 * .1}s`}} />)}
    <span className="weather-note">Vancouver forecast: rain.</span>
  </div>
}
