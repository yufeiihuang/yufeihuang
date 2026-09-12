import { useEffect, useRef, useState } from 'react'
import BootScreen from './components/BootScreen.jsx'
import CrtOverlay from './components/CrtOverlay.jsx'
import VancouverMap from './components/VancouverMap.jsx'
import MapAtmosphere from './components/MapAtmosphere.jsx'
import Landmark from './components/Landmark.jsx'
import LandmarkIcon from './components/LandmarkIcon.jsx'
import RetroWindow from './components/RetroWindow.jsx'
import AboutWindow from './components/windows/AboutWindow.jsx'
import ResumeWindow from './components/windows/ResumeWindow.jsx'
import ProjectsWindow from './components/windows/ProjectsWindow.jsx'
import SororaWindow from './components/windows/SororaWindow.jsx'
import ContactWindow from './components/windows/ContactWindow.jsx'
import { landmarks } from './data/landmarks.js'
import { profile } from './data/content.js'
import PassportWindow from './components/PassportWindow.jsx'
import NightLights from './components/NightLights.jsx'
import './App.css'

const CONTENT = { about: AboutWindow, resume: ResumeWindow, projects: ProjectsWindow, sorora: SororaWindow, contact: ContactWindow }

function readPreference(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export default function App() {
  const [night, setNight] = useState(() => readPreference('vancouver-night', false) === true)
  const [visited, setVisited] = useState(() => {
    const saved = readPreference('vancouver-passport', [])
    return Array.isArray(saved) ? landmarks.filter(l => saved.includes(l.id)).map(l => l.id) : []
  })
  useEffect(() => { try { localStorage.setItem('vancouver-night', JSON.stringify(night)) } catch {} }, [night])
  useEffect(() => { try { localStorage.setItem('vancouver-passport', JSON.stringify(visited)) } catch {} }, [visited])
  const passportComplete = visited.length === landmarks.length

  const [booted, setBooted] = useState(false)
  const [windows, setWindows] = useState([])
  const [focusedId, setFocusedId] = useState(null)
  const topZ = useRef(100)
  const openers = useRef({})

  const openLandmark = (id) => {
    if (landmarks.some(l => l.id === id)) setVisited(prev => prev.includes(id) ? prev : [...prev, id])
    const zIndex = ++topZ.current
    openers.current[id] = document.activeElement
    setWindows(prev => prev.some(w => w.id === id)
      ? prev.map(w => w.id === id ? { ...w, zIndex } : w)
      : [...prev, { id, zIndex, initial: { x: Math.max(16, (window.innerWidth - 560) / 2), y: Math.max(16, Math.min(110, window.innerHeight * 0.12)) } }])
    setFocusedId(id)
  }
  const focusWindow = (id) => {
    if (id === focusedId) return
    const zIndex = ++topZ.current
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex } : w))
    setFocusedId(id)
  }
  const closeWindow = (id) => {
    const remaining = windows.filter(w => w.id !== id)
    setWindows(remaining)
    setFocusedId(remaining.length ? remaining.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id : null)
    openers.current[id]?.focus()
  }

  if (!booted) return <div className="app-root"><BootScreen onFinish={() => setBooted(true)} /><CrtOverlay /></div>

  return (
    <div className={`app-root${night ? ' night-mode' : ''}`}>
      <header className="site-header">
        <a className="wordmark" href="#main" aria-label="Yufei Huang home">yh<span>✦</span></a>
        <nav aria-label="Portfolio navigation">{landmarks.map(l => <button key={l.id} onClick={() => openLandmark(l.id)}>{l.subtitle}</button>)}</nav>
        <button className="night-toggle" onClick={() => setNight(value => !value)} aria-pressed={night}
          aria-label={night ? 'Switch to day mode' : 'Switch to night mode'} title={night ? 'Bring back the daylight' : 'Click the star for Vancouver after dark'}>
          <span aria-hidden="true">{night ? '☾' : '✦'}</span><span>{night ? 'NIGHT' : 'DAY'}</span>
        </button>
        <span className="header-location"><span className="status-dot" /> VANCOUVER → NEW YORK</span>
      </header>
      <main id="main">
        <section className="map-stage" aria-label="Explore my portfolio">
          <div className="map-frame">
            <div className="map-artwork">
              <VancouverMap />
              <MapAtmosphere />
              {night && <NightLights />}
              <div className="map-pins">{landmarks.map(l => <Landmark key={l.id} landmark={l} onOpen={openLandmark} />)}</div>
            </div>
            <div className="hero-copy">
              <p className="eyebrow">LET ME SHOW YOU AROUND</p>
              <h1>Hi, I'm<br /><span>Yufei.</span></h1>
              <p className="hero-description">Computer science &amp; math at NYU.<br />Explore my hometown with me!</p>
              <button className="hero-cta" onClick={() => openLandmark('sorora')}>Explore my work <span aria-hidden="true">↗</span></button>
              <p className="explore-hint"><span aria-hidden="true">✧</span> Pick a place and get to know me.</p>
            </div>
            <span className="map-coordinate" aria-hidden="true">49°16′ N &nbsp; 123°07′ W</span>
          </div>
        </section>
        <section className="destination-list" aria-label="Portfolio destinations">
          {landmarks.map(l => <button key={l.id} className={l.featured ? 'destination featured' : 'destination'} onClick={() => openLandmark(l.id)}>
            <span className="destination-number">{l.number}</span><span><strong>{l.subtitle}</strong><small>{l.name}</small></span><span aria-hidden="true">↗</span>
          </button>)}
        </section>
      </main>
      <footer className="site-footer">
        <button className={`passport-toggle${passportComplete ? ' complete' : ''}`} onClick={() => openLandmark('passport')}>
          <span aria-hidden="true">{passportComplete ? '✦' : '▤'}</span> Hometown passport <span>{visited.length} / 5</span>
        </button>
        <div><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`mailto:${profile.email}`}>Say hello ↗</a></div>
      </footer>
      {windows.map(w => {
        if (w.id === 'passport') return <RetroWindow key={w.id} {...w} title="Hometown passport" icon="▤" focused={focusedId === w.id} onClose={closeWindow} onFocus={focusWindow}>
          <PassportWindow visited={visited} onExplore={openLandmark} onReset={() => setVisited([])} />
        </RetroWindow>
        const landmark = landmarks.find(l => l.id === w.id)
        const Content = CONTENT[w.id]
        return <RetroWindow key={w.id} {...w} title={landmark.windowTitle} icon={landmark.number} focused={focusedId === w.id} onClose={closeWindow} onFocus={focusWindow}><aside className="landmark-blurb" aria-label={`About ${landmark.name}`}>
          <LandmarkIcon id={landmark.id} />
          <div><p className="landmark-blurb-heading">A STOP IN MY HOMETOWN</p><h2>{landmark.name}</h2><p>{landmark.blurb}</p>
            {landmark.source && <a href={landmark.source} target="_blank" rel="noreferrer">Explore this place ↗</a>}
          </div>
        </aside><Content />{passportComplete && <button className="passport-unlocked" onClick={() => openLandmark('passport')}>✦ You've explored Vancouver! Open your passport →</button>}</RetroWindow>
      })}
      <CrtOverlay />
    </div>
  )
}
