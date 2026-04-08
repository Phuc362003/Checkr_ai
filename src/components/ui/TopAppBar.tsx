import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { ArrowLeft, MoreVertical } from 'lucide-react';

interface TopAppBarProps {
  title: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  variant?: 'small' | 'medium' | 'large';
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  onBack,
  actions,
  variant = 'small',
}) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-40 bg-surface/80 backdrop-blur-md px-4 flex items-center transition-all duration-300',
        variant === 'small' ? 'h-16' : variant === 'medium' ? 'h-28 items-end pb-4' : 'h-40 items-end pb-6'
      )}
    >
      <div className="flex items-center w-full">
        {onBack && (
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-surface-variant transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        <h1
          className={cn(
            'font-display font-medium transition-all duration-300',
            variant === 'small' ? 'text-xl ml-2' : variant === 'medium' ? 'text-2xl' : 'text-3xl'
          )}
        >
          {title}
        </h1>

        <div className="ml-auto flex items-center gap-2">
          {actions}
          <button className="p-2 rounded-full hover:bg-surface-variant transition-colors">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
