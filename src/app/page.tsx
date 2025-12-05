// src/app/page.tsx
'use client';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import React, { useState, useMemo } from 'react';

export default function HomePage() {
  const textures = useMemo(
    () => [
      {
        name: '月',
        url: '/images/moon.jpg',
        rotationSpeed: 0.005,
        theme: {
          bg: '#020617',
          card: '#0f172a',
          accent: '#38bdf8',
          particle: '#38bdf8',
        },
      },
      {
        name: '地球',
        url: '/images/earth.jpg',
        rotationSpeed: 0.005,
        theme: {
          bg: '#022c22',
          card: '#064e3b',
          accent: '#34d399',
          particle: '#34d399',
        },
      },
      {
        name: '太陽',
        url: '/images/sun.jpg',
        rotationSpeed: 0.002,
        theme: {
          bg: '#450a0a',
          card: '#7f1d1d',
          accent: '#fbbf24',
          particle: '#fbbf24',
        },
      },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % textures.length);

  const currentTheme = textures[idx].theme;

  return (
    <main
      className="transition-colors duration-1000"
      // ▼ @ts-ignore のコメントを削除しました
      style={
        {
          '--theme-bg': currentTheme.bg,
          '--theme-card': currentTheme.card,
          '--theme-accent': currentTheme.accent,
          '--theme-text': '#e2e8f0',
        } as React.CSSProperties
      }
    >
      <HeroSection
        textures={textures}
        idx={idx}
        next={next}
      />
      {/* particleColor はもう使わないので削除、または渡しても無視されます */}
      <AboutSection particleColor={currentTheme.bg} />
      <ProjectsSection particleColor={currentTheme.bg} />
      <ContactSection particleColor={currentTheme.bg} />
    </main>
  );
}
