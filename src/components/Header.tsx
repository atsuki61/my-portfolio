'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSquareXTwitter, FaGithub } from 'react-icons/fa6';

// ナビゲーションアイテムの定義
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// サイトのヘッダー（一番上の部分）を表示するためのコンポーネントです。
export default function Header() {
  // useState: コンポーネント内で状態（変化するデータ）を管理するためのフックです。
  const [active, setActive] = useState('home'); // 現在選択されているナビゲーション項目のID (初期値: 'home')
  const [scrolled, setScrolled] = useState(false); // ページがスクロールされたかどうか (初期値: false)
  const [isScrolling, setIsScrolling] = useState(false); // 現在スクロール操作中かどうか (初期値: false)
  // useRef: DOM要素やミュータブルな値を保持するためのフックです。ここではタイマーIDを保持します。
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect: 副作用（DOM操作、API通信、イベントリスナーの登録など）を実行するためのフックです。
  // このuseEffectは、コンポーネントが最初に表示された後（マウント後）に一度だけ実行されます。
  useEffect(() => {
    // スクロールイベントが発生したときに実行される関数です。
    const handleScroll = () => {
      // 現在のスクロール位置に基づいて、ナビゲーションのどの項目がアクティブかを判断します。
      const y = window.scrollY + window.innerHeight / 3; // スクロール位置の判定基準となるY座標
      for (const { id } of NAV_ITEMS) {
        const sec = document.getElementById(id); // 各セクションのDOM要素を取得
        if (sec && sec.offsetTop <= y) setActive(id); // セクションが判定基準より上にあればアクティブにする
      }

      // ページが50px以上スクロールされたら `scrolled` の状態を true にします。
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // スクロール中の状態を管理し、背景の透明度を調整します。
      setIsScrolling(true); // スクロール開始
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current); // 既にタイマーがあればリセット
      }
      // 150ミリ秒後にスクロールが止まったと判断し、isScrollingをfalseに戻します。
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // windowオブジェクトにスクロールイベントリスナーを追加します。
    window.addEventListener('scroll', handleScroll);

    // コンポーネントが画面から消えるとき（アンマウント時）に実行されるクリーンアップ関数です。
    return () => {
      window.removeEventListener('scroll', handleScroll); // イベントリスナーを削除
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current); // タイマーをクリア
      }
    };
  }, []); // 第2引数が空配列なので、マウント時とアンマウント時にのみ実行されます。

  // ナビゲーション項目がクリックされたときに実行される関数です。
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // リンクのデフォルトの挙動（ページ遷移）を抑制します。
    const element = document.getElementById(id); // クリックされた項目のIDに対応するDOM要素を取得します。
    if (element) {
      // 取得した要素の位置までスムーズにスクロールします。
      element.scrollIntoView({
        behavior: 'smooth', // スムーズスクロールを指定
        block: 'start', // 要素の上端をビューポートの上端に合わせる
      });
      setActive(id); // クリックされた項目をアクティブ状態にします。
    }
  };

  // ヘッダーの基本的なCSSクラスです。位置、重ね順、影、フォント、アニメーション効果などを指定しています。
  const headerBaseClasses = "fixed top-0 w-full z-50 shadow-sm font-['Space_Grotesk'] transition-all duration-300";
  // スクロール中かどうかに応じて、ヘッダーの背景色と透明度を動的に変更します。
  const headerBgClass = isScrolling ? 'bg-black/20' : 'bg-black/90'; // スクロール中は薄く、停止中は濃く

  // スクロール状態に応じてアイコンの色とドロップシャドウを動的に変更します。
  const iconStyle = scrolled ? { color: '#60A5FA', filter: 'drop-shadow(0 0 5px #60A5FA)' } : { color: '#FFFFFF' };

  return (
    // ヘッダー要素です。基本クラスと動的な背景クラスを組み合わせて適用します。
    <header className={`${headerBaseClasses} ${headerBgClass}`}>
      {/* ヘッダーの内容を中央に配置し、横幅を制限します。 */}
      <div className="mx-auto max-w-4xl flex items-center justify-center sm:justify-between px-2 sm:px-4 py-3 sm:py-4">
        {/* ナビゲーションメニュー全体です。 */}
        <nav className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-center">
          {/* SNSアイコン（GitHub、X）を表示するエリアです。 */}
          <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mr-2 sm:mr-4 md:mr-6">
            {/* GitHubへのリンクアイコン */}
            <a
              href="https://github.com/atsuki61"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub
                className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300"
                style={iconStyle}
              />
            </a>
            {/* X (旧Twitter) へのリンクアイコン */}
            <a
              href="https://x.com/atsuki_prog_ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <FaSquareXTwitter
                className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300"
                style={iconStyle}
              />
            </a>
          </div>
          {/* 定義したナビゲーション項目を一つずつ表示します。 */}
          {NAV_ITEMS.map(({ id, label }) => (
            // 各ナビゲーション項目へのリンクです。
            <a
              key={id} // Reactがリストの各要素を区別するためのキー
              href={`#${id}`} // ページ内リンクのURL
              onClick={(e) => handleNavClick(e, id)} // クリック時の処理
              style={{
                // アクティブな項目にテキストシャドウを適用して目立たせます。
                textShadow:
                  active === id
                    ? '0 0 8px #0AF, 0 0 15px #0AF, 0 0 20px #A0F, 0 0 30px #A0F' // アクティブ時のシャドウ
                    : '0 0 5px #0BF, 0 0 10px #0BF, 0 0 15px #8A2BE2, 0 0 20px #8A2BE2', // 非アクティブ時のシャドウ
              }}
              // 条件に応じてCSSクラスを動的に変更します。
              className={`px-1 sm:px-2 md:px-3 py-1 rounded-lg transition cursor-pointer text-sm sm:text-base
                ${active === id ? (scrolled ? 'text-cyan-300' : 'text-cyan-300') : scrolled ? 'text-white hover:text-cyan-300' : 'text-white hover:text-cyan-300'} 
                ${active === id ? 'font-semibold' : ''}
              `}
            >
              {label} {/* メニューのテキストを表示 */}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
