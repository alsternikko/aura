import s from './AtmoSlider.module.css';

interface AtmoSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function AtmoSlider({ value, onChange }: AtmoSliderProps) {
  return (
    <div className={s.row}>
      <span className={s.label}>Sharp</span>
      <input
        type="range"
        className={s.slider}
        min={0}
        max={100}
        value={value}
        onInput={(e) => onChange(+(e.target as HTMLInputElement).value)}
      />
      <span className={`${s.label} ${s.labelEnd}`}>Atmospheric</span>
    </div>
  );
}
