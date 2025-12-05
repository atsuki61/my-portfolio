// src/components/ui/bento-grid.tsx

import { cn } from '@/utils/cn';

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn('grid md:auto-rows-[8rem] grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto ', className)}>
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
        'row-span-1 rounded-xl group/bento hover:shadow-xl shadow-input dark:shadow-none p-4 border border-white/10 justify-center flex flex-col space-y-2 bg-[var(--theme-card)] transition-colors duration-1000 ease-in-out',
        className,
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200 flex flex-col h-full justify-center items-center">
        {/* アイコンの色は theme-accent (惑星の色) に追従 */}
        <div className="text-4xl md:text-6xl text-[var(--theme-accent)] mb-2 group-hover/bento:brightness-125 transition-all duration-1000">
          {icon}
        </div>
        <div className="font-bold font-['Space_Grotesk'] text-gray-200 mt-2 text-sm md:text-base">{title}</div>
      </div>
    </div>
  );
};
