import type { Pairing, AtmoProps } from '../tokens/pairings.ts';

export function exportSVG(pairing: Pairing, atmoProps: AtmoProps): void {
  const sz = 1024;
  const orbR = Math.round(sz * 0.5 * 0.82);
  const cx = sz / 2;
  const cy = sz / 2;
  const blurSD = (atmoProps.blur * (sz / 500) / 2).toFixed(1);

  flashScreen();

  const sorted = [...pairing.stops].sort((a, b) => a.p - b.p);
  const stopsStr = sorted
    .map((s) => `<stop offset="${s.p}%" stop-color="${s.c}" stop-opacity="${s.o.toFixed(3)}"/>`)
    .join('');

  const pad = Math.ceil(atmoProps.blur * (sz / 500) * 3.5);
  let filterDef = '';
  let filterAttr = '';

  if (atmoProps.blur > 0) {
    filterDef =
      `<filter id="bl" filterUnits="userSpaceOnUse"` +
      ` x="${cx - orbR - pad}" y="${cy - orbR - pad}"` +
      ` width="${orbR * 2 + pad * 2}" height="${orbR * 2 + pad * 2}">` +
      `<feGaussianBlur stdDeviation="${blurSD}"/>` +
      `</filter>`;
    filterAttr = ' filter="url(#bl)"';
  }

  const svg =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}">` +
    '<defs>' +
    `<radialGradient id="g" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${orbR}">${stopsStr}</radialGradient>` +
    filterDef +
    '</defs>' +
    `<circle cx="${cx}" cy="${cy}" r="${orbR}" fill="url(#g)"${filterAttr}/>` +
    '</svg>';

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  triggerDownload(blob, `aura-${pairing.name.toLowerCase()}.svg`);
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
