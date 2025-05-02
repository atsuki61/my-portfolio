// src/components/sections/HeroSection.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React from "react";
import Moon from "../Moon";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen bg-black overflow-hidden">
      {/* スマホ: 縦積み (flex-col) / md以上: 横並び (flex-row) */}
      <div className="flex flex-col md:flex-row h-full">
        {/* 左 1/3：テキスト */}
        <div className="w-full md:w-1/3 flex flex-col justify-center px-8 z-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Hi! My name is Atsuki!
          </h1>
          <p className="text-lg text-gray-300">
          I am a third-year student at Kyoto Computer Gakuin.
          </p>
        </div>

        {/* 右 2/3：満月の 3D Canvas */}
        <div className="w-full h-[70vh] md:h-auto md:w-2/3 relative">
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 4], fov: 45 }}
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
