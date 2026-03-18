import { useEffect, type RefObject } from 'react';

export function useWheelNav(
  ref: RefObject<HTMLElement | null>,
  onNav: (dir: number) => void,
  onFirstScroll?: () => void,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;
    let fired = false;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(timer);
      timer = setTimeout(() => {
        onNav(e.deltaY > 0 ? 1 : -1);
        if (!fired && onFirstScroll) {
          fired = true;
          onFirstScroll();
        }
      }, 40);
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => {
      clearTimeout(timer);
      el.removeEventListener('wheel', handler);
    };
  }, [ref, onNav, onFirstScroll]);
}
