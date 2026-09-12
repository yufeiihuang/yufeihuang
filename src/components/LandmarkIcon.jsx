// Small, grid-aligned sprites keep the map controls crisp at every size.
const ART = {
  about: <>
    <path fill="#203c34" d="M3 25h26v4H3z" />
    <path fill="#deb888" d="M9 19h4v8H9zm12 0h3v7h-3z" />
    <path fill="#315d47" d="M9 2h4v4h3v4h3v4h-3v3h4v5H2v-5h4v-3H3v-4h3V6h3z" />
    <path fill="#95bd7b" d="M9 4h3v4H9zm-3 6h6v3H6zm-2 7h8v3H4z" />
    <path fill="#54865b" d="M21 7h3v4h3v4h3v4h-3v4H16v-4h2v-4h-2v-4h5z" />
    <path fill="#bad295" d="M21 9h2v5h-4v3h4v3h-5v-3h1v-5h2z" />
  </>,
  resume: <>
    <path fill="#628d99" d="M1 27h30v3H1z" />
    <path fill="#dfbd8f" d="M2 21h28v6H2z" />
    <path fill="#244556" d="M4 23h3v3H4zm5 0h3v3H9zm5 0h3v3h-3zm5 0h3v3h-3zm5 0h3v3h-3z" />
    <path fill="#faf0d4" d="M3 19v-4h2v-4h2V6h2v13zm10 0v-4h2v-4h2V3h2v16zm10 0v-4h2v-4h2V6h2v13z" />
    <path fill="#9fbdba" d="M9 6h1v9h2v4H9zm10-3h1v12h2v4h-3zm10 3h1v13h-1z" />
    <path fill="#fff7df" d="M2 20h28v2H2z" />
  </>,
  sorora: <>
    <path fill="#416f80" d="M2 39h60v6H2z" />
    <path fill="#8fc3c6" d="M4 43h10v1H4zm17-1h12v1H21zm21 2h16v1H42z" />
    <path fill="#bca782" d="M3 36h57v4H3z" />
    <path fill="#a94135" d="M5 22h51v14H5z" />
    <path fill="#d86b49" d="M7 24h47v10H7z" />
    <path fill="#385f55" d="M3 21h3v-4h4v-4h12v4h4v4h4v3H3zm24 0h4v-4h4v-4h12v4h4v4h7v3H27z" />
    <path fill="#91a38a" d="M10 14h12v2H10zm25 0h12v2H35z" />
    <path fill="#274d47" d="M19 20h3v-4h3v-4h3V8h8v4h3v4h3v4h3v4H19z" />
    <path fill="#f0d7a7" d="M24 20h16v16H24z" />
    <path fill="#9f4537" d="M26 21h12v2H26z" />
    <path fill="#183b46" d="M8 26h5v7H8zm8 0h5v7h-5zm11 3h10v7H27zm16-3h5v7h-5zm8 0h3v7h-3z" />
    <path fill="#e7c789" d="M10 27h1v4h-1zm8 0h1v4h-1zm27 0h1v4h-1z" />
    <path fill="#f5dfb7" d="M13 23h39v6H13z" />
    <text x="32.5" y="27.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="4.3" fill="#7e352d">PUBLIC MARKET</text>
    <path fill="#ebc684" d="M57 30h4v5h-4z" />
    <path fill="#567c59" d="M56 27h6v4h-6z" />
  </>,
  projects: <>
    <path fill="#70949b" d="M2 13h8v15H2z" />
    <path fill="#d6c19e" d="M12 6h9v22h-9z" />
    <path fill="#f3dfb8" d="M15 2h3v4h-3z" />
    <path fill="#608189" d="M23 10h7v18h-7z" />
    <path fill="#f2d4a0" d="M4 16h2v2H4zm0 5h2v2H4zm21-8h2v2h-2zm0 5h2v2h-2zm0 5h2v2h-2z" />
    <path fill="#375463" d="M14 9h2v3h-2zm4 0h2v3h-2zm-4 5h2v3h-2zm4 0h2v3h-2zm-4 5h2v3h-2zm4 0h2v3h-2z" />
    <path fill="#f5dbaf" d="M1 28h30v2H1z" />
  </>,
  contact: <>
    <path fill="#739ba6" d="M1 27h30v3H1z" />
    <path fill="#b1c092" d="M7 5h3v22H7zm15 0h3v22h-3z" />
    <path fill="#e5d4a7" d="M1 21h30v3H1z" />
    <path fill="#95b583" d="M1 17h2v-3h2v-3h2V8h3v3h2v3h3v2h3v-2h3v-3h1V8h3v3h2v3h2v3h2v2h-4v-3h-3v-3h-2v3h-3v2h-6v-2h-3v-3H8v3H5v3H1z" />
    <path fill="#cbd4a9" d="M4 17h1v4H4zm8-1h1v5h-1zm6 2h1v3h-1zm9-1h1v4h-1zM7 4h3v2H7zm15 0h3v2h-3z" />
  </>,
}

export default function LandmarkIcon({ id }) {
  return <svg className="landmark-icon" viewBox={id === 'sorora' ? '0 0 64 48' : '0 0 32 32'} aria-hidden="true" focusable="false" shapeRendering="crispEdges">{ART[id]}</svg>
}
