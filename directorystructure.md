# ディレクトリ構成 (src以下)

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # お問い合わせフォームAPIエンドポイント
│   ├── globals.css              # グローバルCSSスタイル
│   ├── layout.tsx               # ルートレイアウトコンポーネント
│   └── page.tsx                 # ホームページコンポーネント
├── components/
│   ├── sections/                # 各ページセクションコンポーネント
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── HeroSection.tsx
│   │   └── ProjectsSection.tsx
│   ├── ui/                      # 汎用UIコンポーネント
│   │   └── Button.tsx
│   ├── Footer.tsx               # フッターコンポーネント
│   ├── Header.tsx               # ヘッダーコンポーネント
│   └── TextureSphere.tsx        # HeroSection用3Dテクスチャ球体コンポーネント
└── utils/                     # ユーティリティ関数
    ├── sendEmail.ts             # メール送信関連処理
    └── validation.ts            # フォームバリデーションルール
```
