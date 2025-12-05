// src/components/ui/3d-marquee.tsx
'use client';

import { motion } from 'framer-motion'; // または "motion/react"
import { cn } from '@/utils/cn';
import { IconType } from 'react-icons';

// 受け取るデータの型定義
type ItemType = {
  icon: IconType;
  title: string;
};

export const ThreeDMarquee = ({ items, className }: { items: ItemType[]; className?: string }) => {
  // 配列を4分割するロジック
  const chunkSize = Math.ceil(items.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return items.slice(start, start + chunkSize);
  });

  return (
    <div className={cn('mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-[500px] relative', className)}>
      {/* 上下のフェードマスク（端を自然に消す） */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      <div className="flex size-full items-center justify-center">
        <div className="size-[1200px] shrink-0 scale-75 md:scale-100">
          <div
            style={{
              transform: 'rotateX(20deg) rotateY(-10deg) rotateZ(20deg)', // 角度を少し調整して見やすく
            }}
            className="relative top-20 right-[20%] grid size-full origin-top-left grid-cols-4 gap-6 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? [0, -200] : [-200, 0] }} // 上下に動くアニメーション
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
                key={colIndex + 'marquee'}
                className="flex flex-col items-start gap-6"
              >
                <GridLineVertical
                  className="-left-4"
                  offset="80px"
                />
                {subarray.map((item, itemIndex) => (
                  <div
                    className="relative group"
                    key={itemIndex + item.title}
                  >
                    <GridLineHorizontal
                      className="-top-4"
                      offset="20px"
                    />

                    {/* ▼ ここをアイコンカードに変更 ▼ */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center justify-center gap-3 w-[200px] h-[160px] bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl shadow-lg relative z-10 hover:bg-slate-800 transition-colors"
                    >
                      <item.icon className="text-5xl text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                      <span className="text-white font-bold font-['Space_Grotesk'] tracking-wider">{item.title}</span>
                    </motion.div>
                    {/* ▲ ここまで ▲ */}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({ className, offset }: { className?: string; offset?: string }) => {
  return (
    <div
      style={
        {
          '--background': '#000000',
          '--color': 'rgba(255, 255, 255, 0.1)',
          '--height': '1px',
          '--width': '5px',
          '--fade-stop': '90%',
          '--offset': offset || '200px',
          '--color-dark': 'rgba(255, 255, 255, 0.1)',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={cn(
        'absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]',
        'bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]',
        '[background-size:var(--width)_var(--height)]',
        'z-0',
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({ className, offset }: { className?: string; offset?: string }) => {
  return (
    <div
      style={
        {
          '--background': '#000000',
          '--color': 'rgba(255, 255, 255, 0.1)',
          '--height': '5px',
          '--width': '1px',
          '--fade-stop': '90%',
          '--offset': offset || '150px',
          '--color-dark': 'rgba(255, 255, 255, 0.1)',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={cn(
        'absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]',
        'bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]',
        '[background-size:var(--width)_var(--height)]',
        'z-0',
        className,
      )}
    ></div>
  );
};
