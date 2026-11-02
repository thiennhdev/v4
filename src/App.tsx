import { useCallback, useEffect, useState } from 'react';
import { About } from './components/About';
import { CommandMenu } from './components/CommandMenu';
import { Contact } from './components/Contact';
import { Credentials } from './components/Credentials';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { navLinks } from './data/nav';
import { jobs } from './data/profile';
import { useActiveSection } from './hooks/useActiveSection';
import { useReveal } from './hooks/useReveal';
import { useTheme } from './hooks/useTheme';

const sectionIds = navLinks.map((l) => l.id);

export default function App() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);
  const [jobId, setJobId] = useState(jobs[0].id);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);

  useReveal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /** Called from the skills explorer: jump to the job tab or project card. */
  const openContext = useCallback((id: string) => {
    if (jobs.some((j) => j.id === id)) {
      setJobId(id);
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(`project-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlighted(id);
    window.setTimeout(() => setHighlighted((h) => (h === id ? null : h)), 1800);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav active={active} theme={theme} onToggleTheme={toggle} onOpenCommand={() => setCmdOpen(true)} />
      <main id="main">
        <Hero />
        <About />
        <Experience activeId={jobId} onSelect={setJobId} />
        <Skills onOpenContext={openContext} />
        <Projects highlighted={highlighted} />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      {cmdOpen && <CommandMenu onClose={() => setCmdOpen(false)} theme={theme} onToggleTheme={toggle} />}
    </>
  );
}
