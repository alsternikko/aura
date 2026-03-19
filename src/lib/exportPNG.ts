import type { Pairing, AtmoProps } from '../tokens/pairings.ts';
import { GRAIN_SETTINGS } from '../tokens/pairings.ts';

export function exportPNG(pairing: Pairing, atmoProps: AtmoProps, size: number, grainOn: boolean): void {
  const orbR = Math.round(size * 0.5 * 0.82);
  const blurPx = Math.round(atmoProps.blur * (size / 500));
  const pad = Math.ceil(blurPx * 5);
  const tmpSz = size + pad * 2;
  const cx = tmpSz / 2;
  const cy = tmpSz / 2;

  const blurExtent = Math.ceil(blurPx * 3);
  const outSz = Math.max(size, Math.ceil((orbR + blurExtent) * 2));

  flashScreen();

  /* Step 1 — gradient on oversized tmp canvas, circle-clipped */
  const tmp = document.createElement('canvas');
  tmp.width = tmpSz;
  tmp.height = tmpSz;
  const tctx = tmp.getContext('2d')!;

  const sorted = [...pairing.stops].sort((a, b) => a.p - b.p);
  const grad = tctx.createRadialGradient(cx, cy, 0, cx, cy, orbR);
  for (const s of sorted) {
    const r = parseInt(s.c.slice(1, 3), 16);
    const g = parseInt(s.c.slice(3, 5), 16);
    const b = parseInt(s.c.slice(5, 7), 16);
    grad.addColorStop(Math.min(1, s.p / 100), `rgba(${r},${g},${b},${s.o})`);
  }

  tctx.save();
  tctx.beginPath();
  tctx.arc(cx, cy, orbR, 0, Math.PI * 2);
  tctx.clip();
  tctx.fillStyle = grad;
  tctx.fillRect(0, 0, tmpSz, tmpSz);
  tctx.restore();

  /* Step 2 — blur gradient onto dynamically sized output */
  const out = document.createElement('canvas');
  out.width = outSz;
  out.height = outSz;
  const ctx = out.getContext('2d')!;

  const offset = (outSz - tmpSz) / 2;

  if (blurPx > 0) {
    ctx.filter = `blur(${blurPx}px)`;
    ctx.drawImage(tmp, offset, offset);
    ctx.filter = 'none';
  } else {
    ctx.drawImage(tmp, offset, offset);
  }

  /* Step 3 — grain AFTER blur so it stays sharp, circle-clipped to orbR */
  if (grainOn) {
    const outCx = outSz / 2;
    const outCy = outSz / 2;
    const noiseSz = orbR * 2;
    const nc = document.createElement('canvas');
    nc.width = noiseSz;
    nc.height = noiseSz;
    const nctx = nc.getContext('2d')!;
    const nd = nctx.createImageData(noiseSz, noiseSz);
    const dd = nd.data;
    const alpha = Math.round(GRAIN_SETTINGS.opacity * 255);
    for (let i = 0; i < dd.length; i += 4) {
      if (Math.random() > GRAIN_SETTINGS.density) continue;
      const v = (Math.random() * 255) | 0;
      dd[i] = v;
      dd[i + 1] = v;
      dd[i + 2] = v;
      dd[i + 3] = alpha;
    }
    nctx.putImageData(nd, 0, 0);

    ctx.save();
    ctx.beginPath();
    ctx.arc(outCx, outCy, orbR, 0, Math.PI * 2);
    ctx.clip();
    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(nc, outCx - orbR, outCy - orbR);
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  }

  out.toBlob((blob) => {
    if (!blob) {
      alert('Export failed — try a smaller size.');
      return;
    }
    triggerDownload(blob, `aura-${pairing.name.toLowerCase()}-${outSz}.png`);
  });
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
