import * as React from 'react';
import { Job } from '../types';
import { TopAppBar } from '../components/ui/TopAppBar';
import { JobCard } from '../components/JobCards';
import { Bookmark } from 'lucide-react';

interface SavedJobsProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onSave: (id: string) => void;
  onBack: () => void;
}

export const SavedJobs: React.FC<SavedJobsProps> = ({ jobs, onJobClick, onSave, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopAppBar title="Saved Jobs" onBack={onBack} />

      <div className="px-4 py-4 space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={onJobClick} onSave={onSave} />
        ))}

        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <div className="w-20 h-20 bg-surface-variant rounded-full flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg">No saved jobs</h3>
            <p className="text-sm mt-1">Jobs you save will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};
