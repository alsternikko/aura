import { useState, useEffect } from 'react';

function calcOrbPx(): number {
  const controlsH = 180;
  const avW = window.innerWidth;
  const avH = window.innerHeight - controlsH;
  return Math.round(Math.min(avW * 0.78, avH * 0.88));
}

export function useOrbSize(): number {
  const [size, setSize] = useState(calcOrbPx);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setSize(calcOrbPx()), 120);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return size;
}
