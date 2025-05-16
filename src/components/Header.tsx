'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaSquareXTwitter, FaGithub } from 'react-icons/fa6';

// ナビゲーションアイテムの定義
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  // 現在アクティブなナビゲーションアイテムのIDを管理するstate
  const [active, setActive] = useState('home');
  // ページ上部から一定量スクロールしたかどうかを管理するstate
  const [scrolled, setScrolled] = useState(false);
  // 現在スクロール中かどうかを管理するstate
  const [isScrolling, setIsScrolling] = useState(false);
  // スクロール停止を検知するためのタイマーのIDを保持するref
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // スクロールイベントを処理する関数
    const handleScroll = () => {
      // スクロール位置に基づいてアクティブなナビゲーションセクションを更新
      const y = window.scrollY + window.innerHeight / 3;
      for (const { id } of NAV_ITEMS) {
        const sec = document.getElementById(id);
        if (sec && sec.offsetTop <= y) setActive(id);
      }

      // ページ上部からのスクロール量に応じてscrolled stateを更新
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // スクロール中状態の管理
      setIsScrolling(true); // スクロールが検知されたらisScrollingをtrueに設定
      // 既存のタイマーがあればクリア
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      // 新しいタイマーを設定し、150ms後にisScrollingをfalseに設定
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', handleScroll);

    // コンポーネントのクリーンアップ時にイベントリスナーとタイマーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // ナビゲーションアイテムクリック時の処理
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // デフォルトのアンカー動作をキャンセル
    const element = document.getElementById(id); // 対応するセクション要素を取得
    if (element) {
      // スムーズスクロールでセクションへ移動
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActive(id); // クリックされたアイテムをアクティブに設定
    }
  };

  // ヘッダーの基本的なクラス
  const headerBaseClasses = "fixed top-0 w-full z-50 shadow-sm font-['Space_Grotesk'] transition-all duration-300";
  // スクロール中かどうかに基づいてヘッダーの背景色クラスを決定
  const headerBgClass = isScrolling ? 'bg-black/20' : 'bg-black';

  // スクロール状態に応じたアイコンのスタイル
  const iconStyle = scrolled ? { color: '#60A5FA', filter: 'drop-shadow(0 0 5px #60A5FA)' } : { color: '#FFFFFF' };

  return (
    // headerBaseClasses と headerBgClass を組み合わせてヘッダーのクラスを設定
    <header className={`${headerBaseClasses} ${headerBgClass}`}>
      <div className="mx-auto max-w-4xl flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/favicon-32x32.png" alt="Logo" width={32} height={32} className="mr-2" />
        </Link>
        <nav className="flex gap-8 items-center">
          {/* SNSアイコンエリア */}
          <div className="flex space-x-4 mr-6">
            <a href="https://github.com/atsuki61" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="w-5 h-5 transition-all duration-300" style={iconStyle} />
            </a>
            <a href="https://x.com/atsuki_prog_ai" target="_blank" rel="noopener noreferrer" aria-label="X">
              <FaSquareXTwitter className="w-5 h-5 transition-all duration-300" style={iconStyle} />
            </a>
          </div>
          {/* ナビゲーションリンク */}
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              style={{
                // アクティブなナビゲーションアイテムのテキストシャドウ効果
                textShadow:
                  active === id
                    ? '0 0 8px #0AF, 0 0 15px #0AF, 0 0 20px #A0F, 0 0 30px #A0F'
                    : '0 0 5px #0BF, 0 0 10px #0BF, 0 0 15px #8A2BE2, 0 0 20px #8A2BE2',
              }}
              className={`px-3 py-1 rounded-lg transition cursor-pointer 
                ${active === id ? (scrolled ? 'text-cyan-300' : 'text-cyan-300') : scrolled ? 'text-white hover:text-cyan-300' : 'text-white hover:text-cyan-300'} 
                ${active === id ? 'font-semibold' : ''}
              `}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
