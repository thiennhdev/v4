import { projects, socials } from '../data/profile';
import { delay } from '../lib/delay';
import { ArrowUpRight, SocialIcon } from './Icons';
import { SectionHeader } from './SectionHeader';

type Props = { highlighted: string | null };

const flows: Record<string, string[]> = {
  rtc: ['Browser', 'WS gateway', 'Redis pub/sub', 'ion-sfu'],
  linkable: ['Team question', 'LLM agent', 'MCP tools', 'Metabase · ClickUp'],
};

export function Projects({ highlighted }: Props) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const github = socials.find((s) => s.key === 'github');

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeader eyebrow="Projects" title="Selected projects.">
          Systems I designed end-to-end, plus small open-source demos of the patterns I rely on at
          work.
        </SectionHeader>

        <div className="featured-grid">
          {featured.map((p, i) => (
            <article
              key={p.id}
              id={`project-${p.id}`}
              className={`project-feature reveal ${highlighted === p.id ? 'is-highlighted' : ''}`}
              style={delay(i * 90)}
            >
              <div className="project-feature-top">
                <p className="project-kind">
                  {p.kind}
                  {p.year && <span className="project-year">{p.year}</span>}
                </p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
              </div>

              {flows[p.id] && (
                <ol className="flow" aria-label="Architecture flow">
                  {flows[p.id].map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}

              {p.points && (
                <ul className="project-points">
                  {p.points.map((pt) => (
                    <li key={pt.slice(0, 24)}>{pt}</li>
                  ))}
                </ul>
              )}

              <ul className="chips chips-quiet" aria-label="Stack">
                {p.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="oss-head reveal">
          <h3>Open source</h3>
          {github && (
            <a href={github.url} target="_blank" rel="noreferrer" className="link-arrow">
              <SocialIcon name="github" size={16} />
              More on GitHub
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>

        <ul className="oss-grid">
          {others.map((p, i) => (
            <li
              key={p.id}
              id={`project-${p.id}`}
              className={`oss-card reveal ${highlighted === p.id ? 'is-highlighted' : ''}`}
              style={delay(i * 70)}
            >
              <a href={p.github ?? p.external} target="_blank" rel="noreferrer" className="oss-link">
                <span className="oss-top">
                  <SocialIcon name="github" size={18} />
                  <ArrowUpRight size={17} className="oss-arrow" />
                </span>
                <span className="oss-title">{p.title}</span>
                <span className="oss-desc">{p.description}</span>
                <span className="oss-stack">{p.stack.join(' · ')}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
