'use client';

import { useState, useEffect, useRef } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + window.innerHeight / 3;
      for (const { id } of NAV_ITEMS) {
        const sec = document.getElementById(id);
        if (sec && sec.offsetTop <= y) setActive(id);
      }

      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActive(id);
    }
  };

  const headerBaseClasses = "fixed top-0 w-full z-50 shadow-sm font-['Space_Grotesk'] transition-all duration-300";
  const headerBgClass = isScrolling ? 'bg-black/20' : 'bg-black/90';

  return (
    <header className={`${headerBaseClasses} ${headerBgClass}`}>
      <div className="mx-auto max-w-4xl flex items-center justify-end px-2 sm:px-4 py-3 sm:py-4">
        <nav className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-center">
          {/* SNSアイコン部分を削除しました */}

          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              style={{
                textShadow:
                  active === id
                    ? '0 0 8px #0AF, 0 0 15px #0AF, 0 0 20px #A0F, 0 0 30px #A0F'
                    : '0 0 5px #0BF, 0 0 10px #0BF, 0 0 15px #8A2BE2, 0 0 20px #8A2BE2',
              }}
              className={`px-1 sm:px-2 md:px-3 py-1 rounded-lg transition cursor-pointer text-sm sm:text-base
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
