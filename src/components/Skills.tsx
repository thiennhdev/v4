import { useMemo, useState } from 'react';
import { findContext, levelLabel, skillGroups, type Level, type Skill } from '../data/profile';
import { ArrowRight, Briefcase, Folder } from './Icons';
import { SectionHeader } from './SectionHeader';

type Props = { onOpenContext: (id: string) => void };

type Selection = { group: string; name: string };

const levels: Level[] = ['core', 'strong', 'familiar'];

function LevelDot({ level }: { level: Level }) {
  return <span className={`lvl-dot lvl-${level}`} aria-hidden />;
}

function SkillDetail({ skill, onOpenContext }: { skill: Skill; onOpenContext: (id: string) => void }) {
  const contexts = (skill.usedIn ?? []).map(findContext).filter((c) => c !== undefined);

  return (
    <div className="skill-detail" aria-live="polite">
      <p className="skill-detail-level">
        <LevelDot level={skill.level} />
        {levelLabel[skill.level]}
      </p>
      <p className="skill-detail-name">{skill.name}</p>
      {skill.note && <p className="skill-detail-note">{skill.note}</p>}

      {contexts.length > 0 ? (
        <>
          <p className="skill-detail-label">Where I’ve used it</p>
          <ul className="skill-detail-list">
            {contexts.map((c) => (
              <li key={c.id}>
                <button onClick={() => onOpenContext(c.id)}>
                  {c.kind === 'job' ? <Briefcase size={16} /> : <Folder size={16} />}
                  <span>{c.title}</span>
                  <ArrowRight size={15} className="skill-detail-go" />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        !skill.note && <p className="skill-detail-note">Part of my everyday toolkit — listed on my CV.</p>
      )}
    </div>
  );
}

export function Skills({ onOpenContext }: Props) {
  const [sel, setSel] = useState<Selection>({ group: 'languages', name: 'Go' });

  const selected = useMemo(() => {
    const g = skillGroups.find((x) => x.id === sel.group);
    return g?.skills.find((s) => s.name === sel.name) ?? skillGroups[0].skills[0];
  }, [sel]);

  const counts = useMemo(() => {
    const all = skillGroups.flatMap((g) => g.skills);
    return { total: all.length, core: all.filter((s) => s.level === 'core').length };
  }, []);

  const coreStack = ['Go', 'Java', 'PostgreSQL', 'Redis', 'Kafka', 'WebSockets', 'Docker'];

  return (
    <section className="section section-band" id="skills">
      <div className="container">
        <SectionHeader eyebrow="Skills" title="A toolkit built around reliable backends.">
          {counts.total} tools across {skillGroups.length} areas — {counts.core} of them I reach for
          every day. Pick any skill to see where I’ve actually used it.
        </SectionHeader>

        <div className="skills-layout">
          <aside className="skills-aside reveal">
            <div className="skills-aside-sticky">
              <div className="core-stack">
                <p className="core-stack-label">Daily drivers</p>
                <p className="core-stack-list">
                  {coreStack.map((s, i) => (
                    <span key={s}>
                      {s}
                      {i < coreStack.length - 1 && <span className="core-sep"> / </span>}
                    </span>
                  ))}
                </p>
              </div>

              <ul className="legend" aria-label="Legend">
                {levels.map((l) => (
                  <li key={l}>
                    <LevelDot level={l} />
                    {levelLabel[l].split(' — ')[0]}
                  </li>
                ))}
              </ul>

              <div className="skill-detail-desktop">
                <SkillDetail skill={selected} onOpenContext={onOpenContext} />
              </div>
            </div>
          </aside>

          <div className="skill-groups">
            {skillGroups.map((g) => (
              <div key={g.id} className="skill-group reveal">
                <div className="skill-group-head">
                  <h3>{g.title}</h3>
                  <p>{g.blurb}</p>
                </div>
                <ul className="skill-chips">
                  {g.skills.map((s) => {
                    const isSel = sel.group === g.id && sel.name === s.name;
                    return (
                      <li key={s.name}>
                        <button
                          className={`skill-chip lvl-chip-${s.level} ${isSel ? 'is-selected' : ''}`}
                          aria-pressed={isSel}
                          onClick={() => setSel({ group: g.id, name: s.name })}
                        >
                          <LevelDot level={s.level} />
                          {s.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {sel.group === g.id && (
                  <div className="skill-detail-inline">
                    <SkillDetail skill={selected} onOpenContext={onOpenContext} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
