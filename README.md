# My Portfolio

Next.jsとReact Three Fiberを使用した、3Dグラフィックスとアニメーションを活用したモダンなポートフォリオサイトです。

## 📑 目次

- [主な機能](#-主な機能)
- [技術スタック](#️-技術スタック)
- [セットアップ](#-セットアップ)
  - [必要な環境](#必要な環境)
  - [インストール](#インストール)
  - [環境変数の設定](#環境変数の設定)
  - [開発サーバーの起動](#開発サーバーの起動)
- [利用可能なコマンド](#-利用可能なコマンド)
- [ディレクトリ構成](#-ディレクトリ構成)
- [特徴的な機能](#-特徴的な機能)
- [参考資料](#-参考資料)
- [ライセンス](#-ライセンス)
- [作成者](#-作成者)

## ✨ 主な機能

- **3Dテクスチャスフィア**: 月・地球・太陽のテクスチャを切り替えられる3Dオブジェクト
- **インタラクティブなUI**: Framer Motionによるスムーズなアニメーション
- **レスポンシブデザイン**: モバイルからデスクトップまで対応
- **お問い合わせフォーム**: Nodemailerを使用したメール送信機能
- **パーティクルエフェクト**: テーマに応じた視覚効果

## 🛠️ 技術スタック

### フレームワーク

- **Next.js** 16.0.7 (App Router)
- **React** 19.2.1

### 3D描画

- **React Three Fiber** 9.1.2
- **Drei** 10.0.7
- **Three.js** 0.176.0

### アニメーション

- **Framer Motion** 12.9.4
- **React Spring** 9.7.5

### スタイリング

- **Tailwind CSS** 4.1.4

### その他

- **TypeScript** 5
- **React Hook Form** 7.56.1
- **Nodemailer** 6.10.1
- **Lucide React** 0.503.0
- **React Icons** 5.5.0

## 🚀 セットアップ

### 必要な環境

- Node.js 18以上
- pnpm (推奨) または npm/yarn

### インストール

```bash
# 依存関係のインストール
pnpm install
```

### 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# SMTP設定（お問い合わせフォーム用）
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
MAIL_TO=your-email@example.com
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動（Turbopack使用）
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## 📜 利用可能なコマンド

```bash
# 開発サーバーを起動
pnpm dev

# 本番用ビルド
pnpm build

# 本番サーバーを起動
pnpm start

# リンターを実行
pnpm lint

# Prettierでフォーマット
pnpm prettier
```

## 📁 ディレクトリ構成

```
my-portfolio/
├── .cursor/                    # Cursor IDE設定
│   ├── commands/              # カスタムコマンド
│   │   ├── commit.md
│   │   ├── deletebranch.md
│   │   ├── explanation.md
│   │   └── refactor.md
│   └── rules/                 # ルール設定
│       └── global.mdc
├── assets/                     # アセットファイル
│   └── c_________my-portfolio_public_images_100DaysOfCode.png
├── public/                     # 静的ファイル
│   ├── images/                # 画像ファイル
│   │   ├── 100DaysOfCode.jpg
│   │   ├── apple-touch-icon.png
│   │   ├── earth.jpg          # 地球テクスチャ
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── moon_texture.jpg   # 月テクスチャ
│   │   ├── moon.jpg           # 月テクスチャ
│   │   ├── moon2.jpg          # 月テクスチャ
│   │   ├── musclegrow.png
│   │   ├── portfolio.jpg
│   │   └── sun.jpg            # 太陽テクスチャ
│   └── manifest.json          # PWAマニフェスト
├── src/                        # ソースコード
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # APIルート
│   │   │   └── contact/       # お問い合わせAPI
│   │   │       └── route.ts   # メール送信エンドポイント
│   │   ├── globals.css        # グローバルスタイル
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx           # ホームページ
│   ├── components/            # Reactコンポーネント
│   │   ├── sections/          # セクションコンポーネント
│   │   │   ├── HeroSection.tsx      # ヒーローセクション
│   │   │   ├── AboutSection.tsx     # 自己紹介セクション
│   │   │   ├── ProjectsSection.tsx  # プロジェクトセクション
│   │   │   └── ContactSection.tsx   # お問い合わせセクション
│   │   ├── ui/                # UIコンポーネント
│   │   │   ├── 3d-marquee.tsx           # 3Dマーキーコンポーネント
│   │   │   ├── bento-grid.tsx           # ベントグリッドコンポーネント
│   │   │   ├── Button.tsx               # ボタンコンポーネント
│   │   │   ├── card-hover-effect.tsx    # カードホバーエフェクト
│   │   │   ├── comet-card.tsx           # コメットカードコンポーネント
│   │   │   ├── form-components.tsx      # フォームコンポーネント
│   │   │   ├── shooting-stars.tsx       # 流れ星エフェクト
│   │   │   ├── sparkles.tsx             # スパークルエフェクト
│   │   │   ├── stars-background.tsx     # 星空背景
│   │   │   └── text-generate-effect.tsx # テキスト生成エフェクト
│   │   ├── Footer.tsx         # フッターコンポーネント
│   │   ├── Header.tsx         # ヘッダーコンポーネント
│   │   └── TextureSphere.tsx  # 3Dテクスチャスフィアコンポーネント
│   └── utils/                 # ユーティリティ関数
│       ├── cn.ts              # className結合ユーティリティ
│       ├── sendEmail.ts       # メール送信ユーティリティ
│       └── validation.ts      # バリデーション関数
├── .cursorindexingignore      # Cursorインデックス除外設定
├── .eslintrc.json             # ESLint設定
├── .gitignore                 # Git除外設定
├── .npmrc                     # npm設定
├── .prettierignore            # Prettier除外設定
├── .prettierrc.json           # Prettier設定
├── directorystructure.md      # ディレクトリ構造ドキュメント
├── eslint.config.mjs          # ESLint設定（モジュール形式）
├── global.d.ts                # グローバル型定義
├── next.config.ts             # Next.js設定
├── package.json               # プロジェクト依存関係
├── pnpm-lock.yaml             # pnpmロックファイル
├── pnpm-workspace.yaml        # pnpmワークスペース設定
├── postcss.config.js          # PostCSS設定
├── postcss.config.mjs         # PostCSS設定（モジュール形式）
├── README.md                  # このファイル
├── rules.md                   # ルールドキュメント
├── rules.mdc                  # ルール設定
├── tailwind.config.js         # Tailwind CSS設定
├── technologystack.md         # 技術スタックドキュメント
└── tsconfig.json              # TypeScript設定
```

### 主要ディレクトリの説明

#### `src/app/`

Next.js 16のApp Routerを使用したページとAPIルートを定義します。

#### `src/components/`

再利用可能なReactコンポーネントを格納します。

- `sections/`: ページの各セクションを構成するコンポーネント
- `ui/`: 汎用的なUIコンポーネントとエフェクト

#### `src/utils/`

プロジェクト全体で使用されるユーティリティ関数を格納します。

#### `public/`

静的ファイル（画像、アイコン、マニフェストなど）を格納します。

## 🎨 特徴的な機能

### テーマ切り替え

3Dスフィアのテクスチャ（月・地球・太陽）を切り替えることで、サイト全体のテーマカラーが動的に変更されます。

### 3Dグラフィックス

React Three Fiberを使用して、インタラクティブな3Dオブジェクトを実装しています。

### アニメーション

Framer Motionによる滑らかなアニメーションで、ユーザーエクスペリエンスを向上させています。

## 📝 参考資料

- [Wantedly - Logical Studio](https://www.wantedly.com/companies/logical-studio/post_articles/927863)

## 📄 ライセンス

このプロジェクトはプライベートプロジェクトです。

## 👤 作成者

あなたの名前

---

何か質問や提案があれば、お気軽にお問い合わせください！
