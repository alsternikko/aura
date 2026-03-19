import s from './ExportBar.module.css';

type ExportFormat = 'png' | 'svg';

interface ExportBarProps {
  size: number;
  format: ExportFormat;
  onSizeChange: (sz: number) => void;
  onFormatChange: (fmt: ExportFormat) => void;
  onExport: () => void;
  onRandomize: () => void;
}

const SIZES = [512, 1024, 2048] as const;

export function ExportBar({
  size,
  format,
  onSizeChange,
  onFormatChange,
  onExport,
  onRandomize,
}: ExportBarProps) {
  return (
    <div className={s.row}>
      <button className={s.randomize} onClick={onRandomize}>
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4h2.5C5 4 5.8 4.5 6.5 5.5L7.5 7l1 1.5c.7 1 1.5 1.5 3 1.5H13" />
          <path d="M1 10h2.5C5 10 5.8 9.5 6.5 8.5" />
          <path d="M8.5 5.5C9.2 4.5 10 4 11.5 4H13" />
          <path d="M11 2l2 2-2 2" />
          <path d="M11 8l2 2-2 2" />
        </svg>
        Randomize
      </button>

      <div className={s.exportGroup}>
        <div className={s.toggleGroup}>
          {SIZES.map((sz) => (
            <button
              key={sz}
              className={`${s.toggleBtn}${sz === size ? ` ${s.toggleBtnActive}` : ''}`}
              onClick={() => onSizeChange(sz)}
            >
              {sz}
            </button>
          ))}
        </div>

        <div className={s.toggleGroup}>
          {(['png', 'svg'] as const).map((fmt) => (
            <button
              key={fmt}
              className={`${s.toggleBtn}${fmt === format ? ` ${s.toggleBtnActive}` : ''}`}
              onClick={() => onFormatChange(fmt)}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>

        <button className={s.exportBtn} onClick={onExport}>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 1v7M3.5 6l2.5 2.5L9 6M1 9.5A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5" />
          </svg>
          Export
        </button>
      </div>
    </div>
  );
}
