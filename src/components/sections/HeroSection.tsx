// src/components/sections/HeroSection.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import React, { useState, useEffect } from "react";
import TextureSphere from "../TextureSphere";

export default function HeroSection() {
  // テクスチャ一覧を用意 - 各天体の特性も定義
  const textures = [
    { 
      name: "月", 
      url: "/images/moon.jpg",
      color: "#1a1a2e", // 暗い青色の背景
      rotationSpeed: 0.01, // 遅い回転
      particleColor: "#ffffff" // 白い星
    },
    { 
      name: "地球", 
      url: "/images/earth.jpg",
      color: "#0a3d62", // 深い青色の背景
      rotationSpeed: 0.03, // 中程度の回転
      particleColor: "#aaccff" // 青白い星
    },
    { 
      name: "太陽", 
      url: "/images/sun.jpg",
      color: "#6a1b0a", // 赤褐色の背景
      rotationSpeed: 0.05, // 速い回転
      particleColor: "#ffcc66" // 黄色い星
    },
    { 
      name: "シナモン", 
      url: "/images/シナモン.jpg",
      color: "#1a1a2e", // 暗い青色の背景
      rotationSpeed: 0.02, // 遅い回転
      particleColor: "#ffffff" // 白い星
    },
  ];
  
  // 現在選択中のインデックス
  const [idx, setIdx] = useState(0);
  // 現在の背景色とテーマ（トランジション用）
  const [bgColor, setBgColor] = useState(textures[0].color);

  // 次のテクスチャに切り替え
  const next = () => setIdx((i) => (i + 1) % textures.length);

  // 惑星が変わったときに背景色をアニメーションで変更
  useEffect(() => {
    // 新しい背景色をセット
    setBgColor(textures[idx].color);
  }, [idx]);

  return (
    <section 
      id="home" 
      className="relative h-screen overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: bgColor }}
    >
      {/* スマホ: 縦積み (flex-col) / md以上: 横並び (flex-row) */}
      <div className="flex flex-col md:flex-row h-full">
        {/* 左 1/3：テキスト */}
        <div className="w-full md:w-1/3 flex flex-col justify-center px-8 z-10">
          <h1 className="text-5xl font-bold text-white mb-4 transition-all duration-500">
            Hi! My name is Atsuki!
          </h1>
          <p className="text-lg text-gray-300 mb-6 transition-all duration-500">
            I am a third-year student at Kyoto Computer gain.
          </p>
        </div>

        {/* 右 2/3：3D Canvas */}
        <div className="w-full h-[70vh] md:h-auto md:w-2/3 relative">
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 6], fov: 50 }}
          >
            {/* 背景の星空 */}
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />

            {/* ライティング - 天体に合わせて色を変える */}
            <ambientLight intensity={3.5} />
            <pointLight 
              position={[5, 5, 5]} 
              intensity={1.0}
              color={textures[idx].particleColor}
            />
            <pointLight position={[-5, -5, -5]} intensity={0.2} />

            {/* 球体メッシュ（テクスチャ切り替え可能） */}
            <TextureSphere 
              textureURL={textures[idx].url} 
              onClick={next}
              rotationSpeed={textures[idx].rotationSpeed}
            />

            {/* マウスドラッグで視点操作 */}
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
