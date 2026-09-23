import { useEffect, useRef } from "react";

interface Fly {
  x: number;
  y: number;
  tx: number;
  ty: number;
  heading: number;
  speed: number;
  retargetAt: number;
  r: number;
  glow: number;
  phase: number;
  twinkleSpeed: number;
  jitterSeed: number;
  jitterFreq: number;
  color: [number, number, number];
}

const COLORS: [number, number, number][] = [
  [240, 255, 180],
  [190, 242, 100],
];

function pickTarget(W: number, ground: number) {
  const safeH = Math.max(ground * 0.85, 20);
  return { tx: Math.random() * W, ty: Math.random() * safeH };
}

function spawn(W: number, ground: number, t: number, initial = false): Fly {
  const c = COLORS[Math.random() < 0.35 ? 0 : 1] ?? [240, 255, 180];
  const safeH = Math.max(ground * 0.9, 20);
  const target = pickTarget(W, ground);
  const dart = Math.random() < 0.15;
  return {
    x: Math.random() * W,
    y: initial ? Math.random() * safeH : Math.random() * Math.min(safeH, 80),
    tx: target.tx,
    ty: target.ty,
    heading: Math.random() * Math.PI * 2,
    speed: dart ? 95 + Math.random() * 45 : 30 + Math.random() * 45,
    retargetAt: t + 1.8 + Math.random() * 3.2,
    r: 1.1 + Math.random() * 1.5,
    glow: 7 + Math.random() * 9,
    phase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.8 + Math.random() * 1.6,
    jitterSeed: Math.random() * 10,
    jitterFreq: 1.5 + Math.random() * 2,
    color: c,
  };
}

function turnToward(current: number, target: number, maxStep: number): number {
  let diff = (target - current) % (Math.PI * 2);
  if (diff < -Math.PI) diff += Math.PI * 2;
  if (diff > Math.PI) diff -= Math.PI * 2;
  const step = Math.sign(diff) * Math.min(Math.abs(diff), maxStep);
  return current + step;
}

export default function FirefliesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let flies: Fly[] = [];
    let W = 0;
    let H = 0;
    let rafId = 0;
    let running = false;
    let lastTime = performance.now();
    let footerEl: HTMLElement | null = null;

    // Screen-space "ground" line: top edge of the underground footer.
    function getGroundY(): number {
      if (!footerEl) footerEl = document.querySelector<HTMLElement>("footer.underground");
      if (!footerEl) return H;
      const rect = footerEl.getBoundingClientRect();
      return Math.max(0, Math.min(H, rect.top));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initFlies() {
      const ground = getGroundY();
      const count = Math.round(Math.min(46, Math.max(22, (W * H) / 34000)));
      flies = [];
      const t = performance.now() / 1000;
      for (let i = 0; i < count; i++) flies.push(spawn(W, ground, t, true));
    }

    function drawFly(f: Fly, t: number, ground: number) {
      // No fireflies underground.
      if (f.y >= ground) return;

      // Soft fade when approaching ground.
      const groundAlpha = Math.max(0, Math.min(1, (ground - f.y) / 50));
      const tw = (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(f.phase + t * f.twinkleSpeed))) * groundAlpha;
      if (tw <= 0.01) return;

      const jx = Math.sin(t * f.jitterFreq + f.jitterSeed) * 2.5;
      const jy = Math.cos(t * f.jitterFreq * 0.8 + f.jitterSeed) * 2;
      const x = f.x + jx;
      const y = f.y + jy;
      const c = f.color;

      const g = ctx!.createRadialGradient(x, y, 0, x, y, f.glow);
      g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${0.55 * tw})`);
      g.addColorStop(0.4, `rgba(${c[0]},${c[1]},${c[2]},${0.15 * tw})`);
      g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(x, y, f.glow, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.fillStyle = `rgba(255,255,240,${0.9 * tw})`;
      ctx!.beginPath();
      ctx!.arc(x, y, f.r, 0, Math.PI * 2);
      ctx!.fill();
    }

    function frame(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = now / 1000;
      const ground = getGroundY();

      ctx!.clearRect(0, 0, W, H);

      // Footer covers whole viewport: all flies are underground.
      if (ground > 10) {
        for (let i = 0; i < flies.length; i++) {
          const f = flies[i];
          if (!f) continue;

          // Ground scrolled above the fly: respawn above ground.
          if (f.y >= ground) {
            flies[i] = spawn(W, ground, t, false);
            continue;
          }

          // Retarget when reached, expired, or target sank underground.
          const dx = f.tx - f.x;
          const dy = f.ty - f.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 40 || t > f.retargetAt || f.ty >= ground - 20) {
            const next = pickTarget(W, ground);
            f.tx = next.tx;
            f.ty = next.ty;
            const dart = Math.random() < 0.2;
            f.speed = dart ? 95 + Math.random() * 50 : 28 + Math.random() * 48;
            f.retargetAt = t + 1.8 + Math.random() * 3.5;
          }

          const targetAngle = Math.atan2(f.ty - f.y, f.tx - f.x);
          f.heading = turnToward(f.heading, targetAngle, 2.4 * dt);

          // Gentle avoidance before touching ground.
          let vyBoost = 0;
          if (f.y > ground - 70) vyBoost = -(((f.y - (ground - 70)) / 70) * 40);

          f.x += Math.cos(f.heading) * f.speed * dt;
          f.y += Math.sin(f.heading) * f.speed * dt + vyBoost * dt;

          // Wrap edges horizontally.
          if (f.x < -30) f.x = W + 30;
          if (f.x > W + 30) f.x = -30;

          // Top bound bounces back down.
          if (f.y < -30) {
            f.y = -20;
            f.heading = Math.PI / 2;
          }

          drawFly(f, t, ground);
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
      ctx!.clearRect(0, 0, W, H);
    }

    resize();
    initFlies();
    start();

    function handleResize() {
      resize();
      initFlies();
    }

    function handleVisibility() {
      if (document.hidden) stop();
      else start();
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas id="fireflies" ref={canvasRef} className="fixed inset-0 z-[6] pointer-events-none" />
  );
}
