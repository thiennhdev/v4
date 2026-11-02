/**
 * Claude-style spark built from separate rays so each one can move on its own.
 * A staggered keyframe makes the rays shrink and grow one after another, like
 * the "thinking" animation in the Claude apps, while the whole mark turns slowly.
 */

// Angle (degrees) and outer radius of each ray on a 24 × 24 canvas.
// Slightly irregular, like the hand-drawn feel of the Claude mark.
const RAYS = [
  { a: -90, r: 10.6 },
  { a: -61, r: 8.7 },
  { a: -29, r: 10.1 },
  { a: 2, r: 8.4 },
  { a: 31, r: 10.4 },
  { a: 59, r: 8.9 },
  { a: 90, r: 10.2 },
  { a: 121, r: 8.5 },
  { a: 150, r: 10.5 },
  { a: 178, r: 8.6 },
  { a: 209, r: 10 },
  { a: 239, r: 8.8 },
];

const INNER = 0.4;
const CYCLE = 1.5; // seconds for the wave to travel once around

export function ClaudeSpark({ size = 22 }: { size?: number }) {
  return (
    <svg className="spark" width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      {RAYS.map((ray, i) => {
        const t = (ray.a * Math.PI) / 180;
        return (
          <line
            key={ray.a}
            className="spark-ray"
            x1={12 + Math.cos(t) * INNER}
            y1={12 + Math.sin(t) * INNER}
            x2={12 + Math.cos(t) * ray.r}
            y2={12 + Math.sin(t) * ray.r}
            style={{ animationDelay: `${(-i * CYCLE) / RAYS.length}s` }}
          />
        );
      })}
    </svg>
  );
}
