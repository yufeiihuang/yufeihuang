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

function RoundedBlock({ x, y, w, h, r, fill, keyPrefix }) {
  return (
    <>
      <rect key={`${keyPrefix}-a`} x={x + r} y={y} width={w - 2 * r} height={h} fill={fill} />
      <rect key={`${keyPrefix}-b`} x={x} y={y + r} width={w} height={h - 2 * r} fill={fill} />
    </>
  )
}

function Peak({ cx, baseY, width, height, bodyColor, midColor, snowColor }) {
  const steps = 6
  const rects = []
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const w = width * (1 - t * 0.92)
    const y = baseY - height * t
    const stepH = height / steps + 1
    let fill = bodyColor
    if (i >= steps - 2) fill = snowColor
    else if (i >= steps - 4) fill = midColor
    rects.push(
      <rect key={i} x={cx - w / 2} y={y - stepH} width={w} height={stepH} fill={fill} />
    )
  }
  return <>{rects}</>
}

const PEAKS = [
  { cx: 20, base: 30, w: 34, h: 24 },
  { cx: 56, base: 30, w: 28, h: 16 },
  { cx: 90, base: 30, w: 38, h: 28 },
  { cx: 128, base: 30, w: 26, h: 15 },
  { cx: 160, base: 30, w: 34, h: 23 },
  { cx: 196, base: 30, w: 28, h: 16 },
  { cx: 230, base: 30, w: 38, h: 27 },
  { cx: 266, base: 30, w: 28, h: 15 },
  { cx: 300, base: 30, w: 32, h: 21 },
]

const rngWater = mulberry32(7)
const WATER_SPARKLES = Array.from({ length: 70 }, () => ({
  x: rngWater() * 320,
  y: 30 + rngWater() * 150,
  s: rngWater() > 0.7 ? 4 : 2,
}))

const rngTree = mulberry32(42)
const PARK_TREES = Array.from({ length: 22 }, () => {
  const x = 24 + rngTree() * 76
  const y = 46 + rngTree() * 44
  const s = 5 + Math.floor(rngTree() * 4)
  const shade = rngTree() > 0.5 ? 'var(--park-light)' : 'var(--park)'
  return { x, y, s, shade }
})

const rngWin = mulberry32(99)
const DOWNTOWN_WINDOWS = Array.from({ length: 60 }, () => ({
  x: 116 + Math.floor(rngWin() * 34) * 4,
  y: 52 + Math.floor(rngWin() * 18) * 4,
  lit: rngWin() > 0.45,
}))

const rngTower = mulberry32(15)
const SKYLINE = [128, 148, 168, 196, 216, 236].map((x) => ({
  x,
  h: 8 + Math.floor(rngTower() * 22),
  w: 10 + Math.floor(rngTower() * 6),
}))

const rngHouse = mulberry32(3)
const SOUTH_BLOCKS = Array.from({ length: 26 }, () => ({
  x: 8 + rngHouse() * 300,
  y: 166 + rngHouse() * 20,
  w: 8 + rngHouse() * 10,
  h: 5 + rngHouse() * 5,
  shade: rngHouse() > 0.5 ? 'var(--land-alt)' : 'var(--park-dark)',
}))

export default function VancouverMap() {
  return (
    <svg
      className="vancouver-map"
      viewBox="0 0 320 192"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pixel-art map of Vancouver, BC"
    >
      {/* ---- water ---- */}
      <rect x="0" y="0" width="320" height="192" fill="var(--water-deep)" />
      <rect x="0" y="26" width="320" height="166" fill="var(--water-mid)" opacity="0.35" />
      {WATER_SPARKLES.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.s} height={s.s} fill="var(--water-light)" opacity="0.55" />
      ))}
      <rect x="0" y="60" width="320" height="2" fill="var(--water-light)" opacity="0.25" />
      <rect x="0" y="118" width="320" height="2" fill="var(--water-light)" opacity="0.25" />

      {/* ---- North Shore mountains ---- */}
      <rect x="0" y="0" width="320" height="6" fill="var(--mountain)" />
      {PEAKS.map((p, i) => (
        <Peak
          key={i}
          cx={p.cx}
          baseY={p.base}
          width={p.w}
          height={p.h}
          bodyColor="var(--mountain)"
          midColor="var(--mountain-mid)"
          snowColor="var(--mountain-snow)"
        />
      ))}
      <rect x="0" y="28" width="320" height="3" fill="var(--park-dark)" opacity="0.5" />

      {/* ---- Lions Gate style bridge ---- */}
      <rect x="70" y="0" width="4" height="46" fill="var(--bridge)" />
      <rect x="63" y="6" width="18" height="2" fill="var(--bridge)" />
      <rect x="63" y="20" width="18" height="2" fill="var(--bridge)" />
      <rect x="63" y="34" width="18" height="2" fill="var(--bridge)" />
      <rect x="60" y="0" width="3" height="10" fill="var(--mountain)" />
      <rect x="81" y="0" width="3" height="10" fill="var(--mountain)" />

      {/* ---- Stanley Park (rounded + sand trim) ---- */}
      <RoundedBlock keyPrefix="park-sand" x={12} y={30} w={104} h={70} r={16} fill="var(--sand)" />
      <RoundedBlock keyPrefix="park" x={16} y={34} w={94} h={62} r={14} fill="var(--park)" />
      {PARK_TREES.map((t, i) => (
        <rect key={i} x={t.x} y={t.y} width={t.s} height={t.s} fill={t.shade} />
      ))}

      {/* ---- Downtown peninsula (rounded + sand trim + skyline) ---- */}
      <RoundedBlock keyPrefix="dt-sand" x={108} y={44} w={152} h={88} r={10} fill="var(--sand)" />
      <RoundedBlock keyPrefix="dt" x={112} y={48} w={144} h={80} r={8} fill="var(--map-downtown-dark)" />

      {SKYLINE.map((b, i) => (
        <rect key={i} x={b.x} y={48 - b.h} width={b.w} height={b.h + 4} fill={i % 2 === 0 ? 'var(--map-downtown)' : 'var(--map-downtown-alt)'} />
      ))}
      {DOWNTOWN_WINDOWS.map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width="2" height="2" fill={w.lit ? 'var(--window-lit)' : 'var(--map-downtown-dark)'} opacity={w.lit ? 0.95 : 0.4} />
      ))}

      {/* landmark tower (Harbour Centre style) */}
      <rect x="182" y="20" width="6" height="30" fill="var(--map-downtown-alt)" />
      <rect x="177" y="16" width="16" height="6" fill="var(--window-lit)" />
      <rect x="184" y="10" width="2" height="8" fill="var(--map-downtown-alt)" />

      {/* Canada Place pier + sails */}
      <rect x="140" y="30" width="40" height="18" fill="var(--map-pier)" />
      <rect x="146" y="20" width="6" height="12" fill="#f4f4f8" />
      <rect x="157" y="17" width="6" height="15" fill="#f4f4f8" />
      <rect x="168" y="20" width="6" height="12" fill="#f4f4f8" />

      {/* Gastown warm accent */}
      <rect x="230" y="48" width="26" height="26" fill="var(--island)" opacity="0.28" />

      {/* ---- Granville Island ---- */}
      <RoundedBlock keyPrefix="gi-sand" x={140} y={122} w={56} h={26} r={8} fill="var(--sand)" />
      <RoundedBlock keyPrefix="gi" x={144} y={126} w={48} h={18} r={6} fill="var(--island)" />
      <rect x="150" y="130" width="10" height="8" fill="var(--island-roof)" />
      <rect x="164" y="130" width="10" height="8" fill="var(--map-downtown-dark)" />
      <rect x="178" y="130" width="8" height="8" fill="var(--island-roof)" />
      <rect x="130" y="150" width="6" height="3" fill="var(--sand)" opacity="0.8" />
      <rect x="200" y="146" width="6" height="3" fill="var(--sand)" opacity="0.8" />

      {/* ---- Science World dome ---- */}
      <RoundedBlock keyPrefix="sw-sand" x={234} y={122} w={44} h={26} r={8} fill="var(--sand)" />
      <RoundedBlock keyPrefix="sw" x={238} y={126} w={36} h={18} r={6} fill="var(--island)" />
      <rect x="248" y="112" width="20" height="4" fill="var(--mountain-snow)" opacity="0.9" />
      <rect x="251" y="106" width="14" height="4" fill="var(--mountain-snow)" opacity="0.85" />
      <rect x="254" y="100" width="8" height="4" fill="var(--mountain-snow)" opacity="0.8" />
      <rect x="257" y="95" width="2" height="4" fill="var(--window-lit)" />

      {/* ---- South Vancouver ---- */}
      <rect x="0" y="162" width="320" height="30" fill="var(--land)" />
      <rect x="0" y="162" width="320" height="3" fill="var(--sand)" opacity="0.6" />
      {SOUTH_BLOCKS.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.shade} />
      ))}
    </svg>
  )
}
