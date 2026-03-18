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
  grain: number;
}

export const PAIRINGS: Pairing[] = [
  { name: 'Solar',   bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Pulsar',  bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#FF883D', p: 38, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Nebula',  bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#6B63A8', p: 55, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Corona',  bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FF883D', p: 32, o: 1 }, { c: '#6B63A8', p: 68, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Dawn',    bg: '#FDFBF9', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FF883D', p: 45, o: 1 }, { c: '#A8A2CC', p: 100, o: 1 }] },
  { name: 'Horizon', bg: '#F2F2F2', stops: [{ c: '#FFAA72', p: 0, o: 1 }, { c: '#FEEADA', p: 40, o: 1 }, { c: '#D4D0EA', p: 100, o: 1 }] },
  { name: 'Ember',   bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#FF883D', p: 42, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Flare',   bg: '#0F0E0D', stops: [{ c: '#FFAA72', p: 0, o: 1 }, { c: '#FF883D', p: 28, o: 1 }, { c: '#6B63A8', p: 78, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Cosmic',  bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FF883D', p: 26, o: 1 }, { c: '#6B63A8', p: 62, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Void',    bg: '#0F0E0D', stops: [{ c: '#FFAA72', p: 0, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Zenith',  bg: '#FDFBF9', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FFAA72', p: 35, o: 1 }, { c: '#A8A2CC', p: 100, o: 1 }] },
  { name: 'Atlas',   bg: '#0F0E0D', stops: [{ c: '#FFCBA6', p: 0, o: 1 }, { c: '#FF883D', p: 40, o: 1 }, { c: '#6B63A8', p: 80, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Orbit',   bg: '#0F0E0D', stops: [{ c: '#FFAA72', p: 0, o: 1 }, { c: '#FF883D', p: 28, o: 1 }, { c: '#6B63A8', p: 65, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Vesper',  bg: '#0F0E0D', stops: [{ c: '#FEEADA', p: 0, o: 1 }, { c: '#FFAA72', p: 40, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Aeon',    bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#6B63A8', p: 52, o: 1 }, { c: '#2E2554', p: 100, o: 1 }] },
  { name: 'Apex',    bg: '#0F0E0D', stops: [{ c: '#FF883D', p: 0, o: 1 }, { c: '#A8A2CC', p: 55, o: 1 }, { c: '#D4D0EA', p: 100, o: 1 }] },
];
