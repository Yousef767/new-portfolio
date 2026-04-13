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

  const mouse = useRef({ x: -20, y: -20});
  const pos = useRef({ x: -20, y: -20 });
  const angle = useRef(0);

  const bursts = useRef<Burst[]>([]);
  const particles = useRef<Particle[]>([]);

  const lastMove = useRef(0);
  const opacity = useRef(1);

  // ✅ NEW: hover detection
  const isHovering = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
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

    // ✅ Detect hover on .hoverEffect
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = target.closest(".hoverEffect") !== null;
    };

    const handleClick = (e: MouseEvent) => {
      bursts.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        alpha: 1,
      });

      const count = isMobile ? 6 : 12;

      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: isMobile ? 2 : 3,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTime) / 16.67;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isIdle = Date.now() - lastMove.current > 1000;
      const targetOpacity = isIdle ? 0.3 : 1;
      opacity.current += (targetOpacity - opacity.current) * 0.1 * delta;

      pos.current.x += (mouse.current.x - pos.current.x) * 0.15 * delta;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15 * delta;

      const x = pos.current.x;
      const y = pos.current.y;

      // ✅ Faster animation when hovering
      angle.current += (isHovering.current ? 0.08 : 0.03) * delta;

      // === CURSOR DRAW ===
      ctx.save();
      ctx.globalAlpha = opacity.current;

      // ✅ Dynamic style on hover
      const size = isHovering.current ? 10 : 6;
      const color = isHovering.current ? "#00ffff" : "#00ffff";

      // Core
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = isHovering.current ? 30 : 20 * opacity.current;
      ctx.fill();

      // Pulsing ring
      const pulse =
        (isHovering.current ? 16 : 10) +
        Math.sin(Date.now() * 0.005) * 2;

      ctx.beginPath();
      ctx.arc(x, y, pulse, 0, Math.PI * 2);
      ctx.strokeStyle = isHovering.current
        ? "rgba(0,255,255,0.6)"
        : "rgba(0,255,255,0.4)";
      ctx.lineWidth = isHovering.current ? 2 : 1;
      ctx.stroke();

      // Rotating dashed ring
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle.current);
      ctx.setLineDash([4, 6]);

      ctx.beginPath();
      ctx.arc(0, 0, isHovering.current ? 24 : 18, 0, Math.PI * 2);
      ctx.strokeStyle = isHovering.current
        ? "rgba(0,255,255,0.6)"
        : "rgba(0,255,255,0.6)";
      ctx.lineWidth = isHovering.current ? 2.5 : 1.5;
      ctx.stroke();

      ctx.restore();

      // Orbit particles (desktop only)
      if (!isMobile) {
        for (let i = 0; i < 3; i++) {
          const orbitAngle = angle.current + (i * Math.PI * 2) / 3;
          const radius = isHovering.current ? 24 : 18;

          const ox = x + Math.cos(orbitAngle) * radius;
          const oy = y + Math.sin(orbitAngle) * radius;

          ctx.beginPath();
          ctx.arc(ox, oy, 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
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
      window.removeEventListener("mouseover", handleMouseOver);
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
      }}
    />
  );
};

export default DevCursor;