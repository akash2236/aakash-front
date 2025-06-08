import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { GlassPanel } from '../components/common/GlassPanel';
import { useAuth } from '../contexts/Authcontext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.requiresOtp) {
        setShowOtpVerification(true);
      } else {
        setAuthenticatedUser(data.user);
        localStorage.setItem("token",data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/verify-otp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'OTP verification failed');
      }
      localStorage.setItem("token",data.token);
      setAuthenticatedUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/api/auth/resend-otp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
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
            {showOtpVerification ? 'Verify Your Identity' : 'Welcome Back'}
          </h1>
          <p className="text-center text-dark-100 dark:text-light-300 mb-8">
            {showOtpVerification 
              ? `We've sent a verification code to ${email}`
              : 'Sign in to access your secure vault'}
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
                  Back to login
                </button>
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={isLoading}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline disabled:opacity-50"
                >
                  Resend code
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
            <form onSubmit={handleLogin}>
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
              
              <div className="mb-6">
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
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-light-400 dark:border-dark-200 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-100 dark:text-light-300">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mb-4"
                isLoading={isLoading}
              >
                Sign In
              </Button>
              
              <div className="text-center text-sm text-dark-100 dark:text-light-300">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          )}
        </GlassPanel>
      </motion.div>
    </div>
  );
};