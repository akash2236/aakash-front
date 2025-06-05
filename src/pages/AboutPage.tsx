import { motion } from 'framer-motion';
import { ShieldCheck, Shield, Globe, Users, Lock, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { GlassPanel } from '../components/common/GlassPanel';
import { useNavigate } from 'react-router-dom';

export const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-light-200 dark:bg-dark-300">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-dark-300 dark:text-light-100 mb-6">
                About AethaurVault
              </h1>
              <p className="text-lg md:text-xl text-dark-100 dark:text-light-300 max-w-3xl mx-auto">
                Pioneering the future of digital security with next-generation encryption and holochain verification technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-300 dark:text-light-100 mb-6">
                Our Mission
              </h2>
              <p className="text-dark-100 dark:text-light-300 mb-6">
                At AethaurVault, we believe in a future where digital security is seamless, 
                uncompromising, and accessible to everyone. Our mission is to revolutionize 
                how individuals and organizations protect their most valuable digital assets.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Military-grade encryption for all data' },
                  { icon: Globe, text: 'holochain-verified security' },
                  { icon: Users, text: 'Privacy-first approach' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <span className="ml-3 text-dark-300 dark:text-light-100">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <GlassPanel className="p-8 relative z-10">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 bg-primary-500/20 rounded-full animate-pulse-slow" />
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
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <div className="absolute inset-0 border-2 border-dashed border-primary-400/40 rounded-full" />
                    <div className="absolute inset-8 border-2 border-primary-400/60 rounded-full" />
                    <div className="absolute inset-16 border-4 border-secondary-500/30 rounded-full" />
                    <div className="bg-primary-500 rounded-2xl p-6 shadow-lg">
                      <ShieldCheck size={48} className="text-white" />
                    </div>
                  </motion.div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-light-300/50 dark:bg-dark-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-300 dark:text-light-100">
              Why Choose AethaurVault
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: 'Zero-Knowledge Architecture',
                description: 'Your encryption keys never leave your device, ensuring complete privacy.'
              },
              {
                icon: Globe,
                title: 'Global Accessibility',
                description: 'Access your secure vault from anywhere in the world, anytime.'
              },
              {
                icon: Shield,
                title: 'Future-Proof Security',
                description: 'Built with quantum-resistant encryption algorithms.'
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                variant="neumorphic"
                className="p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-dark-300 dark:text-light-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-100 dark:text-light-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-300 dark:text-light-100">
              Our Team
            </h2>
            <p className="text-dark-100 dark:text-light-300 mt-4">
              Led by experts in cryptography, Holochain, and security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'suneetha',
                role: 'Chief Cryptographer',
                image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                name: 'akash',
                role: 'Head of Security',
                image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                name: 'uma sri',
                role: 'Holochain Architect',
                image: 'https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              }
            ].map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100">
                  {member.name}
                </h3>
                <p className="text-dark-100 dark:text-light-300">
                  {member.role}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-dark-300 dark:text-light-100 mb-6">
              Ready to Secure Your Digital Future?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="primary"
                size="lg"
                icon={<Lock size={20} />}
                onClick={() => navigate('/upload')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                size="lg"
                icon={<MessageCircle size={20} />}
                 onClick={() => navigate('/about')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Chat Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6"
      >
        <Button
          variant="primary"
          className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </Button>
      </motion.div>
    </div>
  );
};