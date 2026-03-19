import s from './EffectToggles.module.css';

interface EffectTogglesProps {
  grainOn: boolean;
  starsOn: boolean;
  onGrainToggle: () => void;
  onStarsToggle: () => void;
}

export function EffectToggles({ grainOn, starsOn, onGrainToggle, onStarsToggle }: EffectTogglesProps) {
  return (
    <div className={s.row}>
      <button
        className={`${s.toggle} ${grainOn ? s.active : ''}`}
        onClick={onGrainToggle}
        aria-pressed={grainOn}
      >
        <span className={s.indicator} />
        Grain
      </button>
      <button
        className={`${s.toggle} ${starsOn ? s.active : ''}`}
        onClick={onStarsToggle}
        aria-pressed={starsOn}
      >
        <span className={s.indicator} />
        Stars
      </button>
    </div>
  );
}
