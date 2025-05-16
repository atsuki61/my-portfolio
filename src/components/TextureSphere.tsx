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
  // 表示中のテクスチャ（内部 state）
  const [currentURL, setCurrentURL] = useState(textureURL);
  // Canvas 内のマウス座標を取得（-1 〜 +1）
  const { mouse } = useThree();

  // three.js のテクスチャローダー
  const texture = useLoader(TextureLoader, currentURL);

  // フェード用アニメーション
  const [{ opacity, scale }, api] = useSpring(() => ({
    opacity: 1,
    scale: 1,
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  // textureURL が変わったらフェードアウト→変更→フェードイン
  useEffect(() => {
    // すでに同じテクスチャなら何もしない
    if (currentURL === textureURL) return;

    // アニメーション開始
    api.start({
      opacity: 0,
      scale: 0.8,
      onRest: () => {
        setCurrentURL(textureURL);
        api.start({ opacity: 1, scale: 1 });
      },
    });
  }, [textureURL, api, currentURL]);

  // 自転アニメーション + パララックス効果
  useFrame((_state: unknown, delta: number) => {
    // 自転アニメーション（惑星によって回転速度が異なる）
    mesh.current.rotation.y += delta * rotationSpeed;

    // パララックス追従
    const PARALLAX = 0.5; // 振れ幅
    const EASING = 0.1; // 滑らかさ（0〜1）

    // マウス座標をそのまま目標位置に
    const targetX = mouse.x * PARALLAX;
    const targetY = mouse.y * PARALLAX;

    // イージング：現在位置 → 目標位置へ少しずつ移動
    mesh.current.position.x += (targetX - mesh.current.position.x) * EASING;
    mesh.current.position.y += (targetY - mesh.current.position.y) * EASING;
  });

  return (
    <a.mesh
      ref={mesh}
      scale={scale}
      onDoubleClick={onClick}
      // カーソルをポインターに変更してクリック可能なことを示す
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/* 半径 1.7、幅細分割 64、縦細分割 64 */}
      <sphereGeometry args={[1.7, 64, 64]} />
      <a.meshPhongMaterial map={texture} shininess={100} specular="#ffffff" transparent={true} opacity={opacity} />
    </a.mesh>
  );
}
