export function EasterEggIcon() {
  return <svg width="24" height="28" viewBox="0 0 24 28" shapeRendering="crispEdges" aria-hidden="true">
    <path fill="#f1d8ac" d="M9 2h6v3h3v4h3v12h-3v4H6v-4H3V9h3V5h3z" />
    <path fill="#b1c999" d="M6 9h3v3h6V9h3v3h3v3h-6v-3H9v3H3v-3h3z" />
    <path fill="#c47e72" d="M3 18h6v3h6v-3h6v3h-3v3H6v-3H3z" />
    <path fill="#fff5dc" d="M9 5h3v3H9z" />
  </svg>
}

const EGGS = [
  ['Cloud cursor', 'Double-click with your mouse to make the cloud cursor rain for a couple of seconds. The shower follows you.'],
  ['Vancouver weather', 'Type rain on your keyboard while exploring the map to start a six-second shower.'],
  ['Night mode', 'Click the star in the header to see Vancouver after dark, with glowing city windows and tiny boat lights. Click the moon to bring back daylight.'],
  ['Hometown passport', 'Visit About me, Résumé, Sorora, Projects, and Contact to collect five stamps. Open your passport at the bottom to see your progress and unlock the Vancouver explorer badge.'],
  ['Seagull thief', 'Keep a window open and focused for about nine seconds. A little gull borrows the × and brings it back a second later. It visits once per opened window.'],
  ['Orca cameo', 'Watch the bay for a fin: it surfaces periodically. Click or tap it before it disappears to make the orca jump.'],
  ['Secret ferry', 'Click or tap any of the three moving pixel boats for a ride to a random portfolio destination.'],
]

export default function EasterEggsWindow() {
  return <div className="easter-eggs-guide">
    <p className="eyebrow">A FEW SECRETS AROUND TOWN</p>
    <h2 className="win-heading">The Easter egg guide</h2>
    <p>Seven little things to discover while you explore.</p>
    <ol>{EGGS.map(([name, description], index) => <li key={name}>
      <span className="egg-number" aria-hidden="true">0{index + 1}</span>
      <div><h3>{name}</h3><p>{description}</p></div>
    </li>)}</ol>
  </div>
}
