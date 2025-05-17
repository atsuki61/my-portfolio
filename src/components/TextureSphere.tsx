'use client';

import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import { useRef, useEffect, useState } from 'react';
import { a, useSpring } from '@react-spring/three';

type Props = {
  textureURL: string;
  onClick?: () => void;
  rotationSpeed?: number;
};

export default function TextureSphere({ textureURL, onClick, rotationSpeed = 0.02 }: Props) {
  const mesh = useRef<Mesh>(null!);
  const [currentURL, setCurrentURL] = useState(textureURL);
  const { mouse } = useThree();

  const texture = useLoader(TextureLoader, currentURL);

  const [{ opacity, scale }, api] = useSpring(() => ({
    opacity: 1,
    scale: 1,
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  useEffect(() => {
    if (currentURL === textureURL) return;

    api.start({
      opacity: 0,
      scale: 0.8,
      onRest: () => {
        setCurrentURL(textureURL);
        api.start({ opacity: 1, scale: 1 });
      },
    });
  }, [textureURL, api, currentURL]);

  useFrame((_state: unknown, delta: number) => {
    mesh.current.rotation.y += delta * rotationSpeed;

    const PARALLAX = 0.5;
    const EASING = 0.1;

    const targetX = mouse.x * PARALLAX;
    const targetY = mouse.y * PARALLAX;

    mesh.current.position.x += (targetX - mesh.current.position.x) * EASING;
    mesh.current.position.y += (targetY - mesh.current.position.y) * EASING;
  });

  return (
    <a.mesh
      ref={mesh}
      scale={scale}
      onDoubleClick={onClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <sphereGeometry args={[1.7, 64, 64]} />
      <a.meshPhongMaterial
        map={texture}
        shininess={100}
        specular="#ffffff"
        transparent={true}
        opacity={opacity}
      />
    </a.mesh>
  );
}
