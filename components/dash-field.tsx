"use client";

import { useEffect, useRef } from "react";

const ACCENT = "#FE5000";
const MAX_ANGLE = 0.9;
const HOVER_RADIUS = 108;
const FIELD_TIME = 1.4;

function field(nx: number, ny: number) {
  const front = 0.42 - ny * 0.18 + 0.08 * Math.sin(ny * 4.8 + FIELD_TIME * 0.5);
  const delta = nx - front;
  const rise = 1 / (1 + Math.exp(-delta * 11));
  return Math.min(1, Math.max(0, rise));
}

function lerpAngle(from: number, to: number, t: number) {
  let diff = to - from;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return from + diff * t;
}

export default function DashField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = media.matches;
    const onMotion = () => {
      reduced = media.matches;
    };
    media.addEventListener("change", onMotion);

    const pointer = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      active: 0,
      target: 0,
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      pointer.target = 1;
    };

    const onLeave = () => {
      pointer.target = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    let frame = 0;
    let running = true;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelW = Math.floor(width * dpr);
      const pixelH = Math.floor(height * dpr);

      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.2;
      pointer.y += (pointer.ty - pointer.y) * 0.2;
      pointer.active += (pointer.target - pointer.active) * 0.14;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = ACCENT;
      ctx.lineCap = "round";

      const dashLen = Math.max(10, width * 0.018);
      const gap = dashLen * 1.05;
      const stepX = dashLen + gap;
      const stepY = Math.max(14, height * 0.022);
      const radius = HOVER_RADIUS;
      const hoverOn = !reduced && pointer.active > 0.01;

      ctx.lineWidth = Math.max(1.2, width * 0.0022);

      for (let y = stepY * 0.5; y < height; y += stepY) {
        for (let x = stepX * 0.25; x < width; x += stepX) {
          const inf = field(x / width, y / height);
          let angle = inf * MAX_ANGLE;
          let len = dashLen * (0.72 + inf * 0.5);
          let alpha = 0.42 + inf * 0.5;

          if (hoverOn) {
            const dx = pointer.x - x;
            const dy = pointer.y - y;
            const dist = Math.hypot(dx, dy);
            if (dist < radius) {
              const t = 1 - dist / radius;
              const falloff = t * t * (3 - 2 * t) * pointer.active;
              const swirl = Math.atan2(dy, dx) + Math.PI / 2;
              angle = lerpAngle(angle, swirl, falloff);
              len *= 1 + falloff * 0.55;
              alpha = alpha + (1 - alpha) * falloff;
            }
          }

          const hx = Math.cos(angle) * len * 0.5;
          const hy = Math.sin(angle) * len * 0.5;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(x - hx, y - hy);
          ctx.lineTo(x + hx, y + hy);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!running) return;
      draw();
      if (!reduced) frame = window.requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      draw();
    });
    ro.observe(canvas);

    if (reduced) {
      draw();
    } else {
      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      ro.disconnect();
      media.removeEventListener("change", onMotion);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[min(62vw,920px)] overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          maskImage:
            "linear-gradient(to left, #000 0%, #000 46%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, #000 0%, #000 46%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 78%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "destination-in",
        }}
      />
    </div>
  );
}
