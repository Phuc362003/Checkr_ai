import * as React from 'react';
import { Job } from '../types';
import { TopAppBar } from '../components/ui/TopAppBar';
import { JobCard } from '../components/JobCards';
import { Chip } from '../components/ui/Chip';
import { Search as SearchIcon, X, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onSave: (id: string) => void;
}

export const Search: React.FC<SearchProps> = ({ jobs, onJobClick, onSave }) => {
  const [query, setQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  const filters = ['Remote', 'Full-time', 'Part-time', 'Contract', 'Senior', 'Junior'];

  const filteredJobs = jobs.filter(job => 
    (job.title.toLowerCase().includes(query.toLowerCase()) || 
     job.company.toLowerCase().includes(query.toLowerCase())) &&
    (selectedFilters.length === 0 || selectedFilters.some(f => job.type === f || job.tags.includes(f)))
  );

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-40 bg-surface px-4 pt-4 pb-2 space-y-4">
        <div className="flex items-center gap-3 bg-surface-variant p-3 rounded-2xl border border-outline/10">
          <SearchIcon className="w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-on-surface placeholder:text-on-surface-variant/60"
          />
          {query && <X className="w-5 h-5 cursor-pointer" onClick={() => setQuery('')} />}
          <div className="w-px h-6 bg-outline/20 mx-1" />
          <SlidersHorizontal className="w-5 h-5 text-primary cursor-pointer" />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map(filter => (
            <Chip
              key={filter}
              label={filter}
              selected={selectedFilters.includes(filter)}
              onClick={() => toggleFilter(filter)}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-on-surface-variant">
            {filteredJobs.length} jobs found
          </span>
          <div className="flex bg-surface-variant rounded-lg p-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={`px-4 mt-4 space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4 space-y-0' : ''}`}>
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={onJobClick} onSave={onSave} />
        ))}
        {filteredJobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-surface-variant rounded-full flex items-center justify-center mb-4">
              <SearchIcon className="w-8 h-8 text-on-surface-variant opacity-40" />
            </div>
            <h3 className="font-display font-bold text-lg">No jobs found</h3>
            <p className="text-on-surface-variant text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
