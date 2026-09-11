const ICONS = {
  tree: (
    <svg viewBox="0 0 16 16" width="20" height="20">
      <rect x="7" y="10" width="2" height="5" fill="#7a5a3a" />
      <rect x="4" y="6" width="8" height="5" fill="#2f8a4c" />
      <rect x="5" y="2" width="6" height="5" fill="#3aa85c" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 16 16" width="20" height="20">
      <rect x="2" y="6" width="4" height="9" fill="#7c6a9c" />
      <rect x="7" y="2" width="4" height="13" fill="#8f7bb0" />
      <rect x="12" y="8" width="3" height="7" fill="#6b5b8a" />
      <rect x="8" y="4" width="1" height="1" fill="#ffe08a" />
      <rect x="9.5" y="4" width="1" height="1" fill="#ffe08a" />
      <rect x="8" y="6" width="1" height="1" fill="#ffe08a" />
    </svg>
  ),
  dome: (
    <svg viewBox="0 0 16 16" width="20" height="20">
      <rect x="1" y="12" width="14" height="2" fill="#8a6a3a" />
      <rect x="3" y="9" width="10" height="3" fill="#e0d0a0" />
      <rect x="4" y="6" width="8" height="3" fill="#f0e0b0" />
      <rect x="6" y="4" width="4" height="2" fill="#fff2c8" />
    </svg>
  ),
  market: (
    <svg viewBox="0 0 16 16" width="20" height="20">
      <rect x="2" y="7" width="12" height="7" fill="#c98a4b" />
      <rect x="1" y="4" width="14" height="3" fill="#d94f4f" />
      <rect x="1" y="4" width="3" height="3" fill="#e8e0c8" />
      <rect x="7" y="4" width="3" height="3" fill="#e8e0c8" />
      <rect x="13" y="4" width="2" height="3" fill="#e8e0c8" />
    </svg>
  ),
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
        {ICONS[landmark.icon]}
      </span>
    </button>
  )
}
