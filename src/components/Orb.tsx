import { useRef, useEffect } from 'react';
import type { Pairing, AtmoProps } from '../tokens/pairings.ts';
import { gradCSS, grainUrl } from '../lib/gradient.ts';
import s from './Orb.module.css';

interface OrbProps {
  pairing: Pairing;
  atmoProps: AtmoProps;
  orbSize: number;
  transitionKey: number;
}

export function Orb({ pairing, atmoProps, orbSize, transitionKey }: OrbProps) {
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const grainARef = useRef<HTMLDivElement>(null);
  const grainBRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<'a' | 'b'>('a');
  const prevKeyRef = useRef(transitionKey);

  useEffect(() => {
    const g = gradCSS(pairing.stops);
    const gu = grainUrl(atmoProps.grain);
    const grainVisible = atmoProps.grain > 0 ? '1' : '0';

    if (transitionKey !== prevKeyRef.current) {
      /* Crossfade: new pairing selected */
      prevKeyRef.current = transitionKey;

      const isA = activeRef.current === 'a';
      const fadingLayer = isA ? layerBRef.current : layerARef.current;
      const activeLayer = isA ? layerARef.current : layerBRef.current;
      const fadingGrain = isA ? grainBRef.current : grainARef.current;

      if (!fadingLayer || !activeLayer || !fadingGrain) return;

      fadingLayer.style.background = g;
      fadingGrain.style.backgroundImage = gu;
      fadingGrain.style.opacity = grainVisible;

      requestAnimationFrame(() => {
        activeLayer.style.opacity = '0';
        fadingLayer.style.opacity = '1';
        activeRef.current = isA ? 'b' : 'a';
      });
    } else {
      /* Direct update: atmo slider or initial mount */
      const layer = activeRef.current === 'a' ? layerARef.current : layerBRef.current;
      const grain = activeRef.current === 'a' ? grainARef.current : grainBRef.current;

      if (!layer || !grain) return;

      layer.style.background = g;
      grain.style.backgroundImage = gu;
      grain.style.opacity = grainVisible;
    }
  }, [transitionKey, atmoProps, pairing.stops]);

  const blurFilter = atmoProps.blur > 0 ? `blur(${atmoProps.blur}px)` : 'none';

  return (
    <div
      className={s.wrap}
      style={{ width: orbSize, height: orbSize, filter: blurFilter }}
    >
      <div ref={layerARef} className={s.layer} style={{ opacity: 1 }}>
        <div ref={grainARef} className={s.grain} />
      </div>
      <div ref={layerBRef} className={s.layer} style={{ opacity: 0 }}>
        <div ref={grainBRef} className={s.grain} />
      </div>
    </div>
  );
}
