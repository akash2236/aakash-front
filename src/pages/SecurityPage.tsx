import { motion } from 'framer-motion';
import { Shield, Fingerprint, Key, Lock, Bell, Eye, RefreshCw, Smartphone, QrCode } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { GlassPanel } from '../components/common/GlassPanel';

export const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-light-200 dark:bg-dark-300 pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-dark-300 dark:text-light-100">
            Security Settings
          </h1>
          <p className="text-dark-100 dark:text-light-300 mt-1">
            Configure your vault's security preferences and authentication methods
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Biometric Authentication */}
          <Card variant="neumorphic" className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                    <Fingerprint className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100">
                      Biometric Authentication
                    </h3>
                    <p className="text-sm text-dark-100 dark:text-light-300 mt-1">
                      Use fingerprint or Face ID to access your vault
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <motion.button
                  className="w-12 h-6 bg-primary-500 rounded-full relative"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"
                    layout
                  />
                </motion.button>
              </div>
            </div>
          </Card>

          {/* Two-Factor Authentication */}
          <Card variant="neumorphic" className="p-6">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary-500" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-dark-100 dark:text-light-300 mt-1">
                  Add an extra layer of security to your account
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  icon={<QrCode size={16} />}
                >
                  Setup 2FA
                </Button>
              </div>
            </div>
          </Card>

          {/* Encryption Keys */}
          <Card variant="neumorphic" className="p-6">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                <Key className="w-6 h-6 text-primary-500" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100">
                  Encryption Keys
                </h3>
                <p className="text-sm text-dark-100 dark:text-light-300 mt-1">
                  Manage your encryption keys and recovery phrases
                </p>
                <div className="mt-4 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<RefreshCw size={16} />}
                  >
                    Rotate Keys
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<Eye size={16} />}
                  >
                    View Backup
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Security Alerts */}
          <Card variant="neumorphic" className="p-6">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                <Bell className="w-6 h-6 text-primary-500" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100">
                  Security Alerts
                </h3>
                <p className="text-sm text-dark-100 dark:text-light-300 mt-1">
                  Configure notification preferences for security events
                </p>
                <div className="mt-4 space-y-2">
                  {['Login Attempts', 'Key Usage', 'File Access'].map((alert, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-dark-300 dark:text-light-100">{alert}</span>
                      <motion.button
                        className="w-10 h-5 bg-primary-500/20 dark:bg-primary-500/30 rounded-full relative"
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="w-4 h-4 bg-primary-500 rounded-full absolute top-0.5 right-0.5"
                          layout
                        />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Status */}
        <div className="mt-8">
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-primary-500" />
                <h3 className="ml-2 text-lg font-semibold text-dark-300 dark:text-light-100">
                  Security Status
                </h3>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                icon={<RefreshCw size={16} />}
              >
                Run Security Check
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Security Score', value: '98%', color: 'bg-success-500' },
                { label: 'Last Security Check', value: '2 hours ago', color: 'bg-primary-500' },
                { label: 'Active Sessions', value: '2 devices', color: 'bg-secondary-500' }
              ].map((stat, index) => (
                <div key={index} className="bg-light-300/50 dark:bg-dark-200/50 rounded-lg p-4">
                  <div className="text-sm text-dark-100 dark:text-light-300">{stat.label}</div>
                  <div className="mt-1 flex items-center">
                    <div className={`w-2 h-2 rounded-full ${stat.color} mr-2`} />
                    <div className="text-lg font-semibold text-dark-300 dark:text-light-100">
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};