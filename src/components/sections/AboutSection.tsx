// src/components/sections/AboutSection.tsx
'use client';

import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { StarsBackground } from '../ui/stars-background';
import { ShootingStars } from '../ui/shooting-stars';
import {
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiPython,
} from 'react-icons/si';
import { MdMovie } from 'react-icons/md';
import { FaMusic, FaGamepad, FaLaptopCode, FaPlane, FaMobileAlt } from 'react-icons/fa';
import { GiWeightLiftingUp, GiCupcake } from 'react-icons/gi';

// 使わないのでProps定義は空にするか削除
// interface AboutSectionProps {}

const SKILLS = [
  { icon: <SiNextdotjs />, title: 'Next.js' },
  { icon: <SiReact />, title: 'React' },
  { icon: <SiTypescript />, title: 'TypeScript' },
  { icon: <SiTailwindcss />, title: 'Tailwind' },
  { icon: <SiJavascript />, title: 'JavaScript' },
  { icon: <SiHtml5 />, title: 'HTML5' },
  { icon: <SiCss3 />, title: 'CSS3' },
  { icon: <SiPython />, title: 'Python' },
];

const HOBBIES = [
  { icon: <FaLaptopCode />, title: 'Coding' },
  { icon: <GiWeightLiftingUp />, title: 'Workout' },
  { icon: <MdMovie />, title: 'Anime' },
  { icon: <FaGamepad />, title: 'Gaming' },
  { icon: <FaMusic />, title: 'Music' },
  { icon: <GiCupcake />, title: 'Sweets' },
  { icon: <FaPlane />, title: 'Travel' },
  { icon: <FaMobileAlt />, title: 'Gadgets' },
];

export default function AboutSection({}: { particleColor?: string }) {
  return (
    <section
      id="about"
      className="relative py-20 text-white min-h-screen flex flex-col justify-center bg-[var(--theme-bg)] transition-colors duration-1000 ease-in-out overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <StarsBackground />
        <ShootingStars
          starColor="var(--theme-accent)"
          trailColor="var(--theme-accent)"
          minDelay={1000}
          maxDelay={3000}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">About Me</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            滋賀県出身の学生エンジニア。
            <br />
            モダンなWeb技術を中心に、日々の学習と開発を楽しんでいます。
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-end gap-4 mb-8 border-b border-gray-700 pb-2">
            <h3 className="text-3xl font-bold font-['Space_Grotesk'] text-[var(--theme-accent)] transition-colors duration-1000">
              Skills
            </h3>
            {/* コメント記法を修正 */}
            <span className="text-sm text-gray-500 pb-1 font-mono">{/* // TECH STACK */}TECH STACK</span>
          </div>
          <BentoGrid>
            {SKILLS.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                icon={item.icon}
                className={i === 0 || i === 3 ? 'md:col-span-2' : ''}
              />
            ))}
          </BentoGrid>
        </div>

        <div>
          <div className="flex items-end gap-4 mb-8 border-b border-gray-700 pb-2">
            <h3 className="text-3xl font-bold font-['Space_Grotesk'] text-[var(--theme-accent)] transition-colors duration-1000 opacity-80">
              Hobbies
            </h3>
            {/* コメント記法を修正 */}
            <span className="text-sm text-gray-500 pb-1 font-mono">{/* // PRIVATE LIFE */}PRIVATE LIFE</span>
          </div>
          <BentoGrid>
            {HOBBIES.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                icon={item.icon}
                className="bg-slate-800/50 hover:bg-slate-800"
              />
            ))}
          </BentoGrid>
        </div>

        <div className="text-center mt-20">
          <p className="text-gray-400 text-sm">
            Interested in working together? Check out my{' '}
            <a
              href="#projects"
              className="text-white underline hover:text-[var(--theme-accent)] transition-colors"
            >
              Projects
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
