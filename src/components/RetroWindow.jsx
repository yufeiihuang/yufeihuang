import { useEffect, useRef, useState } from 'react'
import { useDraggable } from '../hooks/useDraggable.js'

export default function RetroWindow({ id, title, icon, initial, zIndex, focused, onClose, onFocus, children }) {
  const [expanded, setExpanded] = useState(false)
  const { pos, onPointerDown } = useDraggable(initial)

  const dialogRef = useRef(null)
  useEffect(() => {
    if (focused && !dialogRef.current?.contains(document.activeElement)) {
      dialogRef.current?.focus()
    }
  }, [focused, zIndex])

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className={`retro-window${focused ? ' focused' : ''}${expanded ? ' expanded' : ''}`}
      style={{ left: pos.x, top: pos.y, zIndex }}
      onPointerDown={() => onFocus(id)}
      onFocus={() => onFocus(id)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') { event.stopPropagation(); onClose(id) }
      }}
      role="dialog"
      aria-label={title}
    >
      <div className="retro-titlebar" onPointerDown={expanded ? undefined : onPointerDown}>
        <span className="retro-titlebar-icon">{icon}</span>
        <span className="retro-titlebar-title">{title}</span>
        <button
          className="retro-titlebar-btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => { onFocus(id); setExpanded(value => !value) }}
          aria-label={expanded ? 'Restore window' : 'Expand window'}
          aria-pressed={expanded}
          title={expanded ? 'Restore window' : 'Expand window'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {expanded ? <><path d="M4 4V1h9v9h-3" /><rect x="1" y="4" width="9" height="9" /></> : <rect x="1" y="1" width="12" height="12" />}
          </svg>
        </button>
        <button
          className="retro-titlebar-btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onClose(id) }}
          aria-label="Close window"
        >
          ×
        </button>
      </div>
      <div className="retro-window-body">{children}</div>
      {!expanded && <div className="window-resize-hint" aria-hidden="true">Drag the bottom-right corner to resize ↘</div>}
    </div>
  )
}
