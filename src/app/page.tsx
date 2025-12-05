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
        // 色の設定（ここを変えると全ページの色が変わります）
        theme: {
          bg: '#020617', // 深い青（Slate-950）
          card: '#0f172a', // カード色（Slate-900）
          accent: '#38bdf8', // 水色（Sky-400）
          particle: '#38bdf8', // 星の光の色
        },
      },
      {
        name: '地球',
        url: '/images/earth.jpg',
        rotationSpeed: 0.005,
        theme: {
          bg: '#022c22', // 深い緑（Emerald-950）
          card: '#064e3b', // カード色（Emerald-900）
          accent: '#34d399', // 明るい緑（Emerald-400）
          particle: '#34d399',
        },
      },
      {
        name: '太陽',
        url: '/images/sun.jpg',
        rotationSpeed: 0.002,
        theme: {
          bg: '#450a0a', // 深い赤（Red-950）
          card: '#7f1d1d', // カード色（Red-900）
          accent: '#fbbf24', // 黄色（Amber-400）
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
    // ここでCSS変数をセットすることで、下層のコンポーネント全ての色を一括変更します
    <main
      className="transition-colors duration-1000"
      style={
        {
          // @ts-ignore
          '--theme-bg': currentTheme.bg,
          '--theme-card': currentTheme.card,
          '--theme-accent': currentTheme.accent,
          '--theme-text': '#e2e8f0',
        } as React.CSSProperties
      }
    >
      <HeroSection
        textures={textures} // 型エラーが出る場合はHeroSectionPropsを修正してください（後述）
        idx={idx}
        next={next}
      />
      {/* もうpropsで色を渡す必要はありません。CSS変数で自動で変わります */}
      <AboutSection particleColor={currentTheme.bg} />
      <ProjectsSection particleColor={currentTheme.bg} />
      <ContactSection particleColor={currentTheme.bg} />
    </main>
  );
}
