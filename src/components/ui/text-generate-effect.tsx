// src/components/ui/text-generate-effect.tsx
'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'motion/react';
import { cn } from '@/utils/cn';

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  // let -> const に変更
  const wordsArray = words.split(' ');

  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(
        'span',
        {
          opacity: 1,
          filter: filter ? 'blur(0px)' : 'none',
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        },
      );
    }, delay * 1000);

    return () => clearTimeout(timeout);
    // 依存配列に必要な変数を追加
  }, [scope, animate, delay, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? 'blur(10px)' : 'none',
              }}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className="mt-4">
        <div className=" dark:text-white text-black leading-snug tracking-wide">{renderWords()}</div>
      </div>
    </div>
  );
};
