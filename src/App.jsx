import { useState } from 'react'
import BootScreen from './components/BootScreen.jsx'
import CrtOverlay from './components/CrtOverlay.jsx'
import VancouverMap from './components/VancouverMap.jsx'
import Landmark from './components/Landmark.jsx'
import RetroWindow from './components/RetroWindow.jsx'
import Taskbar from './components/Taskbar.jsx'
import AboutWindow from './components/windows/AboutWindow.jsx'
import ResumeWindow from './components/windows/ResumeWindow.jsx'
import GithubWindow from './components/windows/GithubWindow.jsx'
import ProjectsWindow from './components/windows/ProjectsWindow.jsx'
import { landmarks } from './data/landmarks.js'
import './App.css'

const WINDOW_CONFIG = {
  about: { icon: '🌲', Content: AboutWindow },
  resume: { icon: '🏙', Content: ResumeWindow },
  github: { icon: '🔮', Content: GithubWindow },
  projects: { icon: '🛒', Content: ProjectsWindow },
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [windows, setWindows] = useState([])
  const [focusedId, setFocusedId] = useState(null)
  const [topZ, setTopZ] = useState(1)

  const openLandmark = (id) => {
    setWindows((prev) => {
      if (prev.find((w) => w.id === id)) return prev
      const landmark = landmarks.find((l) => l.id === id)
      const offset = prev.length * 26
      return [
        ...prev,
        {
          id,
          title: landmark.windowTitle,
          zIndex: topZ + 1,
          initial: { x: 60 + offset, y: 40 + offset },
        },
      ]
    })
    setTopZ((z) => z + 1)
    setFocusedId(id)
  }

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
    setFocusedId((cur) => (cur === id ? null : cur))
  }

  const focusWindow = (id) => {
    setFocusedId(id)
    setTopZ((z) => {
      const nextZ = z + 1
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w)))
      return nextZ
    })
  }

  if (!booted) {
    return (
      <div className="app-root">
        <BootScreen onFinish={() => setBooted(true)} />
        <CrtOverlay />
      </div>
    )
  }

  return (
    <div className="app-root">
      <div className="desktop">
        <div className="map-stage">
          <div className="map-frame">
            <span className="map-title pixel-font">VANCOUVER, BC</span>
            <VancouverMap />
            {landmarks.map((l) => (
              <Landmark key={l.id} landmark={l} onOpen={openLandmark} />
            ))}
            <span className="map-hint">click a landmark to explore →</span>
          </div>

          {windows.map((w) => {
            const cfg = WINDOW_CONFIG[w.id]
            const Content = cfg.Content
            return (
              <RetroWindow
                key={w.id}
                id={w.id}
                title={w.title}
                icon={cfg.icon}
                initial={w.initial}
                zIndex={w.zIndex}
                focused={focusedId === w.id}
                onClose={closeWindow}
                onFocus={focusWindow}
              >
                <Content />
              </RetroWindow>
            )
          })}
        </div>

        <Taskbar
          openWindows={windows}
          focusedId={focusedId}
          onFocusWindow={focusWindow}
          onOpenLandmark={openLandmark}
        />
      </div>

      <CrtOverlay />
    </div>
  )
}
