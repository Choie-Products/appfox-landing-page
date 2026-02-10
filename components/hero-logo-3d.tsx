'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import type { InterpolatedValues } from '@/hooks/use-scroll-keyframes';

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#fafafa'),
  transmission: 0.97,
  thickness: 0.8,
  roughness: 0.0,
  metalness: 0,
  ior: 1.8,
  reflectivity: 0.08,
  clearcoat: 1,
  clearcoatRoughness: 0.0,
  envMapIntensity: 0.6,
  transparent: true,
  iridescence: 1,
  iridescenceIOR: 1.5,
  iridescenceThicknessRange: [100, 500],
  specularIntensity: 0.5,
  specularColor: new THREE.Color('#ffffff'),
  dispersion: 4,
  attenuationColor: new THREE.Color('#f5e6d3'),
  attenuationDistance: 2,
  sheen: 0.1,
  sheenColor: new THREE.Color('#e0d8f0'),
  sheenRoughness: 0.2,
});

function Model({
  controlRef,
}: {
  controlRef: React.RefObject<InterpolatedValues | null>;
}) {
  const { scene } = useGLTF('/appfox-logo.glb');
  const ref = useRef<THREE.Group>(null);
  const clone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = glassMaterial;
      }
    });
  }, [clone]);

  useFrame((_, delta) => {
    if (!ref.current || !controlRef.current) return;
    const v = controlRef.current;

    // Scroll-driven auto-rotation
    ref.current.rotation.y -= delta * v.autoRotateSpeed;

    // Scroll-driven scale (lerp toward target for smoothness)
    const targetScale = v.scale * 0.32;
    ref.current.scale.setScalar(
      THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.1),
    );

    // Scroll-driven rotation offset on X axis
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -0.25 + v.rotationY * 0.15,
      0.1,
    );

    // Drive glass opacity/transmission
    glassMaterial.opacity = v.opacity;
    glassMaterial.transmission = 0.97 * v.opacity;
  });

  return (
    <primitive
      ref={ref}
      object={clone}
      scale={0.32}
      position={[0, 0, 0]}
      rotation={[-0.25, 0, 0]}
    />
  );
}

export default function HeroLogo3D({
  controlRef,
}: {
  controlRef: React.RefObject<InterpolatedValues | null>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.5;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight
        position={[-4, 3, -2]}
        intensity={0.8}
        color="#e8e0f0"
      />
      <directionalLight
        position={[0, -2, 4]}
        intensity={0.6}
        color="#fff5ee"
      />
      <directionalLight
        position={[-2, 5, 0]}
        intensity={0.4}
        color="#f0f0ff"
      />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Model controlRef={controlRef} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/appfox-logo.glb');
