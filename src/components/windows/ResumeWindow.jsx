import { experience, education } from '../../data/content.js'
import { withBase } from '../../utils.js'

export default function ResumeWindow() {
  const pdf = withBase('resume.pdf')

  return (
    <div>
      <h3 className="win-heading">★ RESUME — CANADA PLACE</h3>

      <div style={{ marginBottom: 12 }}>
        <a className="btn" href={pdf} target="_blank" rel="noreferrer">▤ Open PDF</a>
        <a className="btn" href={pdf} download>⬇ Download</a>
      </div>

      <iframe className="pdf-embed" src={pdf} title="Resume PDF" />

      <h4 className="win-sub-heading">EDUCATION</h4>
      <div className="exp-item">
        <div className="exp-title">{education.school}</div>
        <div className="exp-meta">{education.degree} · {education.dates} · GPA {education.gpa}</div>
      </div>

      <h4 className="win-sub-heading">EXPERIENCE</h4>
      {experience.map((job) => (
        <div className="exp-item" key={job.org + job.dates}>
          <div className="exp-title">{job.role} — {job.org}</div>
          <div className="exp-meta">{job.location} · {job.dates}</div>
          <ul>
            {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
