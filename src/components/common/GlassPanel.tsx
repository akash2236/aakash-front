import { forwardRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'light' | 'medium' | 'heavy' | 'ultra';
  border?: boolean;
  borderSize?: 'sm' | 'md' | 'lg';
  className?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ 
    children, 
    blur = 'md', 
    intensity = 'medium', 
    border = true, 
    borderSize = 'md',
    shadow = 'md',
    className, 
    ...props 
  }, ref) => {
    const blurValues = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl'
    };
    
    const intensityValues = {
      light: 'bg-white/10 dark:bg-dark-300/10',
      medium: 'bg-white/20 dark:bg-dark-300/20',
      heavy: 'bg-white/30 dark:bg-dark-300/30',
      ultra: 'bg-white/40 dark:bg-dark-300/40'
    };
    
    const borderClasses = {
      sm: 'border',
      md: 'border-2',
      lg: 'border-4'
    };
    
    const borderColor = 'border-white/20 dark:border-dark-200/30';
    
    const shadowClasses = {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      none: ''
    };
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          blurValues[blur],
          intensityValues[intensity],
          border ? cn(borderClasses[borderSize], borderColor) : '',
          shadowClasses[shadow],
          'rounded-xl overflow-hidden',
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';