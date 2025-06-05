import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass'| 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-300';
    
    const variants = {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm',
      secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm',
      outline: 'border-2 border-primary-500 text-primary-500 dark:text-primary-400 hover:bg-primary-500/10',
      ghost: 'text-primary-500 dark:text-primary-400 hover:bg-primary-500/10',
      glass: 'backdrop-blur-lg bg-white/20 dark:bg-dark-300/30 border border-white/20 dark:border-dark-200/30 text-dark-300 dark:text-light-100 hover:bg-white/30 dark:hover:bg-dark-200/40',
      destructive: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
    };
    
    const sizes = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-6 py-2.5',
      lg: 'text-lg px-8 py-3',
    };
    
    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '',
      fullWidth ? 'w-full' : '',
      className
    );

    // Separate motion props from HTML button props
    const {
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onTransitionEnd,
      onDrag,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragExit,
      onDragLeave,
      onDragOver,
      onDrop,
      ...buttonProps
    } = props;
    
    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
        {...buttonProps}
      >
        {isLoading && (
          <svg 
            className={cn(
              "animate-spin h-4 w-4 text-current",
              iconPosition === 'left' ? '-ml-1 mr-2' : 'ml-2 -mr-1'
            )} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && !isLoading && (
          <span className="ml-2">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };