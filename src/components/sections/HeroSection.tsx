// src/components/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center justify-center bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-center">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Hi! my name is atsuki!
        </motion.h1>
        <motion.p
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Next.js × TypeScript × Tailwind で作成中
        </motion.p>
      </div>
    </motion.section>
  );
}
