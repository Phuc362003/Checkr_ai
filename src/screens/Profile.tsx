import * as React from 'react';
import { User, Screen } from '../types';
import { TopAppBar } from '../components/ui/TopAppBar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  User as UserIcon, 
  Settings, 
  ChevronRight, 
  FileText, 
  ShieldCheck, 
  Moon, 
  Sun, 
  LogOut, 
  Briefcase, 
  GraduationCap,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onNavigate, isDarkMode, onToggleDarkMode }) => {
  const menuItems = [
    { icon: UserIcon, label: 'Personal Information', sub: 'Name, email, phone number' },
    { icon: FileText, label: 'Resume & Documents', sub: 'CV, cover letter, certifications', action: () => onNavigate('cv-manager') },
    { icon: Briefcase, label: 'Work Experience', sub: 'Previous roles and companies' },
    { icon: GraduationCap, label: 'Education', sub: 'Degrees and certifications' },
    { icon: Award, label: 'Skills & Portfolio', sub: 'Showcase your best work' },
    { icon: ShieldCheck, label: 'eKYC Verification', sub: 'Verify your identity', action: () => onNavigate('kyc'), highlight: !user.isVerified },
  ];

  return (
    <div className="flex flex-col">
      <TopAppBar
        title="Profile"
        actions={
          <button className="p-2 rounded-full hover:bg-surface-variant">
            <Settings className="w-6 h-6" />
          </button>
        }
      />

      <div className="px-6 py-6 flex flex-col items-center">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-primary/20 p-1">
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full bg-surface-variant" referrerPolicy="no-referrer" />
          </div>
          <button className="absolute bottom-1 right-1 w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-m3-1 border-2 border-surface">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <h2 className="mt-4 text-2xl font-display font-bold">{user.name}</h2>
        <p className="text-on-surface-variant text-sm">{user.email}</p>

        <div className="mt-6 flex gap-4 w-full">
          <Card className="flex-1 p-4 flex flex-col items-center text-center bg-primary-container/30 border-none">
            <span className="text-2xl font-bold text-primary">12</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Applied</span>
          </Card>
          <Card className="flex-1 p-4 flex flex-col items-center text-center bg-secondary-container/30 border-none">
            <span className="text-2xl font-bold text-secondary">05</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Interview</span>
          </Card>
          <Card className="flex-1 p-4 flex flex-col items-center text-center bg-tertiary-container/30 border-none">
            <span className="text-2xl font-bold text-tertiary">08</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Saved</span>
          </Card>
        </div>
      </div>

      <div className="px-4 space-y-2">
        <h3 className="px-2 text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-2">Account Settings</h3>
        
        <Card variant="outlined" className="p-0 overflow-hidden border-outline/10">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-4 hover:bg-surface-variant transition-colors border-b border-outline/5 last:border-none group"
              >
                <div className={`p-2 rounded-xl ${item.highlight ? 'bg-tertiary/10 text-tertiary' : 'bg-surface-variant text-on-surface-variant'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-sm">{item.label}</p>
                  <p className="text-xs text-on-surface-variant opacity-70">{item.sub}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-on-surface-variant opacity-30 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </Card>

        <h3 className="px-2 text-sm font-bold text-on-surface-variant uppercase tracking-widest mt-8 mb-2">Preferences</h3>
        
        <Card variant="outlined" className="p-0 overflow-hidden border-outline/10">
          <button
            onClick={onToggleDarkMode}
            className="w-full flex items-center gap-4 p-4 hover:bg-surface-variant transition-colors border-b border-outline/5"
          >
            <div className="p-2 rounded-xl bg-surface-variant text-on-surface-variant">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</p>
              <p className="text-xs text-on-surface-variant opacity-70">Switch app appearance</p>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-outline/30'}`}>
              <motion.div 
                animate={{ x: isDarkMode ? 24 : 0 }}
                className="w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </div>
          </button>
          
          <button className="w-full flex items-center gap-4 p-4 hover:bg-error/5 transition-colors text-error">
            <div className="p-2 rounded-xl bg-error/10">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm">Logout</p>
              <p className="text-xs opacity-70">Sign out of your account</p>
            </div>
          </button>
        </Card>
      </div>

      <div className="p-8 text-center">
        <p className="text-xs text-on-surface-variant opacity-40">CareerPath v1.0.0</p>
      </div>
    </div>
  );
};
