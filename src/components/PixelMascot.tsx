/**
 * Pixel mascot drawn on a 16 × 10 grid (one unit = one "pixel").
 * Eyes are real cut-outs, so whatever is behind shows through them.
 * CSS animates it in stepped, pixel-art fashion: legs walk in
 * alternating pairs, arms wave, eyelids blink and the body bobs.
 */
export function PixelMascot({ width = 46 }: { width?: number }) {
  return (
    <svg
      className="mascot"
      width={width}
      height={(width * 12) / 18}
      viewBox="-1 -1 18 12"
      shapeRendering="crispEdges"
      aria-hidden
      focusable="false"
    >
      <rect className="leg leg-a" x="3" y="8" width="1" height="2" />
      <rect className="leg leg-b" x="5" y="8" width="1" height="2" />
      <rect className="leg leg-b" x="10" y="8" width="1" height="2" />
      <rect className="leg leg-a" x="12" y="8" width="1" height="2" />
      <rect className="arm arm-l" x="0" y="4" width="2" height="2" />
      <rect className="arm arm-r" x="14" y="4" width="2" height="2" />
      <path className="mascot-body" fillRule="evenodd" d="M2 0h12v8H2z M4 2h1v2H4z M11 2h1v2h-1z" />
      <rect className="lid" x="4" y="2" width="1" height="2" />
      <rect className="lid" x="11" y="2" width="1" height="2" />
    </svg>
  );
}
