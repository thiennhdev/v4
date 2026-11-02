import { useEffect, useRef } from 'react';
import portrait from '../assets/portrait-circle.webp';
import { ClaudeSpark } from './ClaudeSpark';
import { PixelMascot } from './PixelMascot';

/**
 * Portrait as an atom's nucleus, with "electrons" (the Claude mark, the Claude
 * Code pixel mascot and a couple of energy orbs) travel along tilted orbits.
 * Each electron passes in
 * front of the portrait on the near half of its orbit and behind it on the
 * far half, which gives the scene real depth without any 3D library.
 */

type Orbit = { tilt: number }; // rotation of the ellipse, degrees

type Electron = {
  orbit: number;
  period: number; // seconds per revolution
  phase: number; // starting angle, radians
  dir: 1 | -1;
  kind: 'claude' | 'orb' | 'mascot' | 'orb-small';
};

const ORBITS: Orbit[] = [{ tilt: -24 }, { tilt: 36 }, { tilt: 96 }];

const ELECTRONS: Electron[] = [
  { orbit: 0, period: 16, phase: 0.6, dir: 1, kind: 'claude' },
  { orbit: 1, period: 11, phase: 2.4, dir: -1, kind: 'orb' },
  { orbit: 2, period: 22, phase: 4.2, dir: 1, kind: 'mascot' },
  { orbit: 2, period: 22, phase: 1.05, dir: 1, kind: 'orb-small' },
];

// Geometry as a fraction of the scene size.
const RX = 0.44;
const RY = 0.145;

function ellipsePath(cx: number, cy: number, rx: number, ry: number, front: boolean) {
  // Near half of the orbit = the lower half of the un-rotated ellipse.
  return front
    ? `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`
    : `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx - rx} ${cy}`;
}

export function OrbitPortrait() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const electronRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let size = scene.clientWidth;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const place = (now: number) => {
      const t = (now - start) / 1000;
      const half = size / 2;
      ELECTRONS.forEach((e, i) => {
        const el = electronRefs.current[i];
        if (!el) return;
        const theta = e.phase + e.dir * ((2 * Math.PI * t) / e.period);
        const lx = Math.cos(theta) * RX * size;
        const ly = Math.sin(theta) * RY * size;
        const a = (ORBITS[e.orbit].tilt * Math.PI) / 180;
        const x = lx * Math.cos(a) - ly * Math.sin(a);
        const y = lx * Math.sin(a) + ly * Math.cos(a);
        const depth = Math.sin(theta); // +1 nearest the viewer, −1 farthest
        const scale = 1 + depth * 0.14;
        el.style.transform = `translate(${half + x}px, ${half + y}px) translate(-50%, -50%) scale(${scale})`;
        el.style.zIndex = depth > 0 ? '4' : '1';
        // Small orbs fade a little with distance; the Claude mark and mascot stay solid.
        el.style.opacity = e.kind.startsWith('orb') ? String(0.72 + (depth + 1) * 0.14) : '1';
      });
    };

    const loop = (now: number) => {
      place(now);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      size = scene.clientWidth;
      if (reduce || !visible) place(start);
    });
    ro.observe(scene);

    if (reduce) {
      place(start);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(scene);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const rings = (front: boolean) =>
    ORBITS.map((o) => (
      <path
        key={o.tilt}
        d={ellipsePath(50, 50, RX * 100, RY * 100, front)}
        transform={`rotate(${o.tilt} 50 50)`}
        vectorEffect="non-scaling-stroke"
      />
    ));

  return (
    <div className="orbit" ref={sceneRef}>
      <svg className="orbit-rings orbit-rings-back" viewBox="0 0 100 100" aria-hidden>
        {rings(false)}
      </svg>

      <div className="orbit-nucleus">
        <img src={portrait} alt="Portrait of Thien Nguyen" width={520} height={520} fetchPriority="high" />
      </div>

      <svg className="orbit-rings orbit-rings-front" viewBox="0 0 100 100" aria-hidden>
        {rings(true)}
      </svg>

      {ELECTRONS.map((e, i) => (
        <span
          key={i}
          ref={(el) => {
            electronRefs.current[i] = el;
          }}
          className={`electron electron-${e.kind}`}
          aria-hidden
        >
          {e.kind === 'claude' && <ClaudeSpark size={22} />}
          {e.kind === 'mascot' && <PixelMascot />}
        </span>
      ))}
    </div>
  );
}
