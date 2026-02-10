'use client';

import { useEffect, useRef } from 'react';

export interface SectionKeyframe {
  sectionId: string;
  x: number;       // % of viewport width
  y: number;       // % of viewport height
  scale: number;
  rotationY: number; // radians offset
  opacity: number;
  autoRotateSpeed: number;
}

export interface InterpolatedValues {
  x: number;
  y: number;
  scale: number;
  rotationY: number;
  opacity: number;
  autoRotateSpeed: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function lerpKeyframes(
  a: SectionKeyframe,
  b: SectionKeyframe,
  t: number,
): InterpolatedValues {
  const s = smoothstep(0, 1, t);
  return {
    x: lerp(a.x, b.x, s),
    y: lerp(a.y, b.y, s),
    scale: lerp(a.scale, b.scale, s),
    rotationY: lerp(a.rotationY, b.rotationY, s),
    opacity: lerp(a.opacity, b.opacity, s),
    autoRotateSpeed: lerp(a.autoRotateSpeed, b.autoRotateSpeed, s),
  };
}

const DAMPING = 0.08;

export function useScrollKeyframes(keyframes: SectionKeyframe[]) {
  const valuesRef = useRef<InterpolatedValues>({
    x: keyframes[0].x,
    y: keyframes[0].y,
    scale: keyframes[0].scale,
    rotationY: keyframes[0].rotationY,
    opacity: keyframes[0].opacity,
    autoRotateSpeed: keyframes[0].autoRotateSpeed,
  });

  const targetRef = useRef<InterpolatedValues>({ ...valuesRef.current });
  const sectionOffsetsRef = useRef<{ top: number; height: number }[]>([]);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    function cacheSectionOffsets() {
      const offsets: { top: number; height: number }[] = [];
      for (const kf of keyframes) {
        const el = document.querySelector(
          `[data-scroll-section="${kf.sectionId}"]`,
        );
        if (el) {
          const rect = el as HTMLElement;
          offsets.push({ top: rect.offsetTop, height: rect.offsetHeight });
        } else {
          offsets.push({ top: 0, height: 0 });
        }
      }
      sectionOffsetsRef.current = offsets;
    }

    cacheSectionOffsets();

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(cacheSectionOffsets, 200);
    }
    window.addEventListener('resize', onResize);

    function tick() {
      const scrollY = window.scrollY;
      const offsets = sectionOffsetsRef.current;

      if (offsets.length >= 2) {
        // Find which segment we're in
        let segIndex = 0;
        let segProgress = 0;

        for (let i = 0; i < offsets.length - 1; i++) {
          const start = offsets[i].top;
          const end = offsets[i + 1].top;
          if (scrollY >= start && scrollY < end) {
            segIndex = i;
            segProgress = (scrollY - start) / (end - start);
            break;
          }
          if (scrollY >= offsets[offsets.length - 1].top) {
            segIndex = offsets.length - 2;
            segProgress = 1;
          }
        }

        const target = lerpKeyframes(
          keyframes[segIndex],
          keyframes[segIndex + 1],
          clamp(segProgress, 0, 1),
        );
        targetRef.current = target;
      }

      // Exponential damping
      const v = valuesRef.current;
      const t = targetRef.current;
      v.x += (t.x - v.x) * DAMPING;
      v.y += (t.y - v.y) * DAMPING;
      v.scale += (t.scale - v.scale) * DAMPING;
      v.rotationY += (t.rotationY - v.rotationY) * DAMPING;
      v.opacity += (t.opacity - v.opacity) * DAMPING;
      v.autoRotateSpeed += (t.autoRotateSpeed - v.autoRotateSpeed) * DAMPING;

      rafIdRef.current = requestAnimationFrame(tick);
    }

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, [keyframes]);

  return valuesRef;
}
