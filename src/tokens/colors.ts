export type HexColor = `#${string}`;

export const ORANGE = {
  main: '#FF883D' as HexColor,
  500: '#FFAA72' as HexColor,
  300: '#FFCBA6' as HexColor,
  100: '#FEEADA' as HexColor,
} as const;

export const INDIGO = {
  main: '#2E2554' as HexColor,
  500: '#6B63A8' as HexColor,
  300: '#A8A2CC' as HexColor,
  100: '#D4D0EA' as HexColor,
} as const;

export const NEUTRAL = {
  ink: '#0F0E0D' as HexColor,
  900: '#1A1918' as HexColor,
  800: '#2E2D2B' as HexColor,
  700: '#444240' as HexColor,
  600: '#5E5C5A' as HexColor,
  500: '#7A7876' as HexColor,
  400: '#9C9A98' as HexColor,
  300: '#BFBDBB' as HexColor,
  200: '#E0DFDD' as HexColor,
  100: '#F2F2F2' as HexColor,
  offWhite: '#FDFBF9' as HexColor,
  white: '#FFFFFF' as HexColor,
} as const;
