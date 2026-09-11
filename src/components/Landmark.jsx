const GLYPHS = {
  tree: (
    <g stroke="#0b0f1a" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <circle cx="10" cy="8" r="5" />
      <line x1="10" y1="12" x2="10" y2="16" />
    </g>
  ),
  building: (
    <g stroke="#0b0f1a" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="5" width="8" height="12" />
      <line x1="8.5" y1="8" x2="8.5" y2="8" />
      <line x1="8.5" y1="11" x2="8.5" y2="11" />
      <line x1="11.5" y1="8" x2="11.5" y2="8" />
    </g>
  ),
  dome: (
    <g stroke="#0b0f1a" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M 4 13 A 6 6 0 0 1 16 13" />
      <line x1="3" y1="13" x2="17" y2="13" />
    </g>
  ),
  market: (
    <g stroke="#0b0f1a" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 5 14 L 10 5 L 15 14 Z" />
      <line x1="4" y1="14" x2="16" y2="14" />
    </g>
  ),
}

const PIN_COLOR = {
  tree: 'var(--v-park)',
  building: 'var(--v-downtown)',
  dome: 'var(--v-science)',
  market: 'var(--v-island)',
}

export default function Landmark({ landmark, onOpen }) {
  const left = (landmark.x / 320) * 100
  const top = (landmark.y / 192) * 100

  return (
    <button
      className="landmark"
      style={{ left: `${left}%`, top: `${top}%` }}
      onClick={() => onOpen(landmark.id)}
      aria-label={`Open ${landmark.subtitle} (${landmark.name})`}
    >
      <span className="landmark-label">
        {landmark.name}
        <span className="sub">▸ {landmark.subtitle}</span>
      </span>
      <span className="landmark-marker">
        <span className="landmark-ping" />
        <svg viewBox="0 0 20 20" width="26" height="26">
          <circle cx="10" cy="10" r="9" fill={PIN_COLOR[landmark.icon]} stroke="#fff" strokeWidth="1.6" />
          {GLYPHS[landmark.icon]}
        </svg>
      </span>
    </button>
  )
}
