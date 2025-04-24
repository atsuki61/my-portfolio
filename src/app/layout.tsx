// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      {/* 白背景＋黒文字＋アンチエイリアス */}
      <body className="bg-white text-black antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
