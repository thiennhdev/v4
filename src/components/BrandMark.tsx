import type { BrandIcon } from '../lib/brandIcons';

type Props = { icon: BrandIcon; size?: number; className?: string; color?: string };

/** Renders a Simple Icons path. Monochrome (currentColor) unless a color is given. */
export function BrandMark({ icon, size = 20, className, color }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color ?? 'currentColor'}
      className={className}
      aria-hidden
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
