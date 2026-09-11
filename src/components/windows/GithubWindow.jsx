import { useEffect, useState } from 'react'
import { profile } from '../../data/content.js'

export default function GithubWindow() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/users/${profile.githubUser}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => { if (!cancelled) setData(json) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [])

  return (
    <div>
      <h3 className="win-heading">★ GITHUB — SCIENCE WORLD</h3>

      {!data && !error && <p className="loading-dots">Connecting to github.com</p>}
      {error && (
        <p>Couldn't reach the GitHub API right now. <a href={profile.github} target="_blank" rel="noreferrer">Visit the profile directly →</a></p>
      )}

      {data && (
        <>
          <div className="win-row">
            <div className="avatar-frame">
              <img src={data.avatar_url} alt={data.login} />
            </div>
            <div>
              <div style={{ color: 'var(--cyan)', fontSize: 19 }}>{data.name || data.login}</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 15 }}>@{data.login}</div>
            </div>
          </div>

          {data.bio && <p style={{ marginTop: 12 }}>{data.bio}</p>}

          <div className="gh-stats-row">
            <div><b>{data.public_repos}</b>repos</div>
            <div><b>{data.followers}</b>followers</div>
            <div><b>{data.following}</b>following</div>
          </div>
        </>
      )}

      <div style={{ marginTop: 12 }}>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">⌂ View full profile</a>
      </div>
    </div>
  )
}
