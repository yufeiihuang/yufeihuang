import Tile from './Tile.jsx'

const COLS = 40
const ROWS = 24
const TS = 16
const MAP_W = COLS * TS
const MAP_H = ROWS * TS

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

const pctX = (px) => `${(px / MAP_W) * 100}%`
const pctY = (px) => `${(px / MAP_H) * 100}%`

const REGIONS = {
  stanley: { cx: 8, cy: 8.5, rx: 6.4, ry: 4.6 },
  downtown: { cx: 23, cy: 11.5, rx: 9.5, ry: 5.6 },
  granville: { cx: 21, cy: 17.5, rx: 3.9, ry: 2.1 },
  scienceworld: { cx: 31.5, cy: 18, rx: 3.5, ry: 2 },
}

function inEllipse(r, x, y) {
  const dx = (x - r.cx) / r.rx
  const dy = (y - r.cy) / r.ry
  return dx * dx + dy * dy <= 1
}

function classify(cx, cy) {
  if (cy <= 1.5) return 'mountain'
  if (cy >= 21) return 'south'
  if (inEllipse(REGIONS.downtown, cx, cy)) return 'downtown'
  if (inEllipse(REGIONS.stanley, cx, cy)) return 'stanley'
  if (inEllipse(REGIONS.granville, cx, cy)) return 'granville'
  if (inEllipse(REGIONS.scienceworld, cx, cy)) return 'scienceworld'
  return 'water'
}

const GRASS = [[5, 0], [5, 1], [5, 0], [5, 0]]
const WATER = [[0, 0], [1, 0], [0, 1], [1, 1], [0, 0], [1, 0]]
const SAND = [[8, 0], [8, 1]]

const rngBase = mulberry32(101)
const GRID_CELLS = []
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const kind = classify(col + 0.5, row + 0.5)
    let set = WATER
    if (kind === 'mountain' || kind === 'downtown' || kind === 'stanley' || kind === 'south') set = GRASS
    else if (kind === 'granville' || kind === 'scienceworld') set = SAND
    const pick = set[Math.floor(rngBase() * set.length)]
    GRID_CELLS.push({ col, row, tile: pick })
  }
}

function scatterEllipse(r, count, seed, margin = 0.78) {
  const rng = mulberry32(seed)
  const pts = []
  for (let i = 0; i < count; i++) {
    const ang = rng() * Math.PI * 2
    const rad = Math.sqrt(rng()) * margin
    pts.push([(r.cx + Math.cos(ang) * r.rx * rad) * TS, (r.cy + Math.sin(ang) * r.ry * rad) * TS])
  }
  return pts
}

function scatterStrip(y0, y1, count, seed) {
  const rng = mulberry32(seed)
  const pts = []
  for (let i = 0; i < count; i++) {
    pts.push([rng() * MAP_W, (y0 + rng() * (y1 - y0)) * TS])
  }
  return pts
}

const TREES = [[14, 10], [15, 10], [16, 10], [17, 10], [19, 10], [14, 9], [16, 9]]
const ROCKS = [[7, 14], [8, 14], [6, 15], [9, 15], [7, 16], [8, 16]]
const FLOWERS = [[0, 7], [0, 9], [0, 12]]

const rngT = mulberry32(42)
const parkTrees = scatterEllipse(REGIONS.stanley, 20, 7).map(([x, y]) => ({
  x, y, sprite: TREES[Math.floor(rngT() * TREES.length)], s: 22 + rngT() * 10,
}))

const rngR = mulberry32(19)
const mountainRocks = scatterStrip(0, 1.6, 26, 3).map(([x, y]) => ({
  x, y, sprite: ROCKS[Math.floor(rngR() * ROCKS.length)], s: 16 + rngR() * 8,
}))
const mountainTrees = scatterStrip(0.2, 1.6, 14, 33).map(([x, y]) => ({
  x, y, sprite: TREES[3 + Math.floor(rngR() * 3)], s: 18 + rngR() * 8,
}))

const rngF = mulberry32(55)
const flowerPatches = [
  ...scatterEllipse(REGIONS.stanley, 6, 64, 0.6),
  ...scatterStrip(21.3, 23, 8, 65),
].map(([x, y]) => ({ x, y, sprite: FLOWERS[Math.floor(rngF() * FLOWERS.length)] }))

const rngH = mulberry32(77)
const COTTAGE = { roofL: [13, 21], roofR: [14, 21], wallL: [13, 22], wallR: [14, 22] }
const houses = [
  ...scatterEllipse(REGIONS.downtown, 9, 88, 0.72),
  ...scatterStrip(21.4, 22.6, 6, 89),
].map(([x, y]) => ({ x, y, s: 26 + rngH() * 6 }))

const STALLS = [[10, 1], [11, 1]]
const tents = scatterEllipse(REGIONS.granville, 4, 91, 0.55).map(([x, y], i) => ({
  x, y, sprite: STALLS[i % 2],
}))

function pathLine(x0, y0, x1, y1, seed, step = 1.15) {
  const rng = mulberry32(seed)
  const dist = Math.hypot(x1 - x0, y1 - y0)
  const n = Math.max(1, Math.round(dist / (step * TS)))
  const pts = []
  for (let i = 1; i < n; i++) {
    const t = i / n
    pts.push([
      x0 + (x1 - x0) * t + (rng() - 0.5) * 5,
      y0 + (y1 - y0) * t + (rng() - 0.5) * 5,
    ])
  }
  return pts
}

const PATH_TILE = [7, 0]
const paths = [
  ...pathLine(REGIONS.stanley.cx * TS, REGIONS.stanley.cy * TS, REGIONS.downtown.cx * TS, REGIONS.downtown.cy * TS, 12),
  ...pathLine(REGIONS.downtown.cx * TS, REGIONS.downtown.cy * TS, REGIONS.granville.cx * TS, REGIONS.granville.cy * TS, 13),
  ...pathLine(REGIONS.downtown.cx * TS, REGIONS.downtown.cy * TS, REGIONS.scienceworld.cx * TS, REGIONS.scienceworld.cy * TS, 14),
].map(([x, y]) => ({ x, y }))

function Sprite({ x, y, s = 20, col, row }) {
  return (
    <Tile
      col={col}
      row={row}
      className="tile-sprite"
      style={{ left: pctX(x), top: pctY(y), width: pctX(s), height: pctY(s) }}
    />
  )
}

export default function VancouverMap() {
  return (
    <div className="vancouver-map" role="img" aria-label="Stylized tile-art map of Vancouver, BC">
      <div className="map-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
        {GRID_CELLS.map((c, i) => (
          <Tile key={i} className="map-tile" col={c.tile[0]} row={c.tile[1]} />
        ))}
      </div>

      <div className="map-overlay">
        {paths.map((p, i) => (
          <Sprite key={`p${i}`} x={p.x} y={p.y} s={16} col={PATH_TILE[0]} row={PATH_TILE[1]} />
        ))}
        {mountainRocks.map((r, i) => (
          <Sprite key={`mr${i}`} x={r.x} y={r.y} s={r.s} col={r.sprite[0]} row={r.sprite[1]} />
        ))}
        {mountainTrees.map((r, i) => (
          <Sprite key={`mt${i}`} x={r.x} y={r.y} s={r.s} col={r.sprite[0]} row={r.sprite[1]} />
        ))}
        {flowerPatches.map((f, i) => (
          <Sprite key={`f${i}`} x={f.x} y={f.y} s={16} col={f.sprite[0]} row={f.sprite[1]} />
        ))}
        {houses.map((h, i) => (
          <div key={`h${i}`} style={{ position: 'absolute', left: pctX(h.x), top: pctY(h.y), width: pctX(h.s), transform: 'translate(-50%,-100%)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <Tile col={COTTAGE.roofL[0]} row={COTTAGE.roofL[1]} style={{ width: '100%', aspectRatio: '1' }} />
            <Tile col={COTTAGE.roofR[0]} row={COTTAGE.roofR[1]} style={{ width: '100%', aspectRatio: '1' }} />
            <Tile col={COTTAGE.wallL[0]} row={COTTAGE.wallL[1]} style={{ width: '100%', aspectRatio: '1' }} />
            <Tile col={COTTAGE.wallR[0]} row={COTTAGE.wallR[1]} style={{ width: '100%', aspectRatio: '1' }} />
          </div>
        ))}
        {tents.map((t, i) => (
          <Sprite key={`tn${i}`} x={t.x} y={t.y} s={17} col={t.sprite[0]} row={t.sprite[1]} />
        ))}
        {parkTrees.map((t, i) => (
          <Sprite key={`t${i}`} x={t.x} y={t.y} s={t.s} col={t.sprite[0]} row={t.sprite[1]} />
        ))}

        {/* Science World dome (hand-drawn — no direct tile equivalent) */}
        <svg
          style={{ position: 'absolute', left: pctX(REGIONS.scienceworld.cx * TS), top: pctY(REGIONS.scienceworld.cy * TS - 6), width: pctX(48), height: pctY(30), transform: 'translate(-50%,-70%)' }}
          viewBox="0 0 48 30"
        >
          <path d="M 6 26 A 18 18 0 0 1 42 26" fill="#e8e0c8" stroke="#4a2f10" strokeWidth="1.6" />
          <line x1="4" y1="26" x2="44" y2="26" stroke="#4a2f10" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="24" y1="9" x2="24" y2="26" stroke="#4a2f10" strokeWidth="1.2" />
          <line x1="14" y1="12" x2="14" y2="26" stroke="#4a2f10" strokeWidth="1.2" />
          <line x1="34" y1="12" x2="34" y2="26" stroke="#4a2f10" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  )
}
