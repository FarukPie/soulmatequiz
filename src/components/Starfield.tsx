"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; phase: number; speed: number; hue: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteorAt = performance.now() + 3000;
    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.round((w * h) / 3200), 450);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() ** 3 * 1.6 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.8,
        hue: Math.random() < 0.15 ? 45 : Math.random() < 0.3 ? 260 : 220,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      for (const s of stars) {
        const a = reduceMotion ? 0.7 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 80%, 88%, ${a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.fillStyle = `hsla(${s.hue}, 90%, 80%, ${a * 0.12})`;
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (reduceMotion) return;

      if (!meteor && t > nextMeteorAt) {
        meteor = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, vx: -9, vy: 4, life: 1 };
      }
      if (meteor) {
        const m = meteor;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        grad.addColorStop(0, `rgba(255, 236, 190, ${m.life})`);
        grad.addColorStop(1, "rgba(255, 236, 190, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.012;
        if (m.life <= 0) {
          meteor = null;
          nextMeteorAt = t + 4000 + Math.random() * 6000;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduceMotion) draw(0);
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 h-full w-full" />;
}
