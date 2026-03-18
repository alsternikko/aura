import s from './Wordmark.module.css';

export function Wordmark() {
  return (
    <div className={s.root}>
      <svg className={s.icon} width="15" height="12" viewBox="0 0 20 16" fill="currentColor">
        <rect x="0" y="5" width="13" height="3.2" rx="1.6" transform="rotate(-30 6.5 6.6)" />
        <rect x="6" y="5" width="13" height="3.2" rx="1.6" transform="rotate(-30 12.5 6.6)" />
      </svg>
      <span className={s.name}>Aura</span>
      <span className={s.sep}>/</span>
      <span className={s.sub}>Modulai</span>
    </div>
  );
}
