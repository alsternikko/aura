import { useEffect, useRef, type RefObject } from 'react';

export function useTouchNav(
  ref: RefObject<HTMLElement | null>,
  onNav: (dir: number) => void,
): void {
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      touchX.current = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) onNav(dx < 0 ? 1 : -1);
      touchX.current = null;
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchend', onEnd);
    };
  }, [ref, onNav]);
}
