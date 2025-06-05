import { Shield, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface SecureBadgeProps {
  level?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export const SecureBadge = ({ 
  level = 'high', 
  size = 'md',
  pulse = false 
}: SecureBadgeProps) => {
  const getColor = () => {
    switch (level) {
      case 'low':
        return 'text-yellow-500';
      case 'medium':
        return 'text-secondary-500';
      case 'high':
        return 'text-primary-500';
      default:
        return 'text-primary-500';
    }
  };
  
  const getSize = () => {
    switch (size) {
      case 'sm':
        return { icon: 14, text: 'text-xs' };
      case 'md':
        return { icon: 18, text: 'text-sm' };
      case 'lg':
        return { icon: 22, text: 'text-base' };
      default:
        return { icon: 18, text: 'text-sm' };
    }
  };
  
  const sizeInfo = getSize();
  const colorClass = getColor();
  
  return (
    <motion.div 
      className={`inline-flex items-center gap-1 rounded-full bg-white/10 dark:bg-dark-300/20 
        px-2.5 py-0.5 backdrop-blur-sm border border-white/20 dark:border-dark-200/30 ${colorClass}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={pulse ? { scale: [1, 1.1, 1] } : {}}
        transition={pulse ? { 
          repeat: Infinity, 
          duration: 2,
          repeatType: 'loop',
          ease: 'easeInOut'
        } : {}}
      >
        {level === 'high' ? (
          <ShieldCheck size={sizeInfo.icon} className="mr-0.5" />
        ) : (
          <Shield size={sizeInfo.icon} className="mr-0.5" />
        )}
      </motion.div>
      <span className={`font-medium ${sizeInfo.text}`}>
        {level === 'high' 
          ? 'Secured' 
          : level === 'medium' 
            ? 'Protected' 
            : 'Basic'}
      </span>
    </motion.div>
  );
};