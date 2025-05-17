'use client'; // このファイルがクライアントサイドで動作することを示す宣言です。

import HeroSection from '@/components/sections/HeroSection'; // ヒーローセクションのコンポーネントを読み込みます。
import AboutSection from '@/components/sections/AboutSection'; // 自己紹介セクションのコンポーネントを読み込みます。
import ProjectsSection from '@/components/sections/ProjectsSection'; // プロジェクトセクションのコンポーネントを読み込みます。
import ContactSection from '@/components/sections/ContactSection'; // お問い合わせセクションのコンポーネントを読み込みます。
import React, { useState, useMemo } from 'react'; // Reactの主要機能（状態管理、メモ化）を読み込みます。

// Webサイトのメインページ（ホームページ）を表示するためのコンポーネントです。
export default function HomePage() {
  // useMemo: 計算結果を記憶し、依存する値が変更されたときだけ再計算するフックです。
  // ここでは、テクスチャ（天体の画像など）の情報を定義しています。
  const textures = useMemo(
    () => [
      {
        name: '月', // 天体の名前
        url: '/images/moon.jpg', // テクスチャ画像のURL
        color: '#01021d', // 主にヒーローセクションの背景色として使用
        rotationSpeed: 0.5, // 天体の回転速度
        particleColor: '#01021d', // この天体が選択された時の、他のセクションの背景色
      },
      {
        name: '地球',
        url: '/images/earth.jpg',
        color: '#1a1a2e',
        rotationSpeed: 0.5,
        particleColor: '#1a1a2e',
      },
      {
        name: '太陽',
        url: '/images/sun.jpg',
        color: '#6a1b0a',
        rotationSpeed: 0.5,
        particleColor: '#6a1b0a',
      },
    ],
    [], // 依存配列が空なので、このデータはコンポーネントが最初に読み込まれた時に一度だけ生成されます。
  );

  // useState: 現在選択されているテクスチャのインデックス（配列textures内の位置）を管理します。
  const [idx, setIdx] = useState(0); // 初期値は0（最初のテクスチャ、つまり月）
  // 次のテクスチャに切り替えるための関数です。
  // (現在のインデックス + 1) をテクスチャの総数で割った余りを新しいインデックスとし、ループさせます。
  const next = () => setIdx((i) => (i + 1) % textures.length);

  // 現在選択されている天体に応じて、About, Projects, Contactセクションの背景色を取得します。
  const currentParticleColor = textures[idx].particleColor;

  return (
    // Webページの主要なコンテンツ部分を表す `main` タグです。
    <main>
      {/* ヒーローセクションを表示します。テクスチャ情報、現在のインデックス、切り替え関数を渡します。 */}
      <HeroSection
        textures={textures}
        idx={idx}
        next={next}
        // HeroSection自体の背景色はテクスチャごとの `color` を使用するため、ここでは `particleColor` は直接渡していません。
      />
      {/* 自己紹介セクションを表示します。現在のパーティクルカラー（背景色）を渡します。 */}
      <AboutSection particleColor={currentParticleColor} />
      {/* プロジェクトセクションを表示します。現在のパーティクルカラー（背景色）を渡します。 */}
      <ProjectsSection particleColor={currentParticleColor} />
      {/* お問い合わせセクションを表示します。現在のパーティクルカラー（背景色）を渡します。 */}
      <ContactSection particleColor={currentParticleColor} />
    </main>
  );
}
