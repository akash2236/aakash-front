import { Link } from 'react-router-dom';
import { ShieldCheck, Twitter, Github as GitHub, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-light-200 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center text-primary-500 mb-4">
              <ShieldCheck className="w-7 h-7 mr-2" />
              <span className="text-lg font-sora font-bold">
                Aethaur<span className="text-secondary-500">Vault</span>
              </span>
            </div>
            <p className="text-dark-100 dark:text-light-300 text-sm">
              Secure your digital future with next-generation vault technology.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="https://github.com/akash2236" className="text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                <span className="sr-only">GitHub</span>
                <GitHub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/v-akash9371/" className="text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
              <a href="aakash.srisai@gmail.com" className="text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                <span className="sr-only">Mail</span>
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-dark-300 dark:text-light-100 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/features" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Security
                  </Link>
                </li>
                <li>
                  <Link to="/roadmap" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-dark-300 dark:text-light-100 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-dark-300 dark:text-light-100 tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/help" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/status" className="text-sm text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-light-400 dark:border-dark-100">
          <p className="text-center text-sm text-dark-100 dark:text-light-300">
            &copy; {new Date().getFullYear()} AethaurVault. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/privacy" className="text-xs text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
              Terms of Service
            </Link>
            <Link to="/legal" className="text-xs text-dark-100 dark:text-light-300 hover:text-primary-500 dark:hover:text-primary-400">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};