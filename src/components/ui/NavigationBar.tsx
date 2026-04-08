import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Home, Search, Bookmark, User, Bell } from 'lucide-react';
import { Screen } from '@/src/types';

interface NavigationBarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeScreen, onNavigate }) => {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-variant px-2 pb-safe pt-3 flex justify-around items-center z-50">
      {items.map((item) => {
        const isActive = activeScreen === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className="flex flex-col items-center gap-1 min-w-[64px] relative"
          >
            <div className="relative">
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -inset-x-4 -inset-y-1 bg-secondary-container rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon
                className={cn(
                  'w-6 h-6 transition-colors duration-200',
                  isActive ? 'text-on-secondary-container' : 'text-on-surface-variant'
                )}
              />
            </div>
            <span
              className={cn(
                'text-[11px] font-medium transition-colors duration-200',
                isActive ? 'text-on-surface font-semibold' : 'text-on-surface-variant'
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
