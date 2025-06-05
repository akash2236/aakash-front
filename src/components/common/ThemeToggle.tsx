import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 rounded-full flex items-center justify-center 
        bg-light-300 dark:bg-dark-200 hover:bg-light-400 dark:hover:bg-dark-100
        transition-colors duration-200 focus:outline-none"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'dark' ? (
        <motion.div
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="text-yellow-400" size={20} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, rotate: 30 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="text-primary-500" size={20} />
        </motion.div>
      )}
    </motion.button>
  );
};