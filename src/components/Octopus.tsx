/**
 * Small original octopus mascot in Claude's clay colour.
 * Tentacles wave independently (CSS keyframes), so it reads as alive
 * while it swims along its orbit around the portrait.
 */
const TENTACLES = [13, 18.5, 24, 29.5, 35];

export function Octopus({ size = 38 }: { size?: number }) {
  return (
    <svg className="octopus" width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <g className="octopus-tentacles">
        {TENTACLES.map((x, i) => (
          <path
            key={x}
            className="tentacle"
            style={{ animationDelay: `${i * -0.28}s` }}
            d={`M ${x} 26 q ${i % 2 ? 2.5 : -2.5} 6 0 11 q -2 4 ${i % 2 ? -1.5 : 1.5} 7`}
          />
        ))}
      </g>
      <path
        className="octopus-head"
        d="M9 25 C9 13 16 6 24 6 C32 6 39 13 39 25 C39 28.5 37 30 34 30 L14 30 C11 30 9 28.5 9 25 Z"
      />
      <ellipse className="octopus-cheek" cx="15" cy="23.5" rx="2.4" ry="1.4" />
      <ellipse className="octopus-cheek" cx="33" cy="23.5" rx="2.4" ry="1.4" />
      <g className="octopus-eyes">
        <ellipse cx="19" cy="19" rx="2.1" ry="2.6" />
        <ellipse cx="29" cy="19" rx="2.1" ry="2.6" />
      </g>
      <circle className="octopus-glint" cx="19.8" cy="17.9" r="0.75" />
      <circle className="octopus-glint" cx="29.8" cy="17.9" r="0.75" />
    </svg>
  );
}
