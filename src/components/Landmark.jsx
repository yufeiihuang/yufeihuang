import LandmarkIcon from './LandmarkIcon.jsx'

export default function Landmark({ landmark, onOpen }) {
  const { area } = landmark
  return (
    <button className={`landmark${landmark.featured ? ' featured' : ''}`}
      style={{ left: `${area.x}%`, top: `${area.y}%`, width: `${area.width}%`, height: `${area.height}%` }}
      onClick={() => onOpen(landmark.id)} aria-label={`Open ${landmark.subtitle} (${landmark.name})`}>
      <span className="landmark-hit-area" aria-hidden="true" />
      <span className="landmark-content" style={{ left: `${(landmark.x - area.x) / area.width * 100}%`, top: `${(landmark.y - area.y) / area.height * 100}%` }}>
        <LandmarkIcon id={landmark.id} />
        <span className="landmark-label"><span className="landmark-number">{landmark.number}</span>
          <span><strong>{landmark.subtitle}</strong><small>{landmark.name}</small></span>
          {landmark.featured && <span className="landmark-star" aria-hidden="true">✦</span>}
        </span>
      </span>
    </button>
  )
}
