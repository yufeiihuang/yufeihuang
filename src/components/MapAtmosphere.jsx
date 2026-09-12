const SNOW = [
  [71, 1, 0], [76, 0, 3], [80, 2, 1.5], [84, 0, 5],
  [88, 1, 2.2], [92, 0, 4], [96, 2, .7], [99, 0, 6],
]

export default function MapAtmosphere({ onBoatRide }) {
  return <div className="map-atmosphere">
    {[[32, 69, 0], [73, 31, 3], [85, 70, 5]].map(([x, y, delay], index) =>
      <button key={`boat-${index}`} className="drifting-boat" onClick={onBoatRide} aria-label={`Secret ferry ${index + 1}: visit a random portfolio destination`} title="Hop aboard — surprise destination!"
        style={{ left: `${x}%`, top: `${y}%`, animationDelay: `-${delay}s`, animationDuration: `${8 + index * 2}s` }}>
        <svg viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">
        <g className="boat-hull">
        <path fill="#79aeba" opacity=".6" d="M3 28h22v1H3zm5 3h13v1H8z" />
        <path fill="#f7e7c7" d="M5 24h24v2h-3v2H9v-2H5z" />
        <path fill="#ad6852" d="M8 26h18v2H8z" />
        <path fill="#d3bd92" d="M17 4h1v20h-1z" />
        <path fill="#fff0d1" d="M15 6h1v15H5v-3h3v-4h3v-4h4z" />
        <path fill="#aac5c7" d="M19 9h2v4h3v4h3v4h-8z" />
        </g>
        <rect className="boat-night-light" x="20" y="23" width="2" height="2" fill="#ffe0a0" />
      </svg></button>)}
    <div className="mountain-snow" aria-hidden="true">{SNOW.map(([x, y, delay], index) => <span key={`snow-${index}`} className="mountain-snowflake"
      style={{ left: `${x}%`, top: `${y}%`, animationDelay: `-${delay}s`, animationDuration: `${7 + index % 3}s` }} />)}</div>
  </div>
}
