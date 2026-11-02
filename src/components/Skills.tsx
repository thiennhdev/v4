import { useMemo, useState } from 'react';
import { findContext, levelLabel, skillGroups, type Level, type Skill } from '../data/profile';
import { brandIcons } from '../lib/brandIcons';
import { BrandMark } from './BrandMark';
import { ArrowRight } from './Icons';
import { SectionHeader } from './SectionHeader';

type Props = { onOpenContext: (id: string) => void };
type Selection = { group: string; name: string };
type Entry = Skill & { group: string; groupTitle: string };

const LEVELS: Level[] = ['core', 'strong', 'familiar'];
const RANK: Record<Level, number> = { core: 0, strong: 1, familiar: 2 };

/** The everyday stack, shown as tiles above the explorer. */
const CORE: { name: string; tagline: string }[] = [
  { name: 'Go', tagline: 'Main language' },
  { name: 'Java', tagline: 'Spring services' },
  { name: 'PostgreSQL', tagline: 'Primary datastore' },
  { name: 'Redis', tagline: 'Cache · pub/sub' },
  { name: 'Kafka', tagline: 'Event streaming' },
  { name: 'Docker', tagline: 'Containers' },
];

const ALL: Entry[] = skillGroups.flatMap((g) =>
  g.skills.map((s) => ({ ...s, group: g.id, groupTitle: g.title })),
);

function find(name: string) {
  return ALL.find((s) => s.name === name);
}

/** Skills that share the most jobs/projects with the given one. */
function relatedTo(skill: Entry): Entry[] {
  const used = new Set(skill.usedIn ?? []);
  if (used.size === 0) return [];
  return ALL.filter((o) => o.name !== skill.name)
    .map((o) => ({ o, n: (o.usedIn ?? []).filter((u) => used.has(u)).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n || RANK[a.o.level] - RANK[b.o.level])
    .slice(0, 5)
    .map((x) => x.o);
}

function Meter({ level }: { level: Level }) {
  const filled = 3 - RANK[level];
  return (
    <span className={`meter meter-${level}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <i key={i} className={i < filled ? 'on' : ''} />
      ))}
    </span>
  );
}

function SkillLogo({ name, size = 22 }: { name: string; size?: number }) {
  const icon = brandIcons[name];
  if (icon) return <BrandMark icon={icon} size={size} />;
  const initials = name
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return <span className="logo-initials">{initials}</span>;
}

function Inspector({
  skill,
  onOpenContext,
  onSelect,
}: {
  skill: Entry;
  onOpenContext: (id: string) => void;
  onSelect: (s: Entry) => void;
}) {
  const contexts = (skill.usedIn ?? []).map(findContext).filter((c) => c !== undefined);
  const related = relatedTo(skill);

  return (
    <div className="inspector" aria-live="polite">
      <div className="inspector-top">
        <span className="inspector-logo">
          <SkillLogo name={skill.name} size={26} />
        </span>
        <div>
          <p className="inspector-group">{skill.groupTitle}</p>
          <p className="inspector-name">{skill.name}</p>
        </div>
      </div>

      <p className="inspector-level">
        <Meter level={skill.level} />
        {levelLabel[skill.level]}
      </p>

      {skill.note && <p className="inspector-note">{skill.note}</p>}

      {contexts.length > 0 ? (
        <>
          <p className="inspector-label">Where I’ve used it</p>
          <ul className="inspector-list">
            {contexts.map((c) => (
              <li key={c.id}>
                <button onClick={() => onOpenContext(c.id)}>
                  <span className={`ctx-kind ctx-${c.kind}`}>{c.kind === 'job' ? 'Work' : 'Project'}</span>
                  <span className="ctx-title">{c.title}</span>
                  <span className="ctx-meta">{c.meta}</span>
                  <ArrowRight size={14} className="ctx-go" />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        !skill.note && <p className="inspector-note">Part of my everyday toolkit — listed on my CV.</p>
      )}

      {related.length > 0 && (
        <>
          <p className="inspector-label">Often paired with</p>
          <ul className="inspector-related">
            {related.map((r) => (
              <li key={r.name}>
                <button onClick={() => onSelect(r)}>{r.name}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function Skills({ onOpenContext }: Props) {
  const [sel, setSel] = useState<Selection>({ group: 'languages', name: 'Go' });

  const selected = useMemo(
    () => ALL.find((s) => s.group === sel.group && s.name === sel.name) ?? ALL[0],
    [sel],
  );

  const total = ALL.length;
  const coreCount = ALL.filter((s) => s.level === 'core').length;

  const select = (s: Entry, scroll = false) => {
    setSel({ group: s.group, name: s.name });
    // On narrow screens the detail card renders under the skill's group.
    if (scroll && window.matchMedia('(max-width: 980px)').matches) {
      window.setTimeout(() => {
        document
          .querySelector('.skill-detail-inline')
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };

  const inspector = (
    <Inspector skill={selected} onOpenContext={onOpenContext} onSelect={(s) => select(s, true)} />
  );

  return (
    <section className="section section-band" id="skills">
      <div className="container">
        <SectionHeader eyebrow="Skills" title="A toolkit built around reliable backends.">
          {total} tools across {skillGroups.length} areas, {coreCount} of which I use every day.
          Select any of them to see where I’ve put it to work.
        </SectionHeader>

        <div className="core-grid reveal" role="list" aria-label="Core stack">
          {CORE.map((c) => {
            const s = find(c.name);
            if (!s) return null;
            const isSel = selected.name === s.name;
            return (
              <button
                key={c.name}
                role="listitem"
                className={`core-tile ${isSel ? 'is-selected' : ''}`}
                aria-pressed={isSel}
                onClick={() => select(s, true)}
              >
                <span className="core-logo">
                  <SkillLogo name={s.name} size={26} />
                </span>
                <span className="core-name">{s.name}</span>
                <span className="core-tagline">{c.tagline}</span>
              </button>
            );
          })}
        </div>

        <div className="skills-layout">
          <div className="skill-groups">
            {skillGroups.map((g, gi) => (
              <div key={g.id} className="skill-group reveal">
                <div className="skill-group-head">
                  <p className="skill-group-index">{String(gi + 1).padStart(2, '0')}</p>
                  <h3>{g.title}</h3>
                  <p className="skill-group-blurb">{g.blurb}</p>
                </div>
                <ul className="skill-chips">
                  {g.skills.map((s) => {
                    const isSel = sel.group === g.id && sel.name === s.name;
                    return (
                      <li key={s.name}>
                        <button
                          className={`skill-chip ${isSel ? 'is-selected' : ''}`}
                          aria-pressed={isSel}
                          onClick={() => setSel({ group: g.id, name: s.name })}
                        >
                          {s.name}
                          <Meter level={s.level} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {sel.group === g.id && <div className="skill-detail-inline">{inspector}</div>}
              </div>
            ))}
          </div>

          <aside className="skills-aside">
            <div className="skills-aside-sticky">
              <ul className="legend" aria-label="Legend">
                {LEVELS.map((l) => (
                  <li key={l}>
                    <Meter level={l} />
                    {levelLabel[l].split(' — ')[0]}
                  </li>
                ))}
              </ul>
              <div className="skill-detail-desktop">{inspector}</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
