// src/components/sections/ProjectsSection.tsx
'use client';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaMobileAlt } from 'react-icons/fa';
import { CometCard } from '../ui/comet-card';
import { StarsBackground } from '../ui/stars-background';
import { ShootingStars } from '../ui/shooting-stars';

const PROJECTS = [
  {
    id: 'proj1',
    title: 'ポートフォリオ',
    description: 'Next.js、Three.jsを使った現在のポートフォリオサイト。宇宙をテーマにした3D表現を取り入れています。',
    image: '/images/portfolio.jpg',
    techs: ['Next.js', 'Three.js'],
    github: 'https://github.com/atsuki61/my-portfolio',
    live: 'https://my-portfolio-drab-zeta-67.vercel.app/',
  },
  {
    id: 'musclegrow',
    title: 'MuscleGrow',
    description:
      '日々のトレーニングを記録・可視化する筋トレ管理アプリ。PWA対応でネイティブアプリのような使用感を実現。',
    image: '/images/musclegrow.png', // ここにスマホの縦長スクショを指定してください
    techs: ['Next.js', 'PWA', 'TypeScript'],
    github: 'https://github.com/atsuki61/musclegrow',
    live: 'https://musclegrow.vercel.app/',
  },
  {
    id: 'proj3',
    title: '100 Days of Code',
    description: '100日間のコーディング学習記録。日々の学習内容と成果物を一覧で確認できます。',
    image: '/images/100DaysOfCode.jpg',
    techs: ['Next.js', 'TypeScript'],
    github: 'https://github.com/atsuki61/100DaysOfCode',
    live: 'https://100-days-of-code-delta.vercel.app/',
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-20 text-white min-h-screen bg-(--theme-bg) transition-colors duration-1000 ease-in-out overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarsBackground />
        <ShootingStars
          starColor="var(--theme-accent)"
          trailColor="var(--theme-accent)"
          minSpeed={15}
          maxSpeed={30}
          minDelay={1500}
          maxDelay={4000}
        />
        <ShootingStars
          starColor="var(--theme-accent)"
          trailColor="var(--theme-accent)"
          minSpeed={30}
          maxSpeed={50}
          minDelay={500}
          maxDelay={2000}
        />
        <ShootingStars
          starColor="var(--theme-accent)"
          trailColor="var(--theme-accent)"
          minSpeed={20}
          maxSpeed={40}
          minDelay={1000}
          maxDelay={3000}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 space-y-12">
        <h2 className="text-4xl font-bold text-center font-['Space_Grotesk'] mb-8">Projects</h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((proj) => {
            // PWAタグが含まれているかチェック（スマホアプリ判定用）
            const isMobileApp = proj.techs.includes('PWA');

            return (
              <CometCard
                key={proj.id}
                className="w-full h-full"
              >
                <div className="relative flex w-full h-full cursor-pointer flex-col items-stretch rounded-2xl border-0 bg-(--theme-card) transition-colors duration-1000 p-4 saturate-100 sm:saturate-0 sm:hover:saturate-100 group">
                  <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gray-900/50">
                    {/* ▼ 画像表示ロジックの修正 ▼ */}
                    {isMobileApp ? (
                      <>
                        {/* 背景：ぼかしを入れて隙間を埋める */}
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className="object-cover blur-xl opacity-60 scale-110"
                        />
                        {/* 前面：全体が見えるように配置 (object-contain) */}
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className="object-contain z-10 transition-transform duration-500 group-hover:scale-105 opacity-100 sm:opacity-90 sm:group-hover:opacity-100"
                        />
                      </>
                    ) : (
                      // 通常のWebサイト（横長画像）の場合
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-100 sm:opacity-80 sm:group-hover:opacity-100"
                      />
                    )}

                    {isMobileApp && (
                      <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 z-20">
                        <FaMobileAlt /> PWA
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col flex-1 font-mono text-white">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div className="text-sm sm:text-lg font-bold truncate pr-2">{proj.title}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 shrink-0 mt-1 sm:mt-0">
                        #{proj.id.slice(0, 4).toUpperCase()}
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-3 sm:line-clamp-2 mb-4 flex-1 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-2 border-t border-white/10 gap-2">
                      <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs text-gray-400">
                        {proj.techs.slice(0, 2).map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                        {proj.techs.length > 2 && <span>+{proj.techs.length - 2}</span>}
                      </div>

                      <div className="flex gap-3 text-gray-400 self-end sm:self-auto">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-(--theme-accent) transition-colors"
                          >
                            <FaGithub size={16} />
                          </a>
                        )}
                        {proj.live && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-(--theme-accent) transition-colors"
                          >
                            <FaExternalLinkAlt size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CometCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
