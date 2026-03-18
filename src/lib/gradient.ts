import type { GradientStop, AtmoProps } from '../tokens/pairings.ts';

export function atmoToProps(atmo: number): AtmoProps {
  const t = atmo / 100;
  return {
    blur: Math.round(t * t * 88),
    grain: parseFloat((t * 0.52).toFixed(3)),
  };
}

export function gradCSS(stops: GradientStop[]): string {
  const sorted = [...stops].sort((a, b) => a.p - b.p);
  const stopsStr = sorted
    .map((s) => {
      const r = parseInt(s.c.slice(1, 3), 16);
      const g = parseInt(s.c.slice(3, 5), 16);
      const b = parseInt(s.c.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${s.o.toFixed(2)}) ${s.p}%`;
    })
    .join(',');
  return `radial-gradient(circle,${stopsStr})`;
}

export function chipCSS(stops: GradientStop[]): string {
  const sorted = [...stops].sort((a, b) => a.p - b.p);
  const stopsStr = sorted.map((s) => `${s.c} ${s.p}%`).join(',');
  return `radial-gradient(circle at 35% 35%,${stopsStr})`;
}

export function grainUrl(intensity: number): string {
  if (!intensity) return 'none';
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">' +
    '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/></filter>' +
    `<rect width="300" height="300" filter="url(#n)" opacity="${intensity}"/></svg>`;
  try {
    return `url("data:image/svg+xml;base64,${btoa(svg)}")`;
  } catch {
    return 'none';
  }
}
