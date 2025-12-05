// src/components/sections/HeroSection.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React from 'react';
import TextureSphere from '../TextureSphere';
import { TextGenerateEffect } from '../ui/text-generate-effect';

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
      // ▼ bg-[var(--home-bg-color)] -> bg-(--home-bg-color) に修正
      className="relative h-screen overflow-hidden transition-colors duration-1000 bg-(--home-bg-color) cosmic-grid pt-16 md:pt-0"
      style={{ backgroundColor: textures[idx].theme.bg }}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/3 flex flex-col justify-center md:justify-center pt-8 sm:pt-12 md:pt-0 px-4 sm:px-6 md:px-8 z-10">
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

        <div className="w-full h-[60vh] md:h-auto md:w-2/3 relative">
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 6], fov: 50 }}
          >
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
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
