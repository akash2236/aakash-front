import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Key, Upload } from 'lucide-react';
import { Button } from '../components/common/Button';
import { GlassPanel } from '../components/common/GlassPanel';
import { useAuth } from '../contexts/Authcontext';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-400 text-dark-300 dark:text-light-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 dark:from-dark-400 dark:via-primary-900 dark:to-dark-300">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                Own Your Digital <span className="text-accent-400">Future</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-light-200 max-w-2xl">
                AetherVault provides unparalleled security for your most valuable digital assets with next-generation encryption and decentralized verification.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Button 
                    variant="primary"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-light-300"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button 
                    variant="primary"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-light-500"
                    onClick={() => navigate('/signup')}
                  >
                    Get Started
                  </Button>
                )}
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/100"
                  onClick={() => navigate('/features')}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <GlassPanel 
                blur="lg" 
                intensity="light" 
                className="p-6 w-full max-w-md aspect-square relative flex items-center justify-center"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-secondary-500/20 dark:bg-secondary-500/10 rounded-full animate-pulse-slow"></div>
                </div>
                <motion.div
                  animate={{ 
                    rotateZ: [0, 360],
                    scale: [1, 1.05, 1] 
                  }}
                  transition={{ 
                    rotateZ: {
                      repeat: Infinity,
                      duration: 20,
                      ease: "linear"
                    },
                    scale: {
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut"
                    }
                  }}
                  className="relative w-44 h-44 flex items-center justify-center"
                >
                  <div className="absolute inset-0 border-2 border-dashed border-secondary-400/40 rounded-full"></div>
                  <div className="absolute inset-4 border-2 border-primary-400/60 rounded-full"></div>
                  <div className="absolute inset-8 border-4 border-accent-500/30 rounded-full"></div>
                  <div className="absolute inset-16 border-2 border-white/70 rounded-full"></div>
                  <div className="bg-primary-500 rounded-2xl p-4 shadow-lg">
                    <ShieldCheck size={40} className="text-white" />
                  </div>
                </motion.div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
        {/* Wave Divider SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path 
              fill="currentColor" 
              className="text-light-100 dark:text-dark-300"
              fillOpacity="1" 
              d="M0,128L60,149.3C120,171,240,213,360,213.3C480,213,600,171,720,165.3C840,160,960,192,1080,186.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-light-100 dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark-300 dark:text-light-100">
                Next-Generation Security
              </h2>
              <p className="mt-4 text-lg text-dark-100 dark:text-light-300 max-w-3xl mx-auto">
                AetherVault combines cutting-edge encryption with intuitive design to keep your digital assets secure and accessible.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck size={32} className="text-primary-500 cursor-pointer" />,
                title: "Military-Grade Encryption",
                description: "AES-256 encryption keeps your data secure from unauthorized access at all times."
              },
              {
                icon: <Lock size={32} className="text-primary-500 cursor-pointer" />,
                title: "Biometric Access",
                description: "Unlock your vault with fingerprint, facial recognition, or voice authentication."
              },
              {
                icon: <Key size={32} className="text-primary-500 cursor-pointer" />,
                title: "Zero-Knowledge Architecture",
                description: "Your encryption keys never leave your device, ensuring complete privacy."
              },
              {
                icon: <Upload size={32} className="text-primary-500 cursor-pointer" />,
                title: "Decentralized Storage",
                description: "Distributed storage network ensures maximum uptime and resilience."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-dark-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-dark-300 dark:text-light-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-100 dark:text-light-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-light-200 dark:bg-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark-300 dark:text-light-100">
                Trusted by Thousands
              </h2>
              <p className="mt-4 text-lg text-dark-100 dark:text-light-300 max-w-3xl mx-auto">
                Join individuals and businesses who trust AetherVault for their digital security needs.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "AetherVault has completely transformed how we handle sensitive documents. The peace of mind is priceless.",
                author: "Sarah Johnson",
                role: "CTO, TechCorp"
              },
              {
                quote: "Finally a security solution that's both powerful and easy to use. Our team adopted it instantly.",
                author: "Michael Chen",
                role: "Security Lead, FinSecure"
              },
              {
                quote: "As a privacy advocate, I recommend AetherVault to all my clients. It's the gold standard.",
                author: "David Wilson",
                role: "Privacy Consultant"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-dark-300 rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 text-primary-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg italic text-dark-300 dark:text-light-100 mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-dark-300 dark:text-light-100">{testimonial.author}</p>
                  <p className="text-sm text-dark-100 dark:text-light-300">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-500 to-secondary-600 dark:from-dark-400 dark:to-dark-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to secure your digital future?
              </h2>
              <p className="mt-4 text-lg text-light-200">
                Join thousands of individuals and businesses who trust AetherVault for their most sensitive digital assets.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => navigate('/signup')}
                  >
                    Create Free Account
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => navigate('/features')}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};