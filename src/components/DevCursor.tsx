import React, { useEffect, useRef } from "react";

type Burst = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

const DevCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const angle = useRef(0);

  const bursts = useRef<Burst[]>([]);
  const particles = useRef<Particle[]>([]);

  const lastMove = useRef(0);
  const opacity = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ✅ Detect mobile
    const isMobile = window.innerWidth < 768;

    // ✅ DPR optimization
    const dpr = isMobile ? 1 : window.devicePixelRatio || 1;

    lastMove.current = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      lastMove.current = Date.now();
    };

    const handleClick = (e: MouseEvent) => {
      // Ring burst
      bursts.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        alpha: 1,
      });

      // ✅ Adaptive particle count
      const count = isMobile ? 6 : 12;

      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: isMobile ? 2 : 4,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    // ✅ Delta time setup
    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTime) / 16.67; // normalize to 60fps
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // === Idle detection ===
      const isIdle = Date.now() - lastMove.current > 150;
      const targetOpacity = isIdle ? 0.3 : 1;
      opacity.current += (targetOpacity - opacity.current) * 0.1 * delta;

      // === Smooth follow (delta fixed) ===
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15 * delta;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15 * delta;

      const x = pos.current.x;
      const y = pos.current.y;

      angle.current += 0.03 * delta;

      // === CURSOR DRAW ===
      ctx.save();
      ctx.globalAlpha = opacity.current;

      // Core
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#00ffff";
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = isMobile ? 0 : 20 * opacity.current;
      ctx.fill();

      // Pulsing ring
      const pulse = 10 + Math.sin(Date.now() * 0.005) * 2;
      ctx.beginPath();
      ctx.arc(x, y, pulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,255,255,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating dashed ring
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle.current);
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,255,255,0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // ✅ Disable orbit particles on mobile
      if (!isMobile) {
        for (let i = 0; i < 3; i++) {
          const orbitAngle = angle.current + (i * Math.PI * 2) / 3;
          const radius = 18;
          const ox = x + Math.cos(orbitAngle) * radius;
          const oy = y + Math.sin(orbitAngle) * radius;

          ctx.beginPath();
          ctx.arc(ox, oy, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#00ffff";
          ctx.fill();
        }
      }

      ctx.restore();

      // === BURSTS ===
      bursts.current.forEach((b, i) => {
        b.radius += 2.5 * delta;
        b.alpha -= 0.03 * delta;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,255,${b.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (b.alpha <= 0) bursts.current.splice(i, 1);
      });

      // === PARTICLES ===
      particles.current.forEach((p, i) => {
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.life -= (isMobile ? 0.05 : 0.03) * delta;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,255,${p.life})`;
        ctx.fill();

        if (p.life <= 0) particles.current.splice(i, 1);
      });

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    />
  );
};

export default DevCursor;