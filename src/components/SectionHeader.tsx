import type { ReactNode } from 'react';

type Props = { eyebrow: string; title: ReactNode; children?: ReactNode; align?: 'left' | 'center' };

export function SectionHeader({ eyebrow, title, children, align = 'left' }: Props) {
  return (
    <header className={`section-header reveal ${align === 'center' ? 'is-center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children && <p className="section-lede">{children}</p>}
    </header>
  );
}
