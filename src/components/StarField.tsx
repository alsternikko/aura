import { useRef, useEffect, useCallback } from 'react';
import s from './StarField.module.css';

const STAR_DENSITY = 0.00018;
const TWINKLE_PROBABILITY = 0.7;
const MIN_TWINKLE_SPEED = 0.5;
const MAX_TWINKLE_SPEED = 1.2;

const STAR_COLORS = [
  [255, 255, 255],
  [255, 252, 245],
  [255, 248, 240],
  [240, 245, 255],
  [248, 248, 255],
] as const;

interface Star {
  x: number;
  y: number;
  radius: number;
  color: readonly [number, number, number];
  baseAlpha: number;
  twinkles: boolean;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  speed: number;
  life: number;
  maxLife: number;
  width: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function createStars(w: number, h: number): Star[] {
  const count = Math.round(w * h * STAR_DENSITY);
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    const sizeRoll = Math.random();
    let radius: number;
    let baseAlpha: number;

    if (sizeRoll > 0.995) {
      radius = lerp(1.4, 2.0, Math.random());
      baseAlpha = lerp(0.6, 0.9, Math.random());
    } else if (sizeRoll > 0.95) {
      radius = lerp(0.8, 1.4, Math.random());
      baseAlpha = lerp(0.35, 0.6, Math.random());
    } else {
      radius = lerp(0.2, 0.8, Math.random());
      baseAlpha = lerp(0.1, 0.35, Math.random());
    }

    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      baseAlpha,
      twinkles: Math.random() < TWINKLE_PROBABILITY,
      twinkleSpeed:
        lerp(MIN_TWINKLE_SPEED, MAX_TWINKLE_SPEED, Math.random()) * 1000,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }

  return stars;
}

function spawnShootingStar(w: number, h: number): ShootingStar {
  const edge = Math.floor(Math.random() * 4);
  let x: number, y: number;

  switch (edge) {
    case 0: x = Math.random() * w; y = -10; break;
    case 1: x = w + 10; y = Math.random() * h; break;
    case 2: x = Math.random() * w; y = h + 10; break;
    default: x = -10; y = Math.random() * h; break;
  }

  const targetX = w * 0.2 + Math.random() * w * 0.6;
  const targetY = h * 0.2 + Math.random() * h * 0.6;
  const dx = targetX - x;
  const dy = targetY - y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const speed = lerp(12, 28, Math.random());
  const maxLife = dist / speed;

  return {
    x,
    y,
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed,
    length: lerp(60, 140, Math.random()),
    speed,
    life: 0,
    maxLife,
    width: lerp(0.8, 1.6, Math.random()),
  };
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const rafRef = useRef(0);
  const nextSpawnRef = useRef(0);
  const dimsRef = useRef({ w: 0, h: 0 });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    dimsRef.current = { w, h };
    starsRef.current = createStars(w, h);

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    resize();
    nextSpawnRef.current = performance.now() + lerp(3000, 7000, Math.random());

    function draw(t: number) {
      const { w, h } = dimsRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const star of starsRef.current) {
        let alpha = star.baseAlpha;
        if (star.twinkles) {
          const cycle = (t + star.twinklePhase) / star.twinkleSpeed;
          const wave = Math.sin(cycle * Math.PI * 2);
          alpha = star.baseAlpha + wave * star.baseAlpha * 0.6;
          alpha = Math.max(0.02, Math.min(1, alpha));
        }

        const [cr, cg, cb] = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      if (t > nextSpawnRef.current) {
        shootingRef.current.push(spawnShootingStar(w, h));
        nextSpawnRef.current = t + lerp(4200, 9000, Math.random());
      }

      shootingRef.current = shootingRef.current.filter((ss) => {
        ss.life += 1;
        ss.x += ss.vx;
        ss.y += ss.vy;

        const progress = ss.life / ss.maxLife;
        if (progress > 1) return false;

        const fadeIn = Math.min(progress * 5, 1);
        const fadeOut = 1 - Math.max((progress - 0.6) / 0.4, 0);
        const opacity = fadeIn * fadeOut * 0.7;

        const tailX = ss.x - (ss.vx / ss.speed) * ss.length;
        const tailY = ss.y - (ss.vy / ss.speed) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(255,255,255,${(opacity * 0.3).toFixed(3)})`);
        grad.addColorStop(1, `rgba(255,255,255,${opacity.toFixed(3)})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width * (1 + progress * 0.4);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(opacity * 0.9).toFixed(3)})`;
        ctx.fill();
        ctx.restore();

        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  return <canvas ref={canvasRef} className={s.canvas} />;
}
