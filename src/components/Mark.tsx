/** Monogram used in the nav, footer and favicon. */
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <span className="mark" style={{ width: size, height: size }} aria-hidden>
      T
    </span>
  );
}
