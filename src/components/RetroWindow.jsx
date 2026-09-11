import { useDraggable } from '../hooks/useDraggable.js'

export default function RetroWindow({ id, title, icon, initial, zIndex, focused, onClose, onFocus, children }) {
  const { pos, onPointerDown } = useDraggable(initial)

  return (
    <div
      className={`retro-window${focused ? ' focused' : ''}`}
      style={{ left: pos.x, top: pos.y, zIndex }}
      onMouseDown={() => onFocus(id)}
      role="dialog"
      aria-label={title}
    >
      <div className="retro-titlebar" onPointerDown={onPointerDown}>
        <span className="retro-titlebar-icon">{icon}</span>
        <span className="retro-titlebar-title">{title}</span>
        <button
          className="retro-titlebar-btn"
          onClick={(e) => { e.stopPropagation(); onClose(id) }}
          aria-label="Close window"
        >
          ×
        </button>
      </div>
      <div className="retro-window-body">{children}</div>
    </div>
  )
}
