"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "home",     label: "Home"     },
  { id: "about",    label: "About"    },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact"  },
];

export default function Header() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + window.innerHeight / 3;
      for (const { id } of NAV_ITEMS) {
        const sec = document.getElementById(id);
        if (sec && sec.offsetTop <= y) setActive(id);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <nav className="mx-auto max-w-4xl flex justify-center gap-8 p-4">
        {NAV_ITEMS.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            className={`px-3 py-1 rounded-lg transition
              ${active === id
                ? "text-black font-semibold"
                : "text-black hover:text-black"}
            `}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
