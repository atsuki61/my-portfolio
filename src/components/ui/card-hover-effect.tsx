// src/components/ui/card-hover-effect.tsx
'use client';

import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { IconType } from 'react-icons';

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: IconType; // アイコンコンポーネントを受け取れるようにする
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 py-10', className)}>
      {items.map((item, idx) => (
        <div
          key={item?.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col items-center justify-center gap-4 h-full min-h-[120px]">
              {/* アイコン表示部分 */}
              <item.icon className="text-5xl text-gray-300 group-hover:text-white transition-colors duration-200" />
              <CardTitle>{item.title}</CardTitle>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 transition-colors duration-200',
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h4 className={cn('text-gray-100 font-bold tracking-wide mt-2', className)}>{children}</h4>;
};
