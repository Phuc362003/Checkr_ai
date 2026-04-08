import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'filled' | 'tonal' | 'outlined' | 'text' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', size = 'md', ...props }, ref) => {
    const variants = {
      filled: 'bg-primary text-on-primary shadow-m3-1 hover:shadow-m3-2 active:shadow-m3-1',
      tonal: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80',
      outlined: 'border border-outline text-primary hover:bg-primary/5',
      text: 'text-primary hover:bg-primary/5',
      gradient: 'gradient-primary text-on-primary shadow-m3-2 hover:shadow-m3-3 active:shadow-m3-2',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-full',
      md: 'px-6 py-2.5 text-base font-medium rounded-full',
      lg: 'px-8 py-3.5 text-lg font-semibold rounded-full',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 ripple',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
