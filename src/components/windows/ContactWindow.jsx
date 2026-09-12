import { profile } from '../../data/content.js'

export default function ContactWindow() {
  return <div>
    <p className="eyebrow">CONTACT / LIONS GATE BRIDGE</p>
    <h2 className="win-heading">Let's connect.</h2>
    <p>Have a project in mind, a question about my work, or just want to say hello?</p>
    <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} ↗</a>
    <div className="contact-links"><a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
    <p className="win-footer-note">{profile.location}</p>
  </div>
}
