import { useRef, useEffect } from 'react';
import type { Pairing } from '../tokens/pairings.ts';
import { chipCSS } from '../lib/gradient.ts';
import s from './ChipStrip.module.css';

interface ChipStripProps {
  pairings: Pairing[];
  activeIdx: number;
  onSelect: (idx: number) => void;
  onNav: (dir: number) => void;
}

export function ChipStrip({ pairings, activeIdx, onSelect, onNav }: ChipStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const chip = chipRefs.current[activeIdx];
    if (chip) {
      chip.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    }
  }, [activeIdx, pairings.length]);

  return (
    <div className={s.wrap}>
      <button className={s.arrow} onClick={() => onNav(-1)} title="Previous (←)">
        <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2.5L4.5 6.5 8 10.5" />
        </svg>
      </button>

      <div ref={stripRef} className={s.strip}>
        <div className={s.inner}>
          {pairings.map((p, i) => (
            <button
              key={`${i}-${p.name}`}
              ref={(el) => { chipRefs.current[i] = el; }}
              className={`${s.chip}${i === activeIdx ? ` ${s.chipActive}` : ''}`}
              style={{ background: chipCSS(p.stops) }}
              title={p.name}
              onClick={() => onSelect(i)}
            />
          ))}
        </div>
      </div>

      <button className={s.arrow} onClick={() => onNav(1)} title="Next (→)">
        <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 2.5l3.5 4L5 10.5" />
        </svg>
      </button>
    </div>
  );
}
