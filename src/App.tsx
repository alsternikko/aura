import { useState, useCallback, useRef, useEffect } from 'react';
import { PAIRINGS } from './tokens/pairings.ts';
import type { Pairing } from './tokens/pairings.ts';
import { atmoToProps } from './lib/gradient.ts';
import { exportPNG } from './lib/exportPNG.ts';
import { exportSVG } from './lib/exportSVG.ts';
import { generateRandomPairing } from './lib/randomPairing.ts';
import { useOrbSize } from './hooks/useOrbSize.ts';
import { useKeyboardNav } from './hooks/useKeyboardNav.ts';
import { useWheelNav } from './hooks/useWheelNav.ts';
import { useTouchNav } from './hooks/useTouchNav.ts';
import { Wordmark } from './components/Wordmark.tsx';
import { KeyboardHint } from './components/KeyboardHint.tsx';
import { Orb } from './components/Orb.tsx';
import { ChipStrip } from './components/ChipStrip.tsx';
import { AtmoSlider } from './components/AtmoSlider.tsx';
import { EffectToggles } from './components/EffectToggles.tsx';
import { ExportBar } from './components/ExportBar.tsx';
import { StarField } from './components/StarField.tsx';
import s from './App.module.css';

export default function App() {
  const [pairings, setPairings] = useState<Pairing[]>(() => [...PAIRINGS]);
  const [idx, setIdx] = useState(0);
  const [atmo, setAtmo] = useState(45);
  const [size, setSize] = useState(1024);
  const [format, setFormat] = useState<'png' | 'svg'>('svg');
  const [transitionKey, setTransitionKey] = useState(0);
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const [grainOn, setGrainOn] = useState(true);
  const [starsOn, setStarsOn] = useState(true);

  const stageRef = useRef<HTMLDivElement>(null);
  const pairingsRef = useRef(pairings);
  pairingsRef.current = pairings;

  const orbSize = useOrbSize();
  const pairing = pairings[idx];
  const atmo_ = atmoToProps(atmo);

  const goTo = useCallback((newIdx: number) => {
    const len = pairingsRef.current.length;
    const wrapped = ((newIdx % len) + len) % len;
    setIdx((prev) => {
      if (wrapped === prev) return prev;
      setTransitionKey((k) => k + 1);
      return wrapped;
    });
  }, []);

  const nav = useCallback((dir: number) => {
    setIdx((prev) => {
      const len = pairingsRef.current.length;
      const next = ((prev + dir) % len + len) % len;
      setTransitionKey((k) => k + 1);
      return next;
    });
  }, []);

  const randomize = useCallback(() => {
    const newPairing = generateRandomPairing();
    setPairings((ps) => {
      const next = [...ps, newPairing];
      setIdx(next.length - 1);
      setTransitionKey((k) => k + 1);
      return next;
    });
  }, []);

  const handleExport = useCallback(() => {
    if (format === 'svg') {
      exportSVG(pairing, atmo_, grainOn);
    } else {
      exportPNG(pairing, atmo_, size, grainOn);
    }
  }, [format, pairing, atmo_, size, grainOn]);

  const hideScrollHint = useCallback(() => setScrollHintVisible(false), []);

  useKeyboardNav(nav, randomize);
  useWheelNav(stageRef, nav, hideScrollHint);
  useTouchNav(stageRef, nav);

  useEffect(() => {
    const t = setTimeout(() => setScrollHintVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.background = pairing.bg;
  }, [pairing.bg]);

  return (
    <>
      <div id="export-flash" className={s.exportFlash} />
      {starsOn && <StarField />}
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
          grainOn={grainOn}
          orbSize={orbSize}
          transitionKey={transitionKey}
        />
      </div>

      <div className={s.controls}>
        <div className={s.dialMeta}>
          <span className={s.dialName}>{pairing.name}</span>
        </div>

        <ChipStrip
          pairings={pairings}
          activeIdx={idx}
          onSelect={goTo}
          onNav={nav}
        />

        <AtmoSlider value={atmo} onChange={setAtmo} />

        <EffectToggles
          grainOn={grainOn}
          starsOn={starsOn}
          onGrainToggle={() => setGrainOn((v) => !v)}
          onStarsToggle={() => setStarsOn((v) => !v)}
        />

        <ExportBar
          size={size}
          format={format}
          onSizeChange={setSize}
          onFormatChange={setFormat}
          onExport={handleExport}
          onRandomize={randomize}
        />
      </div>
    </>
  );
}
