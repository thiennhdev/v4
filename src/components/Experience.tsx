import { useRef, type KeyboardEvent } from 'react';
import { jobs } from '../data/profile';
import { ArrowUpRight, Trophy } from './Icons';
import { SectionHeader } from './SectionHeader';

type Props = { activeId: string; onSelect: (id: string) => void };

export function Experience({ activeId, onSelect }: Props) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(
    0,
    jobs.findIndex((j) => j.id === activeId),
  );
  const job = jobs[index];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % jobs.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index - 1 + jobs.length) % jobs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = jobs.length - 1;
    onSelect(jobs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeader eyebrow="Experience" title="Where I’ve shipped.">
          Three teams, one thread: owning the backend flows where money, rewards and real-time state
          have to stay consistent.
        </SectionHeader>

        <div className="xp reveal">
          <div className="xp-tabs" role="tablist" aria-label="Companies" onKeyDown={onKeyDown}>
            {jobs.map((j, i) => {
              const selected = j.id === job.id;
              return (
                <button
                  key={j.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${j.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${j.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`xp-tab ${selected ? 'is-selected' : ''}`}
                  onClick={() => onSelect(j.id)}
                >
                  <span className="xp-tab-company">
                    {j.company}
                    {j.end === 'Present' && <span className="tag-now">Now</span>}
                  </span>
                  <span className="xp-tab-date">
                    {j.start} — {j.end}
                  </span>
                </button>
              );
            })}
          </div>

          <article
            className="xp-panel"
            role="tabpanel"
            id={`panel-${job.id}`}
            aria-labelledby={`tab-${job.id}`}
            key={job.id}
          >
            <header className="xp-head">
              <h3>
                {job.role} <span className="xp-at">at</span>{' '}
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noreferrer" className="xp-company">
                    {job.company}
                    <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <span className="xp-company">{job.company}</span>
                )}
              </h3>
              <p className="xp-meta">
                <span>{job.team}</span>
                <span aria-hidden>·</span>
                <span>
                  {job.start} — {job.end}
                </span>
                <span aria-hidden>·</span>
                <span>{job.location}</span>
              </p>
            </header>

            <p className="xp-focus">{job.focus}</p>

            <dl className="xp-metrics">
              {job.metrics.map((m) => (
                <div key={m.label} className="xp-metric">
                  <dd>{m.value}</dd>
                  <dt>{m.label}</dt>
                </div>
              ))}
            </dl>

            {job.badge && (
              <p className="xp-badge">
                <Trophy size={16} />
                {job.badge}
              </p>
            )}

            <ul className="xp-bullets">
              {job.bullets.map((b) => (
                <li key={b.slice(0, 32)}>{b}</li>
              ))}
            </ul>

            <ul className="chips" aria-label="Stack">
              {job.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
