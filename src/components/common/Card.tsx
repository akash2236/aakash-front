import { forwardRef,ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { motion ,HTMLMotionProps } from 'framer-motion';

export type CardVariant = 'glass' | 'neumorphic' | 'standard';

  interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: CardVariant;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'standard', hover = false, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'glass':
          return 'backdrop-blur-lg bg-white/20 dark:bg-dark-300/30 border border-white/20 dark:border-dark-200/30';
        case 'neumorphic':
          return 'bg-light-200 dark:bg-dark-200 shadow-neumorphic-light dark:shadow-neumorphic-dark';
        default:
          return 'bg-white dark:bg-dark-200 shadow-md';
      }
    };

    const baseClasses = 'rounded-xl p-6';
    const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-xl' : '';
    
    const cardClasses = cn(
      baseClasses,
      getVariantClasses(),
      hoverClasses,
      className
    );
    
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card };