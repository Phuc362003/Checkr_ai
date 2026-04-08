import * as React from 'react';
import { Job } from '@/src/types';
import { Card } from './ui/Card';
import { Chip } from './ui/Chip';
import { Bookmark, MapPin, DollarSign, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  onSave?: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, onSave }) => {
  return (
    <Card
      onClick={() => onClick(job)}
      className="cursor-pointer group relative overflow-hidden"
      whileHover={{ y: -4 }}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center p-2 border border-surface-variant">
          <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-display font-semibold text-on-surface leading-tight group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-on-surface-variant font-medium">{job.company}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave?.(job.id);
              }}
              className="p-2 -mt-2 -mr-2 rounded-full hover:bg-primary/10 transition-colors"
            >
              <Bookmark className={cn('w-5 h-5', job.isSaved ? 'fill-primary text-primary' : 'text-on-surface-variant')} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-xs text-on-surface-variant">
              <MapPin className="w-3 h-3" />
              {job.location}
            </div>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold">
              <DollarSign className="w-3 h-3" />
              {job.salary}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            {job.tags.slice(0, 2).map((tag) => (
              <Chip key={tag} label={tag} className="px-2 py-0.5 text-[10px] h-auto" />
            ))}
            <div className="ml-auto flex items-center gap-1 text-[10px] text-on-surface-variant opacity-60">
              <Clock className="w-3 h-3" />
              {job.postedAt}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const FeaturedJobCard: React.FC<JobCardProps> = ({ job, onClick, onSave }) => {
  return (
    <Card
      onClick={() => onClick(job)}
      className="cursor-pointer min-w-[280px] w-[280px] gradient-primary text-on-primary p-6 relative overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Decorative background circles */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center p-3 border border-white/30">
            <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain brightness-0 invert" referrerPolicy="no-referrer" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave?.(job.id);
            }}
            className="p-2 -mt-2 -mr-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <Bookmark className={cn('w-6 h-6', job.isSaved ? 'fill-white text-white' : 'text-white/70')} />
          </button>
        </div>

        <div className="mt-6">
          <h3 className="font-display font-bold text-xl leading-tight">{job.title}</h3>
          <p className="text-white/80 font-medium mt-1">{job.company}</p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-white/60">Salary</span>
            <span className="font-bold text-lg">{job.salary}</span>
          </div>
          <Chip label={job.type} className="bg-white/20 border-none text-white text-xs" />
        </div>
      </div>
    </Card>
  );
};
