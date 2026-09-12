import { projects } from '../../data/content.js'

export default function ProjectsWindow() {
  return (
    <div>
      <h3 className="win-heading">★ PROJECTS — DOWNTOWN</h3>
      {projects.map((p) => (
        <div className="project-card" key={p.name}>
          <div className="project-name">{p.name}</div>
          <div className="project-stack">{p.stack} · {p.dates}</div>
          <p style={{ margin: '6px 0' }}>{p.description}</p>
          {p.link && (
            <a className="btn" href={p.link} target="_blank" rel="noreferrer">
              ↗ {p.linkLabel}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
