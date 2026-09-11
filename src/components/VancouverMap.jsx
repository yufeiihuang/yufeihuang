const MOUNTAIN_PEAKS = [
  { x: 18, y: 3, w: 14, h: 8 },
  { x: 54, y: 5, w: 12, h: 6 },
  { x: 96, y: 2, w: 16, h: 9 },
  { x: 150, y: 5, w: 14, h: 6 },
  { x: 196, y: 2, w: 16, h: 9 },
  { x: 236, y: 5, w: 12, h: 6 },
  { x: 268, y: 2, w: 16, h: 9 },
  { x: 298, y: 5, w: 14, h: 6 },
]

const PARK_TREES = [
  { x: 24, y: 42, s: 6 }, { x: 40, y: 50, s: 6 }, { x: 30, y: 62, s: 6 },
  { x: 54, y: 40, s: 6 }, { x: 66, y: 54, s: 6 }, { x: 48, y: 70, s: 6 },
  { x: 78, y: 44, s: 6 }, { x: 90, y: 60, s: 6 }, { x: 64, y: 82, s: 6 },
  { x: 30, y: 84, s: 6 }, { x: 88, y: 78, s: 6 },
]

function DowntownBlocks() {
  const blocks = []
  const startX = 112, startY = 48, cols = 9, rows = 5, size = 16, gap = 2
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const shade = (r + c) % 3 === 0 ? 'var(--downtown-dark)' : (r + c) % 3 === 1 ? 'var(--downtown)' : 'var(--downtown-alt)'
      blocks.push(
        <rect
          key={`b-${r}-${c}`}
          x={startX + c * size}
          y={startY + r * size}
          width={size - gap}
          height={size - gap}
          fill={shade}
        />
      )
    }
  }
  return <>{blocks}</>
}

export default function VancouverMap() {
  return (
    <svg
      className="vancouver-map"
      viewBox="0 0 320 192"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pixel-art map of Vancouver, BC"
    >
      {/* water base */}
      <rect x="0" y="0" width="320" height="192" fill="var(--water-deep)" />
      <rect x="0" y="30" width="320" height="4" fill="var(--water-light)" opacity="0.5" />
      <rect x="0" y="110" width="320" height="4" fill="var(--water-light)" opacity="0.4" />

      {/* mountains (North Shore) */}
      <rect x="0" y="0" width="320" height="16" fill="var(--mountain)" />
      {MOUNTAIN_PEAKS.map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill="var(--mountain-light)" />
      ))}

      {/* Lions Gate style bridge strip (decorative, connects mountains to park) */}
      <rect x="68" y="0" width="8" height="48" fill="var(--bridge)" />
      <rect x="66" y="14" width="12" height="3" fill="var(--bridge)" />
      <rect x="66" y="30" width="12" height="3" fill="var(--bridge)" />

      {/* Stanley Park peninsula */}
      <rect x="16" y="32" width="96" height="64" fill="var(--park)" />
      <rect x="16" y="32" width="16" height="16" fill="var(--water-deep)" />
      <rect x="16" y="80" width="16" height="16" fill="var(--water-deep)" />
      {PARK_TREES.map((t, i) => (
        <rect key={i} x={t.x} y={t.y} width={t.s} height={t.s} fill="var(--park-light)" />
      ))}

      {/* Downtown peninsula */}
      <rect x="112" y="48" width="144" height="80" fill="var(--downtown-dark)" />
      <DowntownBlocks />

      {/* Canada Place pier */}
      <rect x="144" y="28" width="36" height="20" fill="var(--downtown-alt)" />
      <rect x="150" y="20" width="6" height="10" fill="var(--text)" opacity="0.85" />
      <rect x="160" y="18" width="6" height="12" fill="var(--text)" opacity="0.85" />
      <rect x="170" y="20" width="6" height="10" fill="var(--text)" opacity="0.85" />

      {/* Gastown accent + steam clock */}
      <rect x="232" y="48" width="24" height="24" fill="var(--amber)" opacity="0.35" />

      {/* Granville Island */}
      <rect x="144" y="128" width="48" height="16" fill="var(--island)" />
      <rect x="150" y="132" width="8" height="8" fill="var(--downtown-dark)" />
      <rect x="164" y="132" width="8" height="8" fill="var(--downtown-dark)" />
      <rect x="178" y="132" width="8" height="8" fill="var(--downtown-dark)" />

      {/* Science World ground */}
      <rect x="240" y="128" width="32" height="16" fill="var(--island)" />

      {/* South Vancouver land */}
      <rect x="0" y="160" width="320" height="32" fill="var(--land)" />
      <rect x="0" y="160" width="320" height="4" fill="var(--park-light)" opacity="0.5" />
    </svg>
  )
}
