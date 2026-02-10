'use client';

import { useEffect, useRef, useState } from 'react';
import {
  useScrollKeyframes,
  type SectionKeyframe,
} from '@/hooks/use-scroll-keyframes';
import HeroLogo3DLoader from './hero-logo-3d-loader';

const KEYFRAMES: SectionKeyframe[] = [
  {
    sectionId: 'hero',
    x: 65,
    y: 25,
    scale: 1.0,
    rotationY: 0,
    opacity: 1.0,
    autoRotateSpeed: 0.3,
  },
  {
    sectionId: 'features',
    x: 85,
    y: 25,
    scale: 0.6,
    rotationY: 0.5,
    opacity: 0.7,
    autoRotateSpeed: 0.5,
  },
  {
    sectionId: 'how-it-works',
    x: 10,
    y: 50,
    scale: 0.5,
    rotationY: -0.5,
    opacity: 0.5,
    autoRotateSpeed: 0.4,
  },
  {
    sectionId: 'stats',
    x: 50,
    y: 40,
    scale: 0.4,
    rotationY: 0,
    opacity: 0.3,
    autoRotateSpeed: 0.2,
  },
  {
    sectionId: 'developers',
    x: 50,
    y: 35,
    scale: 0.35,
    rotationY: 0.2,
    opacity: 0.15,
    autoRotateSpeed: 0.15,
  },
  {
    sectionId: 'footer',
    x: 50,
    y: 35,
    scale: 0.3,
    rotationY: 0,
    opacity: 0.0,
    autoRotateSpeed: 0.1,
  },
];

const CONTAINER_SIZE = 480;

export default function Scroll3DOverlay() {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useScrollKeyframes(KEYFRAMES);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    function onChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    function tick() {
      const el = containerRef.current;
      const v = valuesRef.current;
      if (el && v) {
        const px = (v.x / 100) * window.innerWidth - CONTAINER_SIZE / 2;
        const py = (v.y / 100) * window.innerHeight - CONTAINER_SIZE / 2;
        el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
        el.style.opacity = String(v.opacity);
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isDesktop, valuesRef]);

  if (!isDesktop) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-40 pointer-events-none"
      style={{
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        willChange: 'transform, opacity',
      }}
    >
      <HeroLogo3DLoader controlRef={valuesRef} />
    </div>
  );
}
