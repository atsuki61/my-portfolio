// サイトのフッター（一番下の部分）を表示するためのコンポーネントです。
export default function Footer() {
  return (
    // フッター全体を囲む要素です。背景色、文字色、上下の余白を指定しています。
    <footer className="bg-black text-white py-6">
      {/* フッターの内容を中央に配置し、横幅を制限します。画面サイズに応じてレイアウトが変わります。 */}
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center px-4">
        {/* 著作権情報を表示します。現在の年を動的に取得して表示します。 */}
        <p className="text-sm">© {new Date().getFullYear()} Atsuki. All rights reserved.</p>
      </div>
    </footer>
  );
}
