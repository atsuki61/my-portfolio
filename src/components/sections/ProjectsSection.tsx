// src/components/sections/ProjectsSection.tsx
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;       // public/images 以下に配置する想定
  techs: string[];     // 技術スタックのラベル
  github?: string;     // GitHub リポジトリ URL
  live?: string;       // デモサイト URL
};

// ① ここにプロジェクトデータを追加していく
const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "ポートフォリオサイト",
    description: "Next.js と Tailwind CSS で作成した自己紹介サイトです。",
    image: "/images/project1.png",
    techs: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/username/my-portfolio",
    live: "https://my-portfolio.vercel.app",
  },
  {
    id: "proj2",
    title: "ToDo アプリ",
    description: "おしゃれなToDoアプリです。",
    image: "/images/todo.png",
    techs: ["HTML5", "CSS3", "JavaScript"],
    github: "https://todo-app-virid-pi-51.vercel.app/",
    }
    
  // 追加したいプロジェクトをここにどんどん増やせます
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-white text-black">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* セクション見出し */}
        <h2 className="text-3xl font-bold text-center">Projects</h2>

        {/* グリッドレイアウト */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((proj) => (
            <article
              key={proj.id}
              className="flex flex-col bg-gray-50 rounded-lg shadow hover:shadow-md transition"
            >
              {/* ② 画像 */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* コンテンツ */}
              <div className="flex-1 p-4 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-sm text-gray-700 flex-1">{proj.description}</p>

                {/* 技術スタック */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {proj.techs.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* リンク */}
                <div className="mt-4 flex space-x-4">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${proj.title} GitHub`}
                      className="text-xl hover:text-gray-600"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${proj.title} Live Demo`}
                      className="text-xl hover:text-gray-600"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
