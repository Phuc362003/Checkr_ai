import * as React from 'react';
import { TopAppBar } from '../components/ui/TopAppBar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Camera, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface KYCProps {
  onComplete: () => void;
  onBack: () => void;
}

export const KYC: React.FC<KYCProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = React.useState(1);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleNext = () => {
    if (step < 3) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setStep(step + 1);
      }, 1500);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopAppBar title="Identity Verification" onBack={onBack} />

      <div className="px-6 py-4">
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span className="text-[10px] uppercase font-bold opacity-60">Step {s}</span>
            </div>
          ))}
          <div className="absolute top-[108px] left-12 right-12 h-0.5 bg-surface-variant -z-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-display font-bold">Verify your identity</h2>
              <p className="text-on-surface-variant text-sm mt-2">To ensure a safe community, we need to verify your identity before you can apply for certain jobs.</p>
            </div>

            <Card variant="outlined" className="p-6 border-primary/20 bg-primary/5">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                Why verify?
              </h3>
              <ul className="text-sm space-y-2 text-on-surface-variant">
                <li>• Build trust with top employers</li>
                <li>• Access exclusive high-paying jobs</li>
                <li>• Faster application processing</li>
              </ul>
            </Card>

            <div className="space-y-4 pt-4">
              <Button variant="gradient" className="w-full" onClick={handleNext}>Start Verification</Button>
              <Button variant="text" className="w-full" onClick={onBack}>Maybe Later</Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-xl font-display font-bold">Upload ID Document</h2>
            <p className="text-on-surface-variant text-sm">Please take a clear photo of your ID card or Passport.</p>

            <div className="aspect-[3/2] border-2 border-dashed border-outline/30 rounded-3xl flex flex-col items-center justify-center gap-4 bg-surface-variant/20 hover:bg-surface-variant/40 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center shadow-m3-1 group-hover:scale-110 transition-transform">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-on-surface-variant">Tap to take photo</p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-surface-variant rounded-2xl">
              <Upload className="w-5 h-5 text-on-surface-variant" />
              <div className="flex-1">
                <p className="text-sm font-bold">Or upload a file</p>
                <p className="text-xs text-on-surface-variant">PDF, JPG, PNG (Max 5MB)</p>
              </div>
              <Button variant="tonal" size="sm">Browse</Button>
            </div>

            <div className="pt-8">
              <Button variant="gradient" className="w-full" onClick={handleNext} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Continue'}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-center">
            <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-display font-bold">Verification Pending</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Thank you! Your documents have been submitted successfully. Our team will review them within 24-48 hours.
            </p>
            
            <Card className="bg-surface-variant/30 border-none p-6 text-left mt-8">
              <h3 className="font-bold mb-2">What happens next?</h3>
              <p className="text-sm text-on-surface-variant">You'll receive a notification once your verification is complete. In the meantime, you can still browse and save jobs.</p>
            </Card>

            <div className="pt-8">
              <Button variant="gradient" className="w-full" onClick={onComplete}>Back to Profile</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
