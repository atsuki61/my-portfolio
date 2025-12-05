// src/components/ui/bento-grid.tsx
'use client';

import { cn } from '@/utils/cn';

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div
      className={cn(
        // グリッドの高さを少し低く調整 (9rem -> 8rem)
        'grid md:auto-rows-[8rem] grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto ',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // ▼ ここを変更: 固定の bg-slate-900 を bg-theme-card に変更
        'row-span-1 rounded-xl group/bento hover:shadow-xl transition-all duration-500 shadow-input dark:shadow-none p-4 border border-transparent justify-center flex flex-col space-y-2 bg-theme-card border-white/10',
        className,
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200 flex flex-col h-full justify-center items-center">
        {/* ▼ ここを変更: 固定の text-cyan-400 を text-theme-accent に変更 */}
        <div className="text-4xl md:text-6xl text-theme-accent mb-2 group-hover/bento:brightness-125 transition-all duration-500">
          {icon}
        </div>
        <div className="font-bold font-['Space_Grotesk'] text-theme-text mt-2 text-sm md:text-base">{title}</div>
      </div>
    </div>
  );
};
