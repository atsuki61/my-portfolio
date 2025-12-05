// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[var(--theme-bg)] border-t border-white/10 text-white py-8 transition-colors duration-1000 ease-in-out">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <p className="text-sm text-gray-400 font-['Space_Grotesk']">
          © {new Date().getFullYear()} Atsuki. All rights reserved.
        </p>

        {/* クレジット表記（ハートの色がテーマカラーに変わります） */}
        <p className="text-xs text-gray-500 font-mono flex items-center gap-1">
          Designed & Built with
          <span className="text-[var(--theme-accent)] text-base transition-colors duration-1000 animate-pulse">♥</span>
        </p>
      </div>
    </footer>
  );
}
