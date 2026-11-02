import { profile } from '../data/profile';
import { Mark } from './Mark';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Mark size={24} />
          <span>
            © {year} {profile.name}
          </span>
        </div>
        <p className="footer-note">Designed &amp; built with Vite + React. Set in Source Serif &amp; Inter.</p>
        <a href="#top" className="footer-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
