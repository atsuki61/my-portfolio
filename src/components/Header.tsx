'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + window.innerHeight / 3;
      for (const { id } of NAV_ITEMS) {
        const sec = document.getElementById(id);
        if (sec && sec.offsetTop <= y) setActive(id);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <header className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <div className="mx-auto max-w-4xl flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/favicon-32x32.png" alt="Logo" width={32} height={32} className="mr-2" />
        </Link>
        <nav className="flex gap-8">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={`px-3 py-1 rounded-lg transition cursor-pointer
                ${active === id ? 'text-black font-semibold' : 'text-black hover:text-black'}
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
