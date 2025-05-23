// src/app/layout.tsx
import './globals.css'; // グローバルなCSSスタイルを読み込みます。
import Header from '@/components/Header'; // ヘッダーコンポーネントを読み込みます。
import Footer from '@/components/Footer'; // フッターコンポーネントを読み込みます。
import { ReactNode } from 'react'; // Reactの子要素を表す型 `ReactNode` を読み込みます。
import { Metadata } from 'next'; // Next.jsのメタデータ型を読み込みます。

// このページのメタデータ（タイトル、説明、アイコンなど）を定義します。
// SEO（検索エンジン最適化）やブラウザのタブ表示などに使われます。
export const metadata: Metadata = {
  title: 'atsuki | portfolio', // ページのタイトル
  description: 'Atsukiのポートフォリオサイト', // ページの説明文
  manifest: '/manifest.json', // PWA（プログレッシブウェブアプリ）のマニフェストファイル
  icons: {
    // サイトのアイコン設定
    icon: [
      // 標準的なファビコンの設定
      { url: '/images/favicon.ico' }, // .ico形式のファビコン
      { url: '/images/favicon-32x32.png', type: 'image/png', sizes: '32x32' }, // 32x32サイズのPNGファビコン
      { url: '/images/favicon-16x16.png', type: 'image/png', sizes: '16x16' }, // 16x16サイズのPNGファビコン
    ],
    apple: [{ url: '/images/apple-touch-icon.png' }], // Appleデバイス用のタッチアイコン
  },
};

// すべてのページで共通して使われる基本的なレイアウトを定義するコンポーネントです。
// `children` には各ページの具体的な内容が入ります。
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // HTML全体の言語を日本語に設定します。
    <html lang="ja">
      {/* bodyタグ: Webページの主要なコンテンツが表示される部分です。 */}
      {/* スタイル: 背景色を白、文字色を黒にし、文字のアンチエイリアスを有効にしています。 */}
      <body className="bg-white text-black antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
