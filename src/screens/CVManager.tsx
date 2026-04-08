import * as React from 'react';
import { TopAppBar } from '../components/ui/TopAppBar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FileText, Plus, MoreVertical, Download, Trash2 } from 'lucide-react';

interface CVManagerProps {
  onBack: () => void;
}

export const CVManager: React.FC<CVManagerProps> = ({ onBack }) => {
  const resumes = [
    { id: '1', name: 'Software_Engineer_Resume.pdf', date: 'Uploaded on Oct 12, 2025', size: '1.2 MB', isDefault: true },
    { id: '2', name: 'Product_Designer_CV.pdf', date: 'Uploaded on Sep 05, 2025', size: '2.4 MB', isDefault: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopAppBar title="CV Manager" onBack={onBack} />

      <div className="px-4 py-4 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest px-2">Your Resumes</h3>
          {resumes.map((resume) => (
            <Card key={resume.id} variant="outlined" className="p-4 flex items-center gap-4 border-outline/10">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm truncate">{resume.name}</h4>
                  {resume.isDefault && (
                    <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-bold rounded-full uppercase">Default</span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant opacity-60">{resume.date} • {resume.size}</p>
              </div>
              <button className="p-2 rounded-full hover:bg-surface-variant">
                <MoreVertical className="w-5 h-5 text-on-surface-variant" />
              </button>
            </Card>
          ))}
        </div>

        <div className="pt-4">
          <Button variant="outlined" className="w-full border-dashed border-2 py-8 flex flex-col gap-2 h-auto rounded-[24px]">
            <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold">Upload New Resume</span>
            <span className="text-xs text-on-surface-variant font-normal">PDF, DOCX up to 10MB</span>
          </Button>
        </div>

        <Card className="bg-primary-container/20 border-none p-6">
          <h3 className="font-bold text-primary mb-2">Resume Tips</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Keep your resume updated with your latest achievements. Most employers prefer PDF format for better compatibility.
          </p>
          <Button variant="text" size="sm" className="mt-2 -ml-3">View Resume Guide</Button>
        </Card>
      </div>
    </div>
  );
};
