import { landmarks } from '../data/landmarks.js'
import LandmarkIcon from './LandmarkIcon.jsx'

export default function PassportWindow({ visited, onExplore, onReset }) {
  const complete = visited.length === landmarks.length
  return <div className="passport-page">
    <p className="eyebrow">VANCOUVER, BC / EXPLORER'S EDITION</p>
    <h2 className="win-heading">Your hometown passport</h2>
    <p>Five places. Five little pieces of my story. Open each destination to collect its stamp.</p>
    <p className="passport-progress" role="status">{visited.length} of {landmarks.length} stamps collected</p>
    <div className="passport-stamps">{landmarks.map(landmark => {
      const collected = visited.includes(landmark.id)
      return <button key={landmark.id} className={`passport-stamp${collected ? ' collected' : ''}`}
        onClick={() => onExplore(landmark.id)} aria-label={`${landmark.name}: ${collected ? 'stamp collected' : 'not visited'}. Open ${landmark.subtitle}`}>
        <LandmarkIcon id={landmark.id} /><strong>{landmark.name}</strong><small>{collected ? '✓ VISITED' : 'WAITING TO EXPLORE'}</small>
      </button>
    })}</div>
    {visited.length > 0 && <button className="btn" onClick={onReset}>Start a new passport</button>}
    {complete && <div className="passport-award"><span aria-hidden="true">✦</span><strong>You've explored Vancouver!</strong><p>Every stop, stamped. Thanks for exploring my hometown with me.</p><small>VANCOUVER EXPLORER · 5 / 5</small></div>}
  </div>
}
