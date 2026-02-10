'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { InterpolatedValues } from '@/hooks/use-scroll-keyframes';

const HeroLogo3D = dynamic(() => import('./hero-logo-3d'), {
  ssr: false,
});

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') || canvas.getContext('webgl');
    return gl !== null;
  } catch {
    return false;
  }
}

export default function HeroLogo3DLoader({
  controlRef,
}: {
  controlRef: React.RefObject<InterpolatedValues | null>;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  if (supported === null || !supported) {
    return null;
  }

  return <HeroLogo3D controlRef={controlRef} />;
}
