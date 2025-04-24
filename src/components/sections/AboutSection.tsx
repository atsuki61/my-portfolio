// src/components/sections/AboutSection.tsx
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  // SiFramer,
  SiGithub
} from "react-icons/si";

const SKILLS = [
  { icon: SiNextdotjs,   label: "Next.js" },
  { icon: SiTypescript,   label: "TypeScript" },
  { icon: SiTailwindcss,  label: "Tailwind CSS" },
  { icon: SiReact,        label: "React" },
  // { icon: SiFramer,       label: "Framer Motion" },
  { icon: SiGithub,       label: "Git & GitHub" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white text-black">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-bold text-center">About Me</h2>
        <p>  滋賀県出身の学生で、現在京都コンピュータ学院京都駅前校で
          Webアプリケーション開発を学んでいます。休学中の今は、
          自分のペースでNext.jsやTypeScript、Tailwind CSSを中心に
          フロントエンド技術を深掘り中です。</p>

        {/* アイコン付きスキルリスト */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {SKILLS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center bg-gray-100 p-4 rounded shadow-sm"
            >
              <Icon className="w-8 h-8 mb-2 text-black" />
              <span className="text-sm">{label}</span>
            </li>
          ))}
        </ul>

        <p>趣味はアニメ鑑賞と筋トレ、旅行で、新しい技術を試すのが好きです。
        将来的にはUI/UXも自分でデザインできるエンジニアを目指しています！</p>
      </div>
    </section>
  );
}
