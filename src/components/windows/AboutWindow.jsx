import { useState } from 'react'
import { profile } from '../../data/content.js'
import { withBase } from '../../utils.js'

function PixelAvatar() {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%">
      <rect width="16" height="16" fill="#241c3a" />
      <rect x="4" y="3" width="8" height="6" fill="#e8b98c" />
      <rect x="3" y="9" width="10" height="6" fill="#38f0e0" />
      <rect x="4" y="2" width="8" height="2" fill="#241111" />
      <rect x="3" y="3" width="1" height="4" fill="#241111" />
      <rect x="12" y="3" width="1" height="4" fill="#241111" />
    </svg>
  )
}

export default function AboutWindow() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div>
      <h3 className="win-heading">★ ABOUT ME</h3>
      <div className="win-row">
        <div className="avatar-frame">
          {imgFailed ? (
            <PixelAvatar />
          ) : (
            <img
              src={withBase('headshot.jpg')}
              alt={profile.name}
              onError={() => setImgFailed(true)}
            />
          )}
        </div>
        <div>
          <div style={{ color: 'var(--cyan)', fontSize: 19 }}>{profile.name}</div>
          <div style={{ color: 'var(--text-dim)', fontSize: 15 }}>{profile.tagline}</div>
        </div>
      </div>

      <p style={{ marginTop: 14 }}>{profile.bio}</p>

      <h4 className="win-sub-heading">SKILLZ</h4>
      <div className="tag-row">
        {profile.skills.map((s) => (
          <span className="tag" key={s}>{s}</span>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <a className="btn" href={`mailto:${profile.email}`}>✉ Email</a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">in LinkedIn</a>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">⌂ GitHub</a>
      </div>
    </div>
  )
}
