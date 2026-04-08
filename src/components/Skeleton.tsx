import { cn } from '@/src/lib/utils';

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn('animate-pulse bg-surface-variant rounded-md', className)} />
  );
};

export const JobCardSkeleton = () => (
  <div className="p-4 rounded-[20px] bg-surface shadow-m3-1 flex gap-4">
    <Skeleton className="w-12 h-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="pt-2 flex gap-2">
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-lg" />
      </div>
    </div>
  </div>
);
