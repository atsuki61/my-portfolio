// src/components/sections/HeroSection.tsx
"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, Mesh } from "three";
import { useRef } from "react";

//
// 1) Moon コンポーネント：SphereGeometry に満月テクスチャを貼ってゆっくり自転させる
//
function Moon() {
  // Mesh の参照用
  const mesh = useRef<Mesh>(null!);
  // public/images/moon_texture.jpg に配置した満月テクスチャをロード
  const texture = useLoader(TextureLoader, "/images/moon_texture.jpg");

  // フレームごとにゆっくり回転
  useFrame((_, delta) => {
    mesh.current.rotation.y += delta * 0.02;
  });

  return (
    <mesh ref={mesh}>
      {/* 半径 2、幅細分割 64、縦細分割 64 */}
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial map={texture} />
    </mesh>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen bg-black overflow-hidden">
      <div className="flex h-full">
        {/* 左 1/3：テキスト */}
        <div className="w-full md:w-1/3 flex flex-col justify-center px-8 z-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Hi! My name is Atsuki!
          </h1>
          <p className="text-lg text-gray-300">
            Next.js × TypeScript × Tailwind で月のように輝くサイトを制作中
          </p>
        </div>

        {/* 右 2/3：満月の 3D Canvas */}
        <div className="w-full md:w-2/3 relative">
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 6], fov: 50 }}
          >
            {/* ライティング */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* 満月メッシュ */}
            <Moon />

            {/* マウスドラッグで視点操作 */}
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
