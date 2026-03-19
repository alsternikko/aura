import type { HexColor } from '../tokens/colors.ts';
import { ORANGE, INDIGO } from '../tokens/colors.ts';
import type { Pairing, GradientStop } from '../tokens/pairings.ts';

const ORANGE_POOL: HexColor[] = [ORANGE.main, ORANGE[500], ORANGE[300], ORANGE[100]];
const INDIGO_POOL: HexColor[] = [INDIGO.main, INDIGO[500], INDIGO[300], INDIGO[100]];

const STOP_COUNTS = [2, 3, 3, 4, 4, 5, 5, 6] as const;

const NAMES = [
  'Spark', 'Bloom', 'Surge', 'Glow', 'Pulse', 'Plume', 'Crest', 'Trace',
  'Phase', 'Rift', 'Wave', 'Shard', 'Ring', 'Gleam', 'Arc', 'Flux',
  'Veil', 'Loop', 'Edge', 'Core', 'Mist', 'Peak', 'Fold', 'Loom',
  'Halo', 'Glint', 'Torch', 'Blaze', 'Beam', 'Swell', 'Dune', 'Tide',
];

function pick<T>(arr: T[] | readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomPairing(): Pairing {
  const stopCount = pick(STOP_COUNTS);
  const positions = [0];

  for (let i = 1; i < stopCount - 1; i++) {
    positions.push(randInt(12, 88));
  }
  positions.push(100);
  positions.sort((a, b) => a - b);

  const orangeIdx = Math.floor(Math.random() * stopCount);
  let indigoIdx: number;
  do {
    indigoIdx = Math.floor(Math.random() * stopCount);
  } while (indigoIdx === orangeIdx);

  const stops: GradientStop[] = positions.map((p, i) => {
    let c: HexColor;
    if (i === orangeIdx) c = pick(ORANGE_POOL);
    else if (i === indigoIdx) c = pick(INDIGO_POOL);
    else c = Math.random() < 0.5 ? pick(ORANGE_POOL) : pick(INDIGO_POOL);
    return { c, p, o: 1 as const };
  });

  return {
    name: pick(NAMES),
    bg: '#0F0E0D' as HexColor,
    stops: stops as [GradientStop, GradientStop, ...GradientStop[]],
  };
}
