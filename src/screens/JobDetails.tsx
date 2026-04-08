import * as React from 'react';
import { Job } from '../types';
import { TopAppBar } from '../components/ui/TopAppBar';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { Bookmark, MapPin, DollarSign, Clock, Building2, Globe, Users, Share2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface JobDetailsProps {
  job: Job;
  onBack: () => void;
  onSave: (id: string) => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack, onSave }) => {
  const [isApplied, setIsApplied] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleApply = () => {
    setIsApplied(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-32">
      <TopAppBar
        title=""
        onBack={onBack}
        actions={
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-surface-variant">
              <Share2 className="w-6 h-6" />
            </button>
            <button onClick={() => onSave(job.id)} className="p-2 rounded-full hover:bg-surface-variant">
              <Bookmark className={cn('w-6 h-6', job.isSaved ? 'fill-primary text-primary' : '')} />
            </button>
          </div>
        }
      />

      <div className="px-6 pt-4 flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-3xl bg-white shadow-m3-2 flex items-center justify-center p-4 border border-surface-variant mb-6"
        >
          <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </motion.div>

        <h1 className="text-2xl font-display font-bold text-on-surface">{job.title}</h1>
        <div className="flex items-center gap-2 mt-2 text-primary font-semibold">
          <Building2 className="w-4 h-4" />
          {job.company}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-variant rounded-full text-xs font-medium text-on-surface-variant">
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-container rounded-full text-xs font-bold text-on-primary-container">
            <DollarSign className="w-3.5 h-3.5" />
            {job.salary}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary-container rounded-full text-xs font-medium text-on-secondary-container">
            <Clock className="w-3.5 h-3.5" />
            {job.postedAt}
          </div>
        </div>
      </div>

      <div className="mt-10 px-6 space-y-8">
        <section>
          <h2 className="text-lg font-display font-bold mb-4">Job Description</h2>
          <p className="text-on-surface-variant leading-relaxed">
            {job.description}
            <br /><br />
            As a {job.title} at {job.company}, you will be responsible for designing and implementing high-quality software solutions. You will work closely with cross-functional teams to deliver impactful products to our global users.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold mb-4">Requirements</h2>
          <ul className="space-y-3">
            {['3+ years of experience in relevant field', 'Strong proficiency in core technologies', 'Excellent problem-solving skills', 'Good communication and teamwork'].map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-on-surface-variant">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold mb-4">Skills & Tags</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map(tag => (
              <Chip key={tag} label={tag} variant="assist" />
            ))}
          </div>
        </section>

        <section className="bg-surface-variant/30 p-6 rounded-[24px] border border-outline/5">
          <h2 className="text-lg font-display font-bold mb-4">About Company</h2>
          <div className="flex gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2">
              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h3 className="font-bold">{job.company}</h3>
              <p className="text-xs text-on-surface-variant">Internet & Technology</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Globe className="w-4 h-4" />
              www.{job.company.toLowerCase()}.com
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Users className="w-4 h-4" />
              10,000+ Employees
            </div>
          </div>
          <Button variant="outlined" size="sm" className="w-full mt-6">Follow Company</Button>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-surface/80 backdrop-blur-lg border-t border-surface-variant z-50 max-w-md mx-auto">
        <Button 
          variant={isApplied ? 'tonal' : 'gradient'} 
          className="w-full h-14 text-lg"
          onClick={handleApply}
          disabled={isApplied}
        >
          {isApplied ? 'Application Sent' : 'Apply Now'}
        </Button>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-6 right-6 bg-primary text-on-primary p-4 rounded-2xl shadow-m3-3 flex items-center gap-3 z-[60] max-w-[calc(448px-3rem)] mx-auto"
          >
            <CheckCircle2 className="w-6 h-6" />
            <div className="flex-1">
              <p className="font-bold text-sm">Success!</p>
              <p className="text-xs opacity-90">Your application has been sent to {job.company}.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
