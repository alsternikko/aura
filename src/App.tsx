import { useState, useCallback, useRef, useEffect } from 'react';
import { PAIRINGS } from './tokens/pairings.ts';
import { atmoToProps } from './lib/gradient.ts';
import { exportPNG } from './lib/exportPNG.ts';
import { exportSVG } from './lib/exportSVG.ts';
import { useOrbSize } from './hooks/useOrbSize.ts';
import { useKeyboardNav } from './hooks/useKeyboardNav.ts';
import { useWheelNav } from './hooks/useWheelNav.ts';
import { useTouchNav } from './hooks/useTouchNav.ts';
import { Wordmark } from './components/Wordmark.tsx';
import { KeyboardHint } from './components/KeyboardHint.tsx';
import { Orb } from './components/Orb.tsx';
import { ChipStrip } from './components/ChipStrip.tsx';
import { AtmoSlider } from './components/AtmoSlider.tsx';
import { ExportBar } from './components/ExportBar.tsx';
import s from './App.module.css';

export default function App() {
  const [idx, setIdx] = useState(0);
  const [atmo, setAtmo] = useState(45);
  const [size, setSize] = useState(1024);
  const [format, setFormat] = useState<'png' | 'svg'>('png');
  const [transitionKey, setTransitionKey] = useState(0);
  const [scrollHintVisible, setScrollHintVisible] = useState(true);

  const stageRef = useRef<HTMLDivElement>(null);
  const orbSize = useOrbSize();
  const pairing = PAIRINGS[idx];
  const atmo_ = atmoToProps(atmo);

  const goTo = useCallback((newIdx: number) => {
    setIdx((prev) => {
      const wrapped = ((newIdx % PAIRINGS.length) + PAIRINGS.length) % PAIRINGS.length;
      if (wrapped === prev) return prev;
      setTransitionKey((k) => k + 1);
      return wrapped;
    });
  }, []);

  const nav = useCallback((dir: number) => {
    setIdx((prev) => {
      const next = ((prev + dir) % PAIRINGS.length + PAIRINGS.length) % PAIRINGS.length;
      setTransitionKey((k) => k + 1);
      return next;
    });
  }, []);

  const shuffle = useCallback(() => {
    setIdx((prev) => {
      let next = Math.floor(Math.random() * PAIRINGS.length);
      if (next === prev) next = (next + 1) % PAIRINGS.length;
      setTransitionKey((k) => k + 1);
      return next;
    });
  }, []);

  const handleExport = useCallback(() => {
    if (format === 'svg') {
      exportSVG(pairing, atmo_);
    } else {
      exportPNG(pairing, atmo_, size);
    }
  }, [format, pairing, atmo_, size]);

  const hideScrollHint = useCallback(() => setScrollHintVisible(false), []);

  useKeyboardNav(nav, shuffle);
  useWheelNav(stageRef, nav, hideScrollHint);
  useTouchNav(stageRef, nav);

  /* Auto-fade scroll hint after 4s */
  useEffect(() => {
    const t = setTimeout(() => setScrollHintVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  /* Sync body background to active pairing */
  useEffect(() => {
    document.body.style.background = pairing.bg;
  }, [pairing.bg]);

  return (
    <>
      <div id="export-flash" className={s.exportFlash} />
      <Wordmark />
      <KeyboardHint />

      <div
        className={s.scrollHint}
        style={{ opacity: scrollHintVisible ? 1 : 0 }}
      >
        scroll to explore
      </div>

      <div ref={stageRef} className={s.stage}>
        <Orb
          pairing={pairing}
          atmoProps={atmo_}
          orbSize={orbSize}
          transitionKey={transitionKey}
        />
      </div>

      <div className={s.controls}>
        <div className={s.dialMeta}>
          <span className={s.dialName}>{pairing.name}</span>
        </div>

        <ChipStrip
          pairings={PAIRINGS}
          activeIdx={idx}
          onSelect={goTo}
          onNav={nav}
        />

        <AtmoSlider value={atmo} onChange={setAtmo} />

        <ExportBar
          size={size}
          format={format}
          onSizeChange={setSize}
          onFormatChange={setFormat}
          onExport={handleExport}
          onShuffle={shuffle}
        />
      </div>
    </>
  );
}
