import s from './ExportBar.module.css';

type ExportFormat = 'png' | 'svg';

interface ExportBarProps {
  size: number;
  format: ExportFormat;
  onSizeChange: (sz: number) => void;
  onFormatChange: (fmt: ExportFormat) => void;
  onExport: () => void;
  onShuffle: () => void;
}

const SIZES = [512, 1024, 2048] as const;

export function ExportBar({
  size,
  format,
  onSizeChange,
  onFormatChange,
  onExport,
  onShuffle,
}: ExportBarProps) {
  return (
    <div className={s.row}>
      <button className={s.shuffle} onClick={onShuffle}>
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4h2a4 4 0 0 1 3.2 1.6L10 10a4 4 0 0 0 3.2 1.6" />
          <path d="M10 4a4 4 0 0 1 3.2 1.6" />
          <path d="M1 11.6A4 4 0 0 0 4.2 10" />
          <path d="M11.5 2.5 13 4l-1.5 1.5" />
          <path d="M11.5 9.5 13 11l-1.5 1.5" />
        </svg>
        Shuffle
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
