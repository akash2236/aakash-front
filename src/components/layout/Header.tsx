import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../common/Button';
import { Menu, X, ShieldCheck, User, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/Authcontext'; // Assuming you have an auth context/hook

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Documents', path: '/documents' },
  { name: 'Upload', path: '/upload' },
  { name: 'Security', path: '/security' },
  { name: 'About', path: '/about' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // Auth state management

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-light-100/70 dark:bg-dark-300/70 border-b border-light-400/50 dark:border-dark-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center text-primary-500 mr-2"
              >
                <ShieldCheck className="w-8 h-8" />
              </motion.div>
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-xl font-sora font-bold text-primary-600 dark:text-primary-400 ">
                  Aethaur<span className="text-secondary-500">Vault</span>
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`font-medium transition-colors duration-200 py-2 border-b-2 ${
                  pathname === link.path
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                    <User size={18} className="text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-dark-300 dark:text-light-100">
                    {user?.name || 'Account'}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hidden md:inline-flex"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  className="hidden md:inline-flex"
                  onClick={() => navigate('/login')}
                  icon={<LogIn size={16} />}
                >
                  Log In
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-dark-300 dark:text-light-200"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-light-100 dark:bg-dark-300 border-t border-light-400 dark:border-dark-100"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.path
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-dark-100 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-200'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="pt-2 space-y-2">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mr-2">
                    <User size={18} className="text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-dark-300 dark:text-light-100">
                    {user?.name || 'Account'}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    navigate('/signup');
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  icon={<LogIn size={16} />}
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};