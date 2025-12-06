// src/components/sections/HeroSection.tsx
'use client';

import { Canvas } from '@react-three/fiber';
// ▼ 3D用の Sparkles をインポート
import { OrbitControls, Sparkles } from '@react-three/drei';
import React from 'react';
import TextureSphere from '../TextureSphere';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { SparklesCore } from '../ui/sparkles'; // 左側のテキスト用はそのまま残す

interface HeroSectionProps {
  textures: Array<{
    name: string;
    url: string;
    rotationSpeed: number;
    theme: {
      bg: string;
      card: string;
      accent: string;
      particle: string;
    };
  }>;
  idx: number;
  next: () => void;
}

export default function HeroSection({ textures, idx, next }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden transition-colors duration-1000 bg-(--home-bg-color) cosmic-grid pt-16 md:pt-0"
      style={{ backgroundColor: textures[idx].theme.bg }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* === 左側：テキストエリア === */}
        <div className="w-full md:w-1/3 flex flex-col justify-center md:justify-center pt-8 sm:pt-12 md:pt-0 px-4 sm:px-6 md:px-8 z-10 relative">
          {/* テキスト裏は 2D の SparklesCore でOK */}
          <div className="w-full absolute inset-0 h-full">
            <SparklesCore
              id="tsparticleshero-text"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={50}
              className="w-full h-full"
              particleColor={textures[idx].theme.particle}
            />
          </div>

          <div className="relative z-20">
            <TextGenerateEffect
              words="Hi! My name is Atsuki!"
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']"
              delay={0}
            />
            <TextGenerateEffect
              words="I am a third-year student at Kyoto Computer Gakuin."
              className="text-base md:text-lg text-gray-300 font-normal"
              delay={1.5}
              duration={0.7}
            />
          </div>
        </div>

        {/* === 右側：3D 惑星エリア === */}
        <div className="w-full h-[60vh] md:h-auto md:w-2/3 relative">
          <Canvas
            className="absolute inset-0 z-10"
            camera={{ position: [0, 0, 6], fov: 50 }}
          >
            {/* ▼ ここに3D版のSparklesを配置 */}
            <Sparkles
              count={200} // 星の数
              scale={10} // 広がる範囲 (大きくすると画面全体に広がる)
              size={4} // 星の大きさ
              speed={0.4} // 揺らめく速度
              opacity={0.8} // 透明度
              color={textures[idx].theme.particle} // テーマカラー連動
            />

            <ambientLight intensity={3.5} />
            <pointLight
              position={[5, 5, 5]}
              intensity={1.0}
              color={textures[idx].theme.particle}
            />
            <pointLight
              position={[-5, -5, -5]}
              intensity={0.2}
            />

            <TextureSphere
              textureURL={textures[idx].url}
              onClick={next}
              rotationSpeed={textures[idx].rotationSpeed}
            />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
