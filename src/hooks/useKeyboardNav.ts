import { useEffect } from 'react';

export function useKeyboardNav(
  onNav: (dir: number) => void,
  onShuffle: () => void,
): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNav(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNav(1);
      } else if (e.key === ' ') {
        e.preventDefault();
        onShuffle();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onNav, onShuffle]);
}
