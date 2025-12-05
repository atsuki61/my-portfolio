// src/components/sections/ProjectsSection.tsx
'use client';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaMobileAlt } from 'react-icons/fa';
import { CometCard } from '../ui/comet-card';
import { StarsBackground } from '../ui/stars-background';
import { ShootingStars } from '../ui/shooting-stars';

interface ProjectsSectionProps {
  particleColor: string;
}

const PROJECTS = [
  {
    id: 'musclegrow',
    title: 'MuscleGrow',
    description:
      '日々のトレーニングを記録・可視化する筋トレ管理アプリ。PWA対応でネイティブアプリのような使用感を実現。',
    image: '/images/musclegrow.png',
    techs: ['Next.js', 'PWA', 'TypeScript'],
    live: 'https://musclegrow.vercel.app/',
  },
  {
    id: 'proj1',
    title: 'ポートフォリオ',
    description: 'Next.js、Three.jsを使った現在のポートフォリオサイト。宇宙をテーマにした3D表現を取り入れています。',
    image: '/images/portfolio.png',
    techs: ['Next.js', 'Three.js'],
    github: 'https://github.com/atsuki61/my-portfolio',
    live: 'https://my-portfolio-drab-zeta-67.vercel.app/',
  },
  {
    id: 'proj2',
    title: 'ToDo アプリ',
    description: 'シンプルで使いやすいToDo管理アプリ。基本的なCRUD操作とローカルストレージ保存に対応。',
    image: '/images/todo.png',
    techs: ['JavaScript', 'HTML/CSS'],
    github: 'https://github.com/atsuki61/todo-app',
    live: 'https://todo-app-virid-pi-51.vercel.app/',
  },
  {
    id: 'proj3',
    title: '100 Days of Code',
    description: '100日間のコーディング学習記録。日々の学習内容と成果物を一覧で確認できます。',
    image: '/images/100DaysOfCode.png',
    techs: ['Next.js', 'TypeScript'],
    github: 'https://github.com/atsuki61/100DaysOfCode',
    live: 'https://100-days-of-code-delta.vercel.app/',
  },
];

export default function ProjectsSection({ particleColor }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative py-20 text-white min-h-screen bg-[var(--theme-bg)] transition-colors duration-1000 ease-in-out overflow-hidden"
    >
      {/* ▼ 背景エフェクトを追加 */}
      <div className="absolute inset-0 z-0">
        <StarsBackground />
        <ShootingStars
          starColor="var(--theme-accent)"
          trailColor="var(--theme-accent)"
          minDelay={1500}
          maxDelay={4000}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 space-y-12">
        <h2 className="text-4xl font-bold text-center font-['Space_Grotesk'] mb-8">Projects</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((proj) => (
            <CometCard
              key={proj.id}
              className="w-full h-full"
            >
              <div className="relative flex w-full h-full cursor-pointer flex-col items-stretch rounded-2xl border-0 bg-[var(--theme-card)] transition-colors duration-1000 p-4 saturate-0 hover:saturate-100 group">
                {/* 画像エリア */}
                <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black/50">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {proj.techs.includes('PWA') && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                      <FaMobileAlt /> PWA
                    </div>
                  )}
                </div>

                {/* テキストエリア */}
                <div className="mt-4 flex flex-col flex-1 font-mono text-white">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-lg font-bold truncate pr-2">{proj.title}</div>
                    <div className="text-xs text-gray-500 shrink-0">#{proj.id.slice(0, 4).toUpperCase()}</div>
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2 mb-4 flex-1">{proj.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                    <div className="flex gap-2 text-xs text-gray-400">
                      {proj.techs.slice(0, 2).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                      {proj.techs.length > 2 && <span>+{proj.techs.length - 2}</span>}
                    </div>

                    <div className="flex gap-3 text-gray-400">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[var(--theme-accent)] transition-colors"
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[var(--theme-accent)] transition-colors"
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CometCard>
          ))}
        </div>
      </div>
    </section>
  );
}
