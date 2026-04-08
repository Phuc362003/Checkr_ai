import * as React from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Mail, Github, Chrome, ArrowRight, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = React.useState<'login' | 'signup'>('login');

  return (
    <div className="flex flex-col min-h-screen bg-surface px-6 py-12">
      <div className="flex-1 flex flex-col justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 gradient-primary rounded-[24px] flex items-center justify-center mb-8 shadow-m3-3"
        >
          <Briefcase className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-4xl font-display font-bold text-on-surface leading-tight">
          Find your <span className="text-primary">dream job</span> with CareerPath
        </h1>
        <p className="text-on-surface-variant mt-4 text-lg">
          Join thousands of professionals finding their next career move.
        </p>

        <div className="mt-12 space-y-4">
          <Button variant="gradient" className="w-full h-14 flex gap-3" onClick={onLogin}>
            <Chrome className="w-5 h-5" />
            Continue with Google
          </Button>
          <Button variant="outlined" className="w-full h-14 flex gap-3" onClick={onLogin}>
            <Github className="w-5 h-5" />
            Continue with GitHub
          </Button>
          
          <div className="flex items-center gap-4 py-4">
            <div className="h-px bg-outline/20 flex-1" />
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">or</span>
            <div className="h-px bg-outline/20 flex-1" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Email Address</label>
              <div className="bg-surface-variant/50 border border-outline/10 rounded-2xl p-4 flex items-center gap-3">
                <Mail className="w-5 h-5 text-on-surface-variant" />
                <input type="email" placeholder="name@example.com" className="bg-transparent border-none outline-none flex-1" />
              </div>
            </div>
            <Button variant="filled" className="w-full h-14" onClick={onLogin}>
              Continue with Email
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-on-surface-variant">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-primary font-bold"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
        <p className="text-[10px] text-on-surface-variant mt-8 opacity-60">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
