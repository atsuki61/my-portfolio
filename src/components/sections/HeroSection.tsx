// src/components/sections/HeroSection.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, { useState, useEffect } from 'react';
import TextureSphere from '../TextureSphere';

// Props の型定義
interface HeroSectionProps {
  textures: Array<{
    name: string;
    url: string;
    color: string;
    rotationSpeed: number;
    particleColor: string;
  }>;
  idx: number;
  next: () => void;
  // particleColor?: string; // HeroSection は自身の背景色を textures[idx].color から取得するため、particleColor prop は任意または不要
}

export default function HeroSection({ textures, idx, next }: HeroSectionProps) {
  // const textures = useMemo(...);

  // 現在の背景色とテーマ（トランジション用）
  const [bgColor, setBgColor] = useState(textures[idx].color); // 初期値は props の idx と textures を使用
  // 惑星が変わったときに背景色をアニメーションで変更
  useEffect(() => {
    // 新しい背景色をセット
    setBgColor(textures[idx].color);
  }, [idx, textures]);

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden transition-colors duration-1000 bg-[var(--home-bg-color)] cosmic-grid"
      // stateで管理されるbgColorをインラインスタイルで適用し、背景色を動的に変更
      style={{ backgroundColor: bgColor }}
    >
      {/* スマホ: 縦積み (flex-col) / md以上: 横並び (flex-row) */}
      <div className="flex flex-col md:flex-row h-full">
        {/* 左 1/3：テキスト */}
        <div className="w-full md:w-1/3 flex flex-col justify-center px-8 z-10">
          <h1 className="text-5xl font-bold text-white mb-4 transition-all duration-500 font-['Space_Grotesk']">
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
              color={textures[idx].particleColor} // props の particleColor を使用
            />
            <pointLight
              position={[-5, -5, -5]}
              intensity={0.2}
            />

            {/* 球体メッシュ（テクスチャ切り替え可能） */}
            <TextureSphere
              textureURL={textures[idx].url}
              onClick={next} // props の next を使用
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
