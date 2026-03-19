import type { HexColor } from './colors.ts';

export interface GradientStop {
  c: HexColor;
  p: number;
  o: 1;
}

export interface Pairing {
  name: string;
  bg: HexColor;
  stops: [GradientStop, GradientStop, ...GradientStop[]];
}

export interface AtmoProps {
  blur: number;
}

export interface GrainConfig {
  size: number;
  density: number;
  opacity: number;
}

export const GRAIN_SETTINGS: GrainConfig = { size: 0.8, density: 0.8, opacity: 0.2 };

export const PAIRINGS: Pairing[] = [
  // ── 2 stops (4) ─────────────────────────────────────────────
  { name: 'Solar',    bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Void',     bg: '#0F0E0D', stops: [{ c: '#FFAA72', p: 0, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Dusk',     bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#6B63A8', p: 100, o: 1 }] },
  { name: 'Ember',    bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },

  // ── 3 stops (5) ─────────────────────────────────────────────
  { name: 'Pulsar',   bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#FF883D', p: 38, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Nebula',   bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#6B63A8', p: 55, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Dawn',     bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#FF883D', p: 42, o: 1 }, { c: '#6B63A8', p: 100, o: 1 }] },
  { name: 'Horizon',  bg: '#0F0E0D', stops: [{ c: '#FFAA72', p: 0, o: 1 }, { c: '#FF883D', p: 40, o: 1 }, { c: '#A8A2CC', p: 100, o: 1 }] },
  { name: 'Aeon',     bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#6B63A8', p: 52, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },

  // ── 4 stops (5) ─────────────────────────────────────────────
  { name: 'Corona',   bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FF883D', p: 32, o: 1 }, { c: '#6B63A8', p: 68, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Flare',    bg: '#0F0E0D', stops: [{ c: '#FFAA72', p: 0, o: 1 }, { c: '#FF883D', p: 28, o: 1 }, { c: '#6B63A8', p: 78, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Cosmic',   bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FF883D', p: 26, o: 1 }, { c: '#6B63A8', p: 62, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Atlas',    bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#FF883D', p: 40, o: 1 }, { c: '#6B63A8', p: 80, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Orbit',    bg: '#0F0E0D', stops: [{ c: '#FFAA72', p: 0, o: 1 }, { c: '#FF883D', p: 28, o: 1 }, { c: '#6B63A8', p: 65, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },

  // ── 5 stops (5) ─────────────────────────────────────────────
  { name: 'Zenith',   bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FFAA72', p: 22, o: 1 }, { c: '#FF883D', p: 45, o: 1 }, { c: '#6B63A8', p: 75, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Prism',    bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FF883D', p: 25, o: 1 }, { c: '#FFCBA6', p: 48, o: 1 }, { c: '#A8A2CC', p: 72, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Eclipse',  bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#FFCBA6', p: 22, o: 1 }, { c: '#FFAA72', p: 45, o: 1 }, { c: '#A8A2CC', p: 72, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Solstice', bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#FEEADA', p: 18, o: 1 }, { c: '#FFAA72', p: 40, o: 1 }, { c: '#6B63A8', p: 65, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Vesper',   bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#FF883D', p: 20, o: 1 }, { c: '#FFAA72', p: 42, o: 1 }, { c: '#6B63A8', p: 70, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },

  // ── 6 stops (5) ─────────────────────────────────────────────
  { name: 'Nova',     bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FFCBA6', p: 15, o: 1 }, { c: '#FF883D', p: 35, o: 1 }, { c: '#FFAA72', p: 55, o: 1 }, { c: '#6B63A8', p: 78, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Quasar',   bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#FFAA72', p: 18, o: 1 }, { c: '#FEEADA', p: 35, o: 1 }, { c: '#D4D0EA', p: 55, o: 1 }, { c: '#A8A2CC', p: 75, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Meridian', bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FF883D', p: 20, o: 1 }, { c: '#FFCBA6', p: 38, o: 1 }, { c: '#A8A2CC', p: 58, o: 1 }, { c: '#6B63A8', p: 78, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Drift',    bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#FF883D', p: 16, o: 1 }, { c: '#FFAA72', p: 32, o: 1 }, { c: '#6B63A8', p: 52, o: 1 }, { c: '#A8A2CC', p: 74, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Haze',     bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#FEEADA', p: 18, o: 1 }, { c: '#FFCBA6', p: 36, o: 1 }, { c: '#D4D0EA', p: 56, o: 1 }, { c: '#6B63A8', p: 76, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
];
