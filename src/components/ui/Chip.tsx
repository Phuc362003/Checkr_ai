import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'assist' | 'filter' | 'input' | 'suggestion';
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected,
  onClick,
  icon,
  variant = 'assist',
  className,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
        selected
          ? 'bg-secondary-container text-on-secondary-container'
          : 'bg-surface border border-outline text-on-surface-variant hover:bg-surface-variant',
        className
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
    </motion.button>
  );
};
