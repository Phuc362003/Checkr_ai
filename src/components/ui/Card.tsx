import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'elevated' | 'filled' | 'outlined';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', ...props }, ref) => {
    const variants = {
      elevated: 'bg-surface shadow-m3-1 hover:shadow-m3-2',
      filled: 'bg-surface-variant',
      outlined: 'bg-surface border border-outline-variant',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-[20px] p-4 transition-shadow duration-200',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
