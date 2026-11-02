import { useState } from 'react';
import { profile, socials } from '../data/profile';
import { copyText } from '../lib/clipboard';
import { Check, Copy, Download, Mail, SocialIcon } from './Icons';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (await copyText(profile.email)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-card reveal">
          <p className="eyebrow">Contact</p>
          <h2 className="contact-title">
            Let’s build something <em>reliable</em>.
          </h2>
          <p className="contact-lede">
            My inbox is always open — whether it’s a role, a project, or a question about Go and
            distributed systems, I’ll get back to you.
          </p>

          <div className="email-row">
            <a href={`mailto:${profile.email}`} className="email-address">
              {profile.email}
            </a>
            <button className="icon-btn" onClick={onCopy} aria-label="Copy email address">
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
            <span className={`copied-toast ${copied ? 'is-shown' : ''}`} role="status">
              {copied ? 'Copied' : ''}
            </span>
          </div>

          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <Mail size={17} />
              Say hello
            </a>
            <a className="btn btn-ghost" href={profile.resume} download>
              <Download size={17} />
              Download CV
            </a>
          </div>

          <ul className="contact-socials">
            {socials.map((s) => (
              <li key={s.key}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  <SocialIcon name={s.key} size={16} />
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
