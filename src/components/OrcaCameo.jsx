import { useEffect, useState } from 'react'

export default function OrcaCameo() {
  const [phase, setPhase] = useState('waiting')
  useEffect(() => {
    const delay = phase === 'waiting' ? 16000 : phase === 'surfacing' ? 9000 : 1700
    const timer = setTimeout(() => setPhase(phase === 'waiting' ? 'surfacing' : 'waiting'), delay)
    return () => clearTimeout(timer)
  }, [phase])
  if (phase === 'waiting') return null
  return <button className={`orca-cameo ${phase}`} aria-label="Make the orca jump" title="Was that a fin?"
    onClick={() => setPhase('jumping')}>
    <svg viewBox="0 0 64 56" shapeRendering="crispEdges" aria-hidden="true">
      <g className="orca-body">
        <path fill="#071b2b" stroke="#719ba8" strokeWidth="1" d="M7 29h5v-7h9v-5h7V6h4v6h4v7h11v4h8v5h4v8h-6v5H25v-3H14v-4H7z" />
        <path fill="#f6ead0" d="M27 34h27v4H27zm18-10h7v4h-7z" />
        <path fill="#b5d4d5" d="M49 24h3v2h-3z" />
        <path fill="#071b2b" d="M8 27H2v-6h4v3h8v9H7v5H2v-7h6zM31 37h8v9h-4v-5h-4z" />
      </g>
      <path className="orca-fin" fill="#132c3b" stroke="#9bbec5" strokeWidth="1" d="M21 38h18v-3h-5v-5h-3V17h-4v7h-3v9h-3z" />
      <path className="orca-splash" fill="#add4de" d="M9 42h42v2H9zm9 5h28v2H18zM8 35h3v4H8zm44-2h3v5h-3z" />
    </svg>
  </button>
}
