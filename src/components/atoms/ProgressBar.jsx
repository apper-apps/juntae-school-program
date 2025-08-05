import React from 'react';
import { cn } from '@/utils/cn';
import Text from '@/components/atoms/Text';

const ProgressBar = ({ 
  progress = 0, 
  showPercentage = true, 
  className = '', 
  height = 'h-2',
  ...props 
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-slate-600';
    if (progress < 30) return 'bg-accent-500';
    if (progress < 70) return 'bg-secondary-500'; 
    if (progress < 100) return 'bg-primary-500';
    return 'bg-emerald-500';
  };

  return (
    <div className={cn('w-full space-y-1', className)} {...props}>
      {showPercentage && (
        <div className="flex justify-between items-center">
          <Text className="text-slate-400 text-xs korean-text">
            시청 진행률
          </Text>
          <Text className="text-slate-300 text-xs font-medium">
            {normalizedProgress}%
          </Text>
        </div>
      )}
      
      <div className={cn('w-full bg-slate-700 rounded-full overflow-hidden', height)}>
        <div 
          className={cn(
            'h-full transition-all duration-500 ease-out rounded-full',
            getProgressColor(normalizedProgress)
          )}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;