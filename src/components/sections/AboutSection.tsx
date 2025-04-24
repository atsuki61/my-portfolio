export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white text-black">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* セクション見出し */}
        <h2 className="text-3xl font-bold text-center">About Me</h2>

        {/* 自己紹介テキスト */}
        <p>
          滋賀県出身の学生。現在京都コンピュータ学院京都駅前校で
          Webアプリケーション開発を学んでいます。
          現在休学中。
        </p>

        {/* スキルリスト */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "React",
            "Framer Motion",
            "Git & GitHub",
          ].map((skill) => (
            <li
              key={skill}
              className="bg-gray-100 p-2 rounded text-center shadow-sm"
            >
              {skill}
            </li>
          ))}
        </ul>

        {/* 趣味・将来像 */}
        <p>
          趣味はアニメ鑑賞と筋トレ、旅行で、新しい技術を試すのが好きです。
          将来的にはUI/UXも自分でデザインできるエンジニアを目指しています！
        </p>
      </div>
    </section>
  );
}
