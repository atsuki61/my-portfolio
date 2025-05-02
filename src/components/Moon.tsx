// src/components/Moon.tsx
"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";
import { useRef } from "react";

//
// 1) Moon コンポーネント：SphereGeometry に満月テクスチャを貼ってゆっくり自転させつつ
//    マウス位置に応じてほんのりパララックス
//
export default function Moon() {
  // Mesh の参照用
  const mesh = useRef<Mesh>(null!);
  // public/images/moon_texture.jpg に配置した満月テクスチャをロード
  const texture = useLoader(TextureLoader, "/images/moon_texture.jpg");
  // Canvas 内のマウス座標を取得（-1 〜 +1）
  const { mouse } = useThree();

  useFrame((_, delta) => {
    // 自転アニメーション
    mesh.current.rotation.y += delta * 0.02;

    // ——— ここからパララックス追従 ———
    const PARALLAX = 0.5;      // 振れ幅
    const EASING    = 0.1;     // 滑らかさ（0〜1）

    // マウス座標をそのまま目標位置に
    const targetX = mouse.x * PARALLAX;
    const targetY = mouse.y * PARALLAX;

    // イージング：現在位置 → 目標位置へ少しずつ移動
    mesh.current.position.x += (targetX - mesh.current.position.x) * EASING;
    mesh.current.position.y += (targetY - mesh.current.position.y) * EASING;
    // —————————————
  });

  return (
    <mesh ref={mesh}>
      {/* 半径 2、幅細分割 64、縦細分割 64 */}
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial map={texture} />
    </mesh>
  );
}
