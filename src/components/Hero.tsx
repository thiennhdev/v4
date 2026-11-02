import { delay } from '../lib/delay';
import portrait from '../assets/portrait.webp';
import { profile, socials, stats } from '../data/profile';
import { ArrowRight, Download, Pin, SocialIcon } from './Icons';

/** Renders `*text*` segments as emphasised spans. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}
    </>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <a className="status-pill reveal" href="#experience">
            <span className="status-dot" aria-hidden />
            <span>
              Currently <strong>{profile.current.role}</strong> at{' '}
              <strong>{profile.current.company}</strong>
            </span>
          </a>

          <p className="hero-kicker reveal" style={delay(60)}>
            <img className="hero-avatar" src={portrait} alt="" width={44} height={44} />
            <span>
              {profile.shortName} — {profile.role}
            </span>
          </p>

          <h1 className="hero-title reveal" style={delay(120)}>
            <Emphasis text="I build backend systems that *stay correct* under load." />
          </h1>

          <p className="hero-intro reveal" style={delay(180)}>
            {profile.intro}
          </p>

          <div className="hero-actions reveal" style={delay(240)}>
            <a className="btn btn-primary" href={profile.resume} download>
              <Download size={17} />
              Download CV
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
              <ArrowRight size={17} />
            </a>
          </div>

          <ul className="hero-socials reveal" style={delay(300)}>
            {socials.map((s) => (
              <li key={s.key}>
                <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                  <SocialIcon name={s.key} size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero-portrait reveal" style={delay(160)}>
          <div className="hero-portrait-frame">
            <img
              src={portrait}
              alt={`Portrait of ${profile.shortName}`}
              width={640}
              height={800}
              fetchPriority="high"
            />
          </div>
          <figcaption>
            <Pin size={15} />
            {profile.location}
            <span className="dot-sep" aria-hidden>
              ·
            </span>
            {profile.timezone}
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <dl className="stats">
          {stats.map((s, i) => (
            <div className="stat reveal" key={s.label} style={delay(i * 70)}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
