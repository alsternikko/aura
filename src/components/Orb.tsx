import { useRef, useEffect, useMemo } from 'react';
import type { Pairing, AtmoProps } from '../tokens/pairings.ts';
import { gradCSS, grainUrl } from '../lib/gradient.ts';
import s from './Orb.module.css';

interface OrbProps {
  pairing: Pairing;
  atmoProps: AtmoProps;
  grainOn: boolean;
  orbSize: number;
  transitionKey: number;
}

export function Orb({ pairing, atmoProps, grainOn, orbSize, transitionKey }: OrbProps) {
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<'a' | 'b'>('a');
  const prevKeyRef = useRef(transitionKey);

  useEffect(() => {
    const g = gradCSS(pairing.stops);

    if (transitionKey !== prevKeyRef.current) {
      prevKeyRef.current = transitionKey;

      const isA = activeRef.current === 'a';
      const fadingLayer = isA ? layerBRef.current : layerARef.current;
      const activeLayer = isA ? layerARef.current : layerBRef.current;

      if (!fadingLayer || !activeLayer) return;

      fadingLayer.style.background = g;

      requestAnimationFrame(() => {
        activeLayer.style.opacity = '0';
        fadingLayer.style.opacity = '1';
        activeRef.current = isA ? 'b' : 'a';
      });
    } else {
      const layer = activeRef.current === 'a' ? layerARef.current : layerBRef.current;
      if (!layer) return;
      layer.style.background = g;
    }
  }, [transitionKey, atmoProps, pairing.stops]);

  useEffect(() => {
    const el = grainRef.current;
    if (!el) return;
    if (grainOn) {
      el.style.backgroundImage = grainUrl();
      el.style.opacity = '1';
    } else {
      el.style.backgroundImage = 'none';
      el.style.opacity = '0';
    }
  }, [grainOn]);

  const blurFilter = atmoProps.blur > 0 ? `blur(${atmoProps.blur}px)` : 'none';

  const grainMask = useMemo(() => {
    const blurExtent = atmoProps.blur * 3;
    const radius = orbSize / 2;
    const innerPct = Math.max(0, ((radius - blurExtent) / orbSize) * 100);
    const outerPct = Math.min(100, ((radius + blurExtent) / orbSize) * 100);
    return `radial-gradient(circle, black ${innerPct.toFixed(1)}%, transparent ${outerPct.toFixed(1)}%)`;
  }, [atmoProps.blur, orbSize]);

  return (
    <div className={s.container} style={{ width: orbSize, height: orbSize }}>
      <div className={s.wrap} style={{ filter: blurFilter }}>
        <div ref={layerARef} className={s.layer} style={{ opacity: 1 }} />
        <div ref={layerBRef} className={s.layer} style={{ opacity: 0 }} />
      </div>
      <div
        ref={grainRef}
        className={s.grainOverlay}
        style={{
          WebkitMaskImage: grainMask,
          maskImage: grainMask,
        }}
      />
    </div>
  );
}
