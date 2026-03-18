import type { Pairing, AtmoProps } from '../tokens/pairings.ts';

export function exportSVG(pairing: Pairing, atmoProps: AtmoProps): void {
  const baseSz = 1024;
  const orbR = Math.round(baseSz * 0.5 * 0.82);
  const blurScaled = atmoProps.blur * (baseSz / 500);
  const blurSD = (blurScaled / 2).toFixed(1);

  const blurExtent = Math.ceil(blurScaled * 3);
  const outSz = Math.max(baseSz, Math.ceil((orbR + blurExtent) * 2));
  const cx = outSz / 2;
  const cy = outSz / 2;

  flashScreen();

  const sorted = [...pairing.stops].sort((a, b) => a.p - b.p);
  const stopsStr = sorted
    .map((s) => `<stop offset="${s.p}%" stop-color="${s.c}" stop-opacity="${s.o.toFixed(3)}"/>`)
    .join('');

  const filterPad = Math.ceil(blurScaled * 3.5);
  let filterDef = '';
  let filterAttr = '';

  if (atmoProps.blur > 0) {
    filterDef =
      `<filter id="bl" filterUnits="userSpaceOnUse"` +
      ` x="${cx - orbR - filterPad}" y="${cy - orbR - filterPad}"` +
      ` width="${orbR * 2 + filterPad * 2}" height="${orbR * 2 + filterPad * 2}">` +
      `<feGaussianBlur stdDeviation="${blurSD}"/>` +
      `</filter>`;
    filterAttr = ' filter="url(#bl)"';
  }

  let grainDefs = '';
  let grainCircle = '';

  if (atmoProps.grain > 0) {
    const noiseDataUrl = generateNoiseTile(atmoProps.grain);
    grainDefs =
      `<pattern id="noise" width="256" height="256" patternUnits="userSpaceOnUse">` +
      `<image href="${noiseDataUrl}" width="256" height="256"/>` +
      `</pattern>`;
    grainCircle =
      `<circle cx="${cx}" cy="${cy}" r="${orbR}" fill="url(#noise)" style="mix-blend-mode:overlay"/>`;
  }

  const groupOpen = filterAttr ? `<g${filterAttr}>` : '';
  const groupClose = filterAttr ? '</g>' : '';

  const svg =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${outSz}" height="${outSz}" viewBox="0 0 ${outSz} ${outSz}">` +
    '<defs>' +
    `<radialGradient id="g" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${orbR}">${stopsStr}</radialGradient>` +
    filterDef +
    grainDefs +
    '</defs>' +
    groupOpen +
    `<circle cx="${cx}" cy="${cy}" r="${orbR}" fill="url(#g)"/>` +
    grainCircle +
    groupClose +
    '</svg>';

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  triggerDownload(blob, `aura-${pairing.name.toLowerCase()}.svg`);
}

function generateNoiseTile(grain: number): string {
  const sz = 256;
  const c = document.createElement('canvas');
  c.width = sz;
  c.height = sz;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(sz, sz);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
    d[i + 3] = Math.round(grain * 90);
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL('image/png');
}

function flashScreen(): void {
  const el = document.getElementById('export-flash');
  if (!el) return;
  el.style.opacity = '0.1';
  setTimeout(() => {
    el.style.opacity = '0';
  }, 180);
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
