import * as React from 'react';
import { Job, User, Screen } from '../types';
import { TopAppBar } from '../components/ui/TopAppBar';
import { FeaturedJobCard, JobCard } from '../components/JobCards';
import { Button } from '../components/ui/Button';
import { Bell, Search as SearchIcon, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  user: User;
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onSave: (id: string) => void;
  onNavigate: (screen: Screen) => void;
}

export const Home: React.FC<HomeProps> = ({ user, jobs, onJobClick, onSave, onNavigate }) => {
  const featuredJobs = jobs.filter(j => j.isFeatured);
  const recommendedJobs = jobs.filter(j => !j.isFeatured);

  return (
    <div className="flex flex-col">
      <TopAppBar
        title={`Hi, ${user.name} 👋`}
        variant="medium"
        actions={
          <button onClick={() => onNavigate('notifications')} className="p-2 rounded-full hover:bg-surface-variant relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border border-surface" />
          </button>
        }
      />

      <div className="px-4 mt-2">
        <div 
          onClick={() => onNavigate('search')}
          className="flex items-center gap-3 bg-surface-variant/50 p-4 rounded-2xl border border-outline/10 cursor-pointer hover:bg-surface-variant transition-colors"
        >
          <SearchIcon className="w-5 h-5 text-on-surface-variant" />
          <span className="text-on-surface-variant/60 flex-1">Search for jobs, companies...</span>
          <Filter className="w-5 h-5 text-primary" />
        </div>
      </div>

      <section className="mt-8">
        <div className="px-4 flex justify-between items-center mb-4">
          <h2 className="text-xl font-display font-bold">Featured Jobs</h2>
          <Button variant="text" size="sm" onClick={() => onNavigate('search')}>See all</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
          {featuredJobs.map((job) => (
            <FeaturedJobCard key={job.id} job={job} onClick={onJobClick} onSave={onSave} />
          ))}
        </div>
      </section>

      <section className="mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-display font-bold">Recommended for you</h2>
        </div>
        <div className="space-y-4">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={onJobClick} onSave={onSave} />
          ))}
        </div>
      </section>

      <section className="mt-8 px-4 mb-8">
        <div className="bg-tertiary-container text-on-tertiary-container p-6 rounded-[24px] relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-display font-bold text-lg">Complete your profile</h3>
            <p className="text-sm opacity-80 mt-1">Get 2x more job recommendations by completing your profile.</p>
            <div className="mt-4 bg-white/30 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${user.profileStrength}%` }}
                className="h-full bg-tertiary"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs font-bold">{user.profileStrength}% complete</span>
              <Button variant="tonal" size="sm" onClick={() => onNavigate('profile')} className="bg-white/20 hover:bg-white/30 border-none">Finish now</Button>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-tertiary/20 rounded-full blur-2xl" />
        </div>
      </section>
    </div>
  );
};
