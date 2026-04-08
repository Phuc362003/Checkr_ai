/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Screen, Job, User } from './types';
import { MOCK_USER, MOCK_JOBS, MOCK_COMPANIES } from './constants';
import { NavigationBar } from './components/ui/NavigationBar';
import { Home } from './screens/Home';
import { Search } from './screens/Search';
import { JobDetails } from './screens/JobDetails';
import { Profile } from './screens/Profile';
import { Notifications } from './screens/Notifications';
import { Auth } from './screens/Auth';
import { KYC } from './screens/KYC';
import { SavedJobs } from './screens/SavedJobs';
import { CVManager } from './screens/CVManager';

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('home');
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [user, setUser] = React.useState<User>(MOCK_USER);
  const [jobs, setJobs] = React.useState<Job[]>(MOCK_JOBS);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setCurrentScreen('job-details');
  };

  const handleToggleSave = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, isSaved: !j.isSaved } : j));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onJobClick={handleJobClick} onSave={handleToggleSave} jobs={jobs} user={user} onNavigate={handleNavigate} />;
      case 'search':
        return <Search onJobClick={handleJobClick} onSave={handleToggleSave} jobs={jobs} />;
      case 'job-details':
        return selectedJob ? (
          <JobDetails job={selectedJob} onBack={() => handleNavigate('home')} onSave={handleToggleSave} />
        ) : null;
      case 'profile':
        return <Profile user={user} onNavigate={handleNavigate} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
      case 'notifications':
        return <Notifications onBack={() => handleNavigate('home')} />;
      case 'auth':
        return <Auth onLogin={() => handleNavigate('home')} />;
      case 'kyc':
        return <KYC onComplete={() => handleNavigate('profile')} onBack={() => handleNavigate('profile')} />;
      case 'saved':
        return <SavedJobs jobs={jobs.filter(j => j.isSaved)} onJobClick={handleJobClick} onSave={handleToggleSave} onBack={() => handleNavigate('home')} />;
      case 'cv-manager':
        return <CVManager onBack={() => handleNavigate('profile')} />;
      default:
        return <Home onJobClick={handleJobClick} onSave={handleToggleSave} jobs={jobs} user={user} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-on-background pb-24 max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {['home', 'search', 'saved', 'notifications', 'profile'].includes(currentScreen) && (
          <NavigationBar activeScreen={currentScreen} onNavigate={handleNavigate} />
        )}
      </div>
    </div>
  );
}
