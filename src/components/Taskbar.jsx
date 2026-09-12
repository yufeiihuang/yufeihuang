import { useEffect, useState } from 'react'
import { profile } from '../data/content.js'
import { landmarks } from '../data/landmarks.js'
import { withBase } from '../utils.js'

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 15)
    return () => clearInterval(t)
  }, [])
  return now
}

function useDismissible(key) {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(key) === '1'
    } catch {
      return false
    }
  })
  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(key, '1')
    } catch {
      /* ignore */
    }
  }
  return [dismissed, dismiss]
}

export default function Taskbar({ openWindows, focusedId, onFocusWindow, onOpenLandmark }) {
  const now = useClock()
  const [menuOpen, setMenuOpen] = useState(false)
  const [tipDismissed, dismissTip] = useDismissible('recruiterTipDismissed')

  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="taskbar">
      <div style={{ position: 'relative' }}>
        <button className="taskbar-start" onClick={() => setMenuOpen((v) => !v)}>
          ▧ MAP
        </button>
        {menuOpen && (
          <div
            style={{
              position: 'absolute', bottom: '110%', left: 0, background: 'var(--panel-light)',
              border: '2px solid var(--border-dark)', boxShadow: 'inset 1px 1px 0 var(--border-light)',
              padding: 6, minWidth: 180,
            }}
          >
            {landmarks.map((l) => (
              <button
                key={l.id}
                className="taskbar-window-btn"
                style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: 4 }}
                onClick={() => { onOpenLandmark(l.id); setMenuOpen(false) }}
              >
                {l.name} — {l.subtitle}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="taskbar-sep" />

      <div className="taskbar-windows">
        {openWindows.map((w) => (
          <button
            key={w.id}
            className={`taskbar-window-btn${w.id === focusedId ? ' active' : ''}`}
            onClick={() => onFocusWindow(w.id)}
          >
            {w.title}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative' }}>
        {!tipDismissed && (
          <div className="recruiter-tip">
            <button className="recruiter-tip-close" onClick={dismissTip} aria-label="Dismiss">×</button>
            Recruiter? Resume, GitHub &amp; contact are all right here ↓
          </div>
        )}
        <div className="taskbar-dock">
          <a className="dock-icon" href={`mailto:${profile.email}`} title="Email">✉</a>
          <a className="dock-icon" href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">in</a>
          <a className="dock-icon" href={profile.github} target="_blank" rel="noreferrer" title="GitHub">⌂</a>
          <a className="dock-icon" href={withBase('resume.pdf')} target="_blank" rel="noreferrer" title="Resume">▤</a>
        </div>
      </div>

      <div className="taskbar-clock">{time}</div>
    </div>
  )
}
