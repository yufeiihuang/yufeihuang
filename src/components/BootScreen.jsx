import { useEffect, useState } from 'react'

const LINES = [
  'MEMORY TEST.......................... OK',
  'LOADING VANCOUVER.MAP................ OK',
  'MOUNTING STANLEY_PARK/............... OK',
  'MOUNTING DOWNTOWN/.................... OK',
  'MOUNTING SCIENCE_WORLD/.............. OK',
  'MOUNTING GRANVILLE_ISLAND/........... OK',
  'INIT GITHUB.PROFILE.................. OK',
  'INIT RESUME.PDF....................... OK',
]

export default function BootScreen({ onFinish }) {
  const [shown, setShown] = useState(0)

  const done = shown >= LINES.length

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setShown((s) => s + 1), 180)
    return () => clearTimeout(t)
  }, [shown, done])

  useEffect(() => {
    const advance = () => {
      if (!done) {
        setShown(LINES.length)
      } else {
        onFinish()
      }
    }
    window.addEventListener('keydown', advance)
    window.addEventListener('click', advance)
    return () => {
      window.removeEventListener('keydown', advance)
      window.removeEventListener('click', advance)
    }
  }, [done, onFinish])

  return (
    <div className="boot-screen">
      <div className="boot-header">YUFEI-OS v1.0 — © 2026 YUFEI HUANG</div>
      {LINES.slice(0, shown).map((line, i) => (
        <div className="boot-line" key={i}>{line}</div>
      ))}
      {!done && <div className="boot-line"><span className="boot-cursor" /></div>}

      <div className="boot-progress-track">
        <div className="boot-progress-fill" style={{ width: `${(shown / LINES.length) * 100}%` }} />
      </div>

      {done && <div className="boot-ready">SYSTEM READY.</div>}

      <div className="boot-skip">
        {done ? 'PRESS ANY KEY TO CONTINUE' : 'PRESS ANY KEY TO SKIP'}
      </div>
    </div>
  )
}
