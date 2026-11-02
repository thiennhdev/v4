import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { profile, socials } from '../data/profile';
import type { Theme } from '../hooks/useTheme';
import { copyText } from '../lib/clipboard';
import { ArrowRight, Copy, Download, Moon, Search, SocialIcon, Sun } from './Icons';
import { navLinks } from '../data/nav';

type Action = { id: string; group: string; label: string; hint?: string; icon: ReactNode; run: () => void };

type Props = {
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
};

export function CommandMenu({ onClose, theme, onToggleTheme }: Props) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const actions = useMemo<Action[]>(
    () => [
      ...navLinks.map((l) => ({
        id: `go-${l.id}`,
        group: 'Navigate',
        label: l.label,
        icon: <ArrowRight size={16} />,
        run: () => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        icon: <Copy size={16} />,
        run: () => {
          void copyText(profile.email);
        },
      },
      {
        id: 'cv',
        group: 'Actions',
        label: 'Open résumé (PDF)',
        icon: <Download size={16} />,
        run: () => window.open(profile.resume, '_blank', 'noopener'),
      },
      {
        id: 'theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
        run: onToggleTheme,
      },
      ...socials.map((s) => ({
        id: `social-${s.key}`,
        group: 'Elsewhere',
        label: s.label,
        hint: s.handle,
        icon: <SocialIcon name={s.key} size={15} />,
        run: () => window.open(s.url, '_blank', 'noopener'),
      })),
    ],
    [theme, onToggleTheme],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.hint ?? ''} ${a.group}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    const restoreFocus = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      restoreFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const run = (a: Action) => {
    a.run();
    if (a.id === 'copy-email') {
      setFlash('Email copied');
      window.setTimeout(() => {
        setFlash(null);
        onClose();
      }, 650);
      return;
    }
    onClose();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const a = filtered[index];
      if (a) run(a);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  let lastGroup = '';

  return (
    <div className="cmd-overlay" onMouseDown={onClose}>
      <div
        className="cmd"
        role="dialog"
        aria-modal="true"
        aria-label="Quick actions"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="cmd-input-row">
          <Search size={17} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Jump to a section, copy email, open résumé…"
            aria-label="Search actions"
            aria-controls="cmd-list"
            aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
            role="combobox"
            aria-expanded="true"
          />
          <kbd>Esc</kbd>
        </div>

        <ul className="cmd-list" id="cmd-list" role="listbox" ref={listRef}>
          {filtered.length === 0 && <li className="cmd-empty">No matches for “{query}”.</li>}
          {filtered.map((a, i) => {
            const header = a.group !== lastGroup ? a.group : null;
            lastGroup = a.group;
            return (
              <li key={a.id} role="presentation">
                {header && <p className="cmd-group">{header}</p>}
                <div
                  id={`cmd-${a.id}`}
                  role="option"
                  aria-selected={i === index}
                  data-index={i}
                  className={`cmd-item ${i === index ? 'is-active' : ''}`}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(a)}
                >
                  <span className="cmd-icon">{a.icon}</span>
                  <span className="cmd-label">{a.label}</span>
                  {a.hint && <span className="cmd-hint">{a.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="cmd-foot">
          {flash ? (
            <span className="cmd-flash">{flash}</span>
          ) : (
            <>
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> to move
              </span>
              <span>
                <kbd>↵</kbd> to select
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
