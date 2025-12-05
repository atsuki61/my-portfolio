// src/components/ui/form-components.tsx
'use client';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { useMotionTemplate, useMotionValue, motion } from 'motion/react';

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = 'Label';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--theme-accent),
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <input
        type={type}
        className={cn(
          // ▼ 修正: bg-(--theme-bg), ring-2, ring-(--theme-accent) に変更
          `flex h-10 w-full border-none bg-(--theme-bg) text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--theme-accent) 
           disabled:cursor-not-allowed disabled:opacity-50
           group-hover/input:shadow-none transition duration-400
           `,
          className,
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
Input.displayName = 'Input';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--theme-accent),
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <textarea
        className={cn(
          // ▼ 修正: bg-(--theme-bg), ring-2, ring-(--theme-accent) に変更
          `flex min-h-[120px] w-full border-none bg-(--theme-bg) text-white shadow-input rounded-md px-3 py-2 text-sm  
          placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--theme-accent)
           disabled:cursor-not-allowed disabled:opacity-50
           group-hover/input:shadow-none transition duration-400
           `,
          className,
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
Textarea.displayName = 'Textarea';
