function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function smoothRadii(radii, passes = 2) {
  let r = radii.slice()
  for (let p = 0; p < passes; p++) {
    r = r.map((v, i) => {
      const prev = r[(i - 1 + r.length) % r.length]
      const next = r[(i + 1) % r.length]
      return (prev + v * 2 + next) / 4
    })
  }
  return r
}

function blobPath(cx, cy, rx, ry, n, seed, irregularity = 0.22) {
  const rng = mulberry32(seed)
  const radii = smoothRadii(
    Array.from({ length: n }, () => 1 + (rng() - 0.5) * 2 * irregularity),
    2
  )
  const pts = radii.map((r, i) => {
    const angle = (i / n) * Math.PI * 2
    return [cx + Math.cos(angle) * rx * r, cy + Math.sin(angle) * ry * r]
  })
  const d = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`]
  const len = pts.length
  for (let i = 0; i < len; i++) {
    const p0 = pts[(i - 1 + len) % len]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % len]
    const p3 = pts[(i + 2) % len]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d.push(`C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`)
  }
  d.push('Z')
  return d.join(' ')
}

function scatterInEllipse(cx, cy, rx, ry, count, seed, margin = 0.7) {
  const rng = mulberry32(seed)
  const pts = []
  for (let i = 0; i < count; i++) {
    const ang = rng() * Math.PI * 2
    const rad = Math.sqrt(rng()) * margin
    pts.push([cx + Math.cos(ang) * rx * rad, cy + Math.sin(ang) * ry * rad])
  }
  return pts
}

function Blob({ cx, cy, rx, ry, n = 11, seed, irregularity, fill, opacity }) {
  return <path d={blobPath(cx, cy, rx, ry, n, seed, irregularity)} fill={fill} opacity={opacity} />
}

const iconProps = (color, width = 1.5) => ({
  stroke: color,
  strokeWidth: width,
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

function TreeIcon({ x, y, s = 1, color }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} {...iconProps(color)}>
      <circle cx="0" cy="-3.2" r="3" />
      <line x1="0" y1="-0.4" x2="0" y2="3" />
    </g>
  )
}

function PeakIcon({ x, y, s = 1, color }) {
  return (
    <path
      d="M -7 4 L 0 -8 L 7 4 Z M -3 4 L 0 -1 L 3 4"
      transform={`translate(${x},${y}) scale(${s})`}
      {...iconProps(color)}
    />
  )
}

function BuildingIcon({ x, y, s = 1, color, h = 9 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} {...iconProps(color, 1.4)}>
      <rect x="-3" y={-h} width="6" height={h} />
      <line x1="-1.4" y1={-h + 2.5} x2="1.4" y2={-h + 2.5} />
    </g>
  )
}

function TowerIcon({ x, y, s = 1, color, accent }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <line x1="0" y1="0" x2="0" y2="-22" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="0" cy="-24" rx="7" ry="3" fill={accent} />
      <line x1="0" y1="-27" x2="0" y2="-31" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  )
}

function DomeIcon({ x, y, s = 1, color }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} {...iconProps(color)}>
      <path d="M -10 2 A 10 10 0 0 1 10 2" />
      <line x1="-11" y1="2" x2="11" y2="2" />
      <line x1="-7" y1="1.3" x2="-7" y2="2" />
      <line x1="0" y1="-8" x2="0" y2="2" />
      <line x1="7" y1="1.3" x2="7" y2="2" />
    </g>
  )
}

function MarketIcon({ x, y, s = 1, color }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} {...iconProps(color, 1.4)}>
      <path d="M -7 3 L 0 -6 L 7 3 Z" />
      <line x1="-8" y1="3" x2="8" y2="3" />
    </g>
  )
}

function HouseIcon({ x, y, s = 1, color }) {
  return (
    <path
      d="M -3.4 3.5 L -3.4 -1 L 0 -4.2 L 3.4 -1 L 3.4 3.5 Z"
      transform={`translate(${x},${y}) scale(${s})`}
      {...iconProps(color, 1.3)}
    />
  )
}

function BoatIcon({ x, y, s = 1, color }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} {...iconProps(color, 1.2)}>
      <path d="M -5 2 L 5 2 L 3.4 5 L -3.4 5 Z" />
      <line x1="0" y1="2" x2="0" y2="-5" />
      <path d="M 0.3 -5 L 4 -1.2 L 0.3 -1.2 Z" fill={color} stroke="none" />
    </g>
  )
}

const rngTree = mulberry32(42)
const PARK_TREES = scatterInEllipse(64, 64, 44, 26, 16, 11).map(([x, y]) => ({
  x, y, s: 0.8 + rngTree() * 0.6,
}))

const rngBldg = mulberry32(88)
const DOWNTOWN_BUILDINGS = scatterInEllipse(186, 92, 62, 30, 13, 23).map(([x, y]) => ({
  x, y, s: 0.7 + rngBldg() * 0.7, h: 6 + rngBldg() * 8,
}))

const rngHouse = mulberry32(5)
const SOUTH_HOUSES = scatterInEllipse(160, 205, 165, 20, 18, 31).map(([x, y]) => ({
  x, y, s: 0.7 + rngHouse() * 0.5,
}))

const WATER_WAVES = [
  'M 0 46 Q 20 42 40 46 T 80 46 T 120 46',
  'M 0 104 Q 24 100 48 104 T 96 104',
  'M 220 34 Q 240 30 260 34 T 300 34',
  'M 10 150 Q 30 146 50 150 T 90 150',
]

const BOATS = [
  { x: 30, y: 108 }, { x: 285, y: 72 }, { x: 95, y: 158 },
]

export default function VancouverMap() {
  return (
    <svg
      className="vancouver-map"
      viewBox="0 0 320 192"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Stylized map of Vancouver, BC"
    >
      {/* water */}
      <rect x="0" y="0" width="320" height="192" fill="var(--v-water)" />
      {WATER_WAVES.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="var(--v-water-line)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      ))}
      {BOATS.map((b, i) => (
        <BoatIcon key={i} x={b.x} y={b.y} s={1.1} color="var(--v-water-line)" />
      ))}

      {/* North Shore mountains */}
      <Blob cx={160} cy={-6} rx={185} ry={24} n={14} seed={4} irregularity={0.16} fill="var(--v-mountain)" />
      {[30, 75, 130, 190, 245, 290].map((x, i) => (
        <PeakIcon key={i} x={x} y={8} s={0.9 + (i % 3) * 0.15} color="var(--v-mountain-line)" />
      ))}

      {/* bridge */}
      <line x1="70" y1="12" x2="70" y2="42" stroke="var(--v-bridge)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="70" cy="12" r="2.4" fill="var(--v-bridge)" />
      <circle cx="70" cy="42" r="2.4" fill="var(--v-bridge)" />

      {/* Stanley Park */}
      <Blob cx={64} cy={64} rx={50} ry={34} n={12} seed={17} irregularity={0.2} fill="var(--v-park)" />
      {PARK_TREES.map((t, i) => (
        <TreeIcon key={i} x={t.x} y={t.y} s={t.s} color="var(--v-park-line)" />
      ))}

      {/* Downtown */}
      <Blob cx={186} cy={92} rx={76} ry={42} n={13} seed={29} irregularity={0.17} fill="var(--v-downtown)" />
      {DOWNTOWN_BUILDINGS.map((b, i) => (
        <BuildingIcon key={i} x={b.x} y={b.y} s={b.s} h={b.h} color="var(--v-downtown-line)" />
      ))}
      <TowerIcon x={192} y={86} color="var(--v-downtown-line)" accent="var(--v-accent)" />

      {/* Canada Place sails */}
      <g transform="translate(150,58)" {...iconProps('var(--v-downtown-line)', 1.4)}>
        <path d="M -14 8 L -8 -6 L -2 8 Z" />
        <path d="M -2 8 L 4 -10 L 10 8 Z" />
        <path d="M 10 8 L 15 -4 L 20 8 Z" />
        <line x1="-16" y1="8" x2="22" y2="8" />
      </g>

      {/* Granville Island */}
      <Blob cx={168} cy={142} rx={30} ry={16} n={10} seed={51} irregularity={0.22} fill="var(--v-island)" />
      <MarketIcon x={168} y={144} s={1.3} color="var(--v-island-line)" />

      {/* Science World */}
      <Blob cx={252} cy={144} rx={27} ry={15} n={10} seed={63} irregularity={0.22} fill="var(--v-science)" />
      <DomeIcon x={252} y={148} s={1.3} color="var(--v-science-line)" />

      {/* South Vancouver */}
      <Blob cx={160} cy={210} rx={175} ry={30} n={16} seed={8} irregularity={0.1} fill="var(--v-south)" />
      {SOUTH_HOUSES.map((h, i) => (
        <HouseIcon key={i} x={h.x} y={h.y} s={h.s} color="var(--v-south-line)" />
      ))}

      {/* atmosphere labels */}
      <text x="10" y="12" className="map-label-text">NORTH SHORE</text>
      <text x="10" y="182" className="map-label-text">ENGLISH BAY</text>
      <text x="230" y="182" className="map-label-text">SOUTH VANCOUVER</text>
    </svg>
  )
}
