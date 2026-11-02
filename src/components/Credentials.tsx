import { certifications, education } from '../data/profile';
import { delay } from '../lib/delay';
import { Badge, Cap } from './Icons';

export function Credentials() {
  return (
    <section className="section section-tight" id="credentials" aria-label="Education and certifications">
      <div className="container cred-grid">
        <div className="cred-card reveal">
          <p className="cred-label">
            <Cap size={17} />
            Education
          </p>
          <h3 className="cred-title">{education.school}</h3>
          <p className="cred-sub">
            {education.degree} <span aria-hidden>·</span> {education.period}
          </p>
          <p className="cred-small">Relevant coursework</p>
          <ul className="chips chips-quiet">
            {education.coursework.map((c) => (
              <li key={c} className="chip">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="cred-card reveal" style={delay(100)}>
          <p className="cred-label">
            <Badge size={17} />
            Certifications
          </p>
          <ul className="cert-list">
            {certifications.map((c) => (
              <li key={c.name}>
                <span className="cert-name">{c.name}</span>
                {c.issuer && <span className="cert-issuer">{c.issuer}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
