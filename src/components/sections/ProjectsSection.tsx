// src/components/sections/ProjectsSection.tsx
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// このコンポーネントが受け取る情報（props）の形を定義しています。
// particleColor: パーティクルの色を文字列で指定します。
interface ProjectsSectionProps {
  particleColor: string;
}

// 1つのプロジェクトが持つ情報の形を定義しています。
type Project = {
  id: string; // プロジェクトを識別するための一意なID
  title: string; // プロジェクトのタイトル
  description: string; // プロジェクトの簡単な説明
  image: string; // プロジェクトの画像ファイルの場所 (public/images/ 以下)
  techs: string[]; // プロジェクトで使われている技術のリスト
  github?: string; // GitHubリポジトリのURL (あれば)
  live?: string; // 公開しているサイトのURL (あれば)
};

// 表示するプロジェクトの情報をここにまとめています。
// 新しいプロジェクトを追加したい場合は、この配列に同じ形式で追加します。
const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'ポートフォリオサイト',
    description: 'Next.js、TypeScript、Tailwind CSSを使ったポートフォリオサイトです。',
    image: '/images/portfolio.png',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/atsuki61/my-portfolio',
    live: 'https://my-portfolio-drab-zeta-67.vercel.app/',
  },
  {
    id: 'proj2',
    title: 'ToDo アプリ',
    description: 'シンプルなToDoアプリです。',
    image: '/images/todo.png',
    techs: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/atsuki61/todo-app',
    live: 'https://todo-app-virid-pi-51.vercel.app/',
  },
  {
    id: 'proj3',
    title: '100 Days of Code',
    description: '100日間のコーディングの記録です。',
    image: '/images/100DaysOfCode.png',
    techs: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/atsuki61/100DaysOfCode',
    live: 'https://100-days-of-code-delta.vercel.app/',
  },
  // 他のプロジェクトもここに追加できます。
];

// 「Projects」セクションを表示するための主要なコンポーネントです。
export default function ProjectsSection({ particleColor }: ProjectsSectionProps) {
  return (
    <section
      id="projects" // ページ内リンクのためのID
      className="py-20 text-white transition-colors duration-1000 min-h-screen" // スタイルを指定 (上下の余白、文字色、背景色の変化、最小の高さ)
      style={{ backgroundColor: particleColor }} // 背景色を動的に変更
    >
      {/* セクション内のコンテンツを中央に配置し、横幅を制限します。 */}
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* セクションのタイトル「Projects」を表示します。 */}
        <h2 className="text-3xl font-bold text-center font-['Space_Grotesk']">Projects</h2>

        {/* プロジェクトをグリッド（格子状）に並べて表示します。 */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* PROJECTS 配列の各プロジェクト情報を使って、プロジェクトカードを繰り返し表示します。 */}
          {PROJECTS.map((proj) => (
            // 個々のプロジェクトカードです。
            <article
              key={proj.id} // Reactがリストの各要素を区別するためのキー
              className="flex flex-col bg-gray-800 rounded-lg shadow hover:shadow-md transition" // カードのスタイル
            >
              {/* プロジェクトの画像を表示する部分です。 */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={proj.image} // 表示する画像のパス
                  alt={proj.title} // 画像が表示されない場合に表示される代替テキスト
                  fill // 親要素に合わせて画像を拡大縮小
                  className="object-cover" // 画像の表示方法 (アスペクト比を保ちつつ全体をカバー)
                />
              </div>

              {/* プロジェクトのテキスト情報（タイトル、説明、技術スタック、リンク）を表示する部分です。 */}
              <div className="flex-1 p-4 flex flex-col">
                {/* プロジェクトのタイトル */}
                <h3 className="text-xl font-semibold mb-2 text-white">{proj.title}</h3>
                {/* プロジェクトの説明 */}
                <p className="text-sm text-gray-300 flex-1">{proj.description}</p>

                {/* プロジェクトで使われている技術スタックのリスト */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {proj.techs.map((tech) => (
                    <li
                      key={tech} // 技術スタック名をキーとして使用
                      className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded" // 技術タグのスタイル
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* GitHubリポジトリと公開サイトへのリンクアイコン */}
                <div className="mt-4 flex space-x-4">
                  {/* GitHubリンクがある場合のみ表示 */}
                  {proj.github && (
                    <a
                      href={proj.github} // リンク先のURL
                      target="_blank" // 新しいタブで開く
                      rel="noopener noreferrer" // セキュリティ対策
                      aria-label={`${proj.title} GitHub`} // スクリーンリーダー用の説明
                      className="text-xl text-gray-400 hover:text-white" // アイコンのスタイル
                    >
                      <FaGithub /> {/* GitHubアイコン */}
                    </a>
                  )}
                  {/* 公開サイトリンクがある場合のみ表示 */}
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${proj.title} Live Demo`}
                      className="text-xl text-gray-400 hover:text-white"
                    >
                      <FaExternalLinkAlt /> {/* 外部リンクアイコン */}
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
