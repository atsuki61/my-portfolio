// src/components/sections/AboutSection.tsx
'use client';

import Marquee from 'react-fast-marquee';
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

const SKILLS = [
  { icon: SiHtml5, label: 'HTML' },
  { icon: SiCss3, label: 'CSS' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: SiJavascript, label: 'JavaScript' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiReact, label: 'React' },
  { icon: SiPython, label: 'Python' },
];
const HOBBIES = [
  { icon: MdMovie, label: 'アニメ' },
  { icon: FaMusic, label: '音楽を聴く' },
  { icon: FaGamepad, label: 'ゲーム' },
  { icon: GiWeightLiftingUp, label: '筋トレ' },
  { icon: FaLaptopCode, label: '開発' },
  { icon: GiCupcake, label: '甘い物' },
  { icon: FaPlane, label: '旅行' },
  { icon: FaMobileAlt, label: 'ガジェット' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white text-black">
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        <h2 className="text-4xl font-bold text-center">About Me</h2>
        <p className="text-center text-lg">
          滋賀県出身の学生で、現在京都コンピュータ学院京都駅前校で Webアプリケーション開発を学んでいます。
        </p>

        {/* 技術スタック */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Studying Skills</h3>
          <div className="pt-12 pb-12 overflow-visible">
            <Marquee className="h-[10rem] overflow-visible" gradient={false} speed={50} pauseOnHover={false}>
              {SKILLS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center flex-shrink-0
                             mx-12 transform transition-transform duration-300
                             hover:scale-110"
                >
                  {/* 大きめのアイコンサイズ */}
                  <Icon className="w-24 h-24 mb-3" />
                  <span className="text-base">{label}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* 趣味・好きなこと */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">趣味・好きなこと</h3>
          <div className="pt-12 pb-12 overflow-visible">
            <Marquee className="h-[10rem] overflow-visible" gradient={false} speed={40} pauseOnHover={false}>
              {HOBBIES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center flex-shrink-0
                             mx-12 transform transition-transform duration-300
                             hover:scale-110"
                >
                  <Icon className="w-24 h-24 mb-3" />
                  <span className="text-base">{label}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        <p className="text-center text-lg">将来的にはUI/UXも自分でデザインできるエンジニアを目指しています！</p>
      </div>
    </section>
  );
}
