import { useEffect, useState } from 'react';
import { navLinks } from '../data/nav';
import { profile } from '../data/profile';
import type { Theme } from '../hooks/useTheme';
import { Close, Menu, Moon, Search, Sun } from './Icons';
import { Mark } from './Mark';

type Props = {
  active: string;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenCommand: () => void;
};

export function Nav({ active, theme, onToggleTheme, onOpenCommand }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 860 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className={`nav ${scrolled || open ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <Mark />
          <span className="brand-name">{profile.shortName}</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="kbd-trigger" onClick={onOpenCommand} aria-label="Open quick actions">
            <Search size={15} />
            <span className="kbd-trigger-text">Quick jump</span>
            <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn-outline btn-sm nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <button
            className="icon-btn nav-menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav className="container" aria-label="Mobile">
          {navLinks.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
              <span className="mobile-index">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer">
            View résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
