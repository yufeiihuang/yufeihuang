import { projects } from '../../data/content.js'

export default function SororaWindow() {
  const project = projects.find(p => p.name === 'Sorora')
  return <div>
    <p className="eyebrow">FEATURED PROJECT / GRANVILLE ISLAND</p>
    <h2 className="sorora-heading">Sorora<span>✦</span></h2>
    <p className="project-stack">{project.stack} · {project.dates}</p>
    <p>{project.description}</p>
    <h3 className="win-sub-heading">HOW IT WORKS</h3>
    <ol className="project-steps"><li>Match mutual first choices.</li><li>Find stable pairings with deferred acceptance.</li><li>Export the results to Excel.</li></ol>
    <a className="btn" href={project.link} target="_blank" rel="noreferrer">Visit Sorora ↗</a>
  </div>
}
