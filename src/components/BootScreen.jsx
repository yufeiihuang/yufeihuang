import { useEffect, useState } from 'react'
import { withBase } from '../utils.js'

const LINES = ['Finding the Pacific coast', 'Planting Stanley Park', 'Raising the Canada Place sails', 'Connecting Lions Gate Bridge', 'Opening Sorora on Granville Island']

export default function BootScreen({ onFinish }) {
  const [shown, setShown] = useState(0)
  const done = shown >= LINES.length
  useEffect(() => {
    if (done) return
    const timer = setTimeout(() => setShown(s => s + 1), 240)
    return () => clearTimeout(timer)
  }, [shown, done])
  useEffect(() => {
    const advance = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      if (event.target instanceof HTMLButtonElement) return
      event.preventDefault()
      if (done) onFinish()
      else setShown(LINES.length)
    }
    window.addEventListener('keydown', advance)
    return () => window.removeEventListener('keydown', advance)
  }, [done, onFinish])
  return <main className="boot-screen" style={{ backgroundImage: `linear-gradient(90deg, rgba(8, 27, 43, .97), rgba(8, 27, 43, .7)), url(${withBase('images/vancouver-pixel-map-v2.png')})` }}>
    <div className="boot-card">
      <p className="eyebrow">YUFEI–OS / EST. VANCOUVER</p>
      <div className="boot-emblem" aria-hidden="true">✦</div>
      <h1>Let me show<br />you around.</h1>
      <div className="boot-log" aria-live="polite">{LINES.slice(0, shown).map(line => <div key={line}><span>✓</span> {line}</div>)}</div>
      <div className="boot-progress-track" role="progressbar" aria-label="Loading Vancouver" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(shown / LINES.length * 100)}><div className="boot-progress-fill" style={{ width: `${shown / LINES.length * 100}%` }} /></div>
      <div className="boot-bottom"><span>{done ? 'YOUR NEXT STOP: VANCOUVER' : 'LOADING THE GOOD STUFF…'}</span><span>{Math.round(shown / LINES.length * 100)}%</span></div>
      <button className="hero-cta boot-enter" onClick={() => done ? onFinish() : setShown(LINES.length)}>{done ? 'Enter Vancouver ↗' : 'Skip loading →'}</button>
    </div>
  </main>
}
