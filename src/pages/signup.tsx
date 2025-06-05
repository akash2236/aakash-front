import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { GlassPanel } from '../components/common/GlassPanel';
import { useAuth } from '../contexts/Authcontext';

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await fetch('http://localhost:3001/api/auth/signup-otp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setShowOtpVerification(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, otp }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'OTP verification failed');
      }

      setAuthenticatedUser(data.user);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700/5 via-primary-600/5 to-secondary-600/5 dark:from-dark-400/5 dark:via-primary-900/5 dark:to-dark-300/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassPanel blur="lg" intensity="light" className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-500 rounded-2xl p-3 shadow-lg">
              <ShieldCheck size={32} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-dark-300 dark:text-light-100 mb-2">
            {showOtpVerification ? 'Verify Your Email' : 'Create Your Account'}
          </h1>
          <p className="text-center text-dark-100 dark:text-light-300 mb-8">
            {showOtpVerification 
              ? `We've sent a verification code to ${email}`
              : 'Join AethaurVault to secure your digital assets'}
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {showOtpVerification ? (
            <form onSubmit={handleOtpVerification}>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-dark-100 dark:text-light-300 mb-2">
                  Enter 6-digit code
                </label>
                <div className="flex justify-center space-x-3">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[i] = e.target.value;
                        setOtp(newOtp.join('').substring(0, 6));
                        if (e.target.value && i < 5) {
                          const nextInput = document.getElementById(`otp-${i+1}`);
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      id={`otp-${i}`}
                      className="w-12 h-14 text-center text-xl font-medium border border-light-400 dark:border-dark-200 rounded-lg bg-light-100 dark:bg-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      autoFocus={i === 0}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={() => setShowOtpVerification(false)}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to sign up
                </button>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={otp.length !== 6}
              >
                Verify & Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-dark-100 dark:text-light-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-dark-100 dark:text-light-300" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-light-400 dark:border-dark-200 rounded-lg bg-light-100 dark:bg-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-dark-100 dark:text-light-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-dark-100 dark:text-light-300" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-light-400 dark:border-dark-200 rounded-lg bg-light-100 dark:bg-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-dark-100 dark:text-light-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-dark-100 dark:text-light-300" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-light-400 dark:border-dark-200 rounded-lg bg-light-100 dark:bg-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
                <p className="mt-1 text-xs text-dark-100 dark:text-light-300">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-dark-100 dark:text-light-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-dark-100 dark:text-light-300" />
                  </div>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-light-400 dark:border-dark-200 rounded-lg bg-light-100 dark:bg-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-light-400 dark:border-dark-200 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-dark-100 dark:text-light-300">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mb-4"
                isLoading={isLoading}
                disabled={!name || !email || password.length < 8 || password !== confirmPassword}
              >
                Create Account
              </Button>
              
              <div className="text-center text-sm text-dark-100 dark:text-light-300">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </GlassPanel>
      </motion.div>
    </div>
  );
};