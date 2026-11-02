import { delay } from '../lib/delay';
import awardImg from '../assets/award-2025.webp';
import { award, education, profile } from '../data/profile';
import { SectionHeader } from './SectionHeader';
import { Trophy } from './Icons';

const facts = [
  { k: 'Based in', v: profile.location },
  { k: 'Currently', v: `${profile.current.role} · ${profile.current.company}` },
  { k: 'Focus', v: 'Distributed systems, real-time, data consistency' },
  { k: 'Education', v: `${education.degree} · ${education.school}` },
];

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeader eyebrow="About" title="Engineering for correctness, not just throughput." />

        <div className="about-grid">
          <div className="about-copy reveal">
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}

            <dl className="facts">
              {facts.map((f) => (
                <div key={f.k} className="fact">
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="award-card reveal" style={delay(120)}>
            <div className="award-media">
              <img src={awardImg} alt={`${award.title} award trophy`} width={600} height={800} loading="lazy" />
            </div>
            <figcaption>
              <span className="award-icon" aria-hidden>
                <Trophy size={18} />
              </span>
              <div>
                <p className="award-title">{award.title}</p>
                <p className="award-meta">
                  {award.issuer} · {award.description}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
