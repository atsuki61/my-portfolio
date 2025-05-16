'use client'; // クライアントコンポーネントであることを明示

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import React, { useState, useMemo } from 'react'; // useState と useMemo をインポート

export default function HomePage() {
  // テクスチャ一覧と選択中のインデックス、背景色を管理
  const textures = useMemo(
    () => [
      {
        name: '月',
        url: '/images/moon.jpg',
        color: '#01021d', // 暗い青色の背景
        rotationSpeed: 0.5,
        particleColor: '#01021d', // セクション背景色
      },
      {
        name: '地球',
        url: '/images/earth.jpg',
        color: '#1a1a2e', // 深い青色の背景
        rotationSpeed: 0.5,
        particleColor: '#1a1a2e', // セクション背景
      },
      {
        name: '太陽',
        url: '/images/sun.jpg',
        color: '#6a1b0a', // 赤褐色の背景
        rotationSpeed: 0.5,
        particleColor: '#6a1b0a', //セクション背景
      },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % textures.length);

  // 現在の天体に応じた particleColor を取得
  const currentParticleColor = textures[idx].particleColor;

  return (
    <main>
      <HeroSection
        textures={textures}
        idx={idx}
        next={next}
        // HeroSection 自身の背景色は textures[idx].color を使うので particleColor は渡さない
        // または、HeroSection 側で particleColor を受け取っても使わないようにする
      />
      <AboutSection particleColor={currentParticleColor} />
      <ProjectsSection particleColor={currentParticleColor} />
      <ContactSection particleColor={currentParticleColor} />
    </main>
  );
}
