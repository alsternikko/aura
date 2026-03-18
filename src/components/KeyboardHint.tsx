import s from './KeyboardHint.module.css';

export function KeyboardHint() {
  return (
    <div className={s.root}>
      <span className={s.key}>&larr;</span>
      <span className={s.key}>&rarr;</span>
      <span style={{ marginLeft: 2 }}>to navigate</span>
    </div>
  );
}
