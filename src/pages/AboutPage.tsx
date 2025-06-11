import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Globe, 
  Users, 
  Lock, 
  MessageCircle, 
  Network,
  Database,
  Zap,
  Brain,
  Layers,
  GitBranch,
  Cpu,
  Shield,
  Key,
  Eye,
  Code,
  Smartphone,
  Cloud
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { GlassPanel } from '../components/common/GlassPanel';

export const AboutPage = () => {
  const features = [
    {
      icon: Network,
      title: 'Holochain Architecture',
      description: 'Distributed peer-to-peer storage with agent-centric validation',
      link: 'https://en.wikipedia.org/wiki/Holochain',
      color: 'from-primary-500 to-secondary-500'
    },
    {
      icon: Database,
      title: 'DMA Zones',
      description: 'Decentralized Memory Architecture for optimal data distribution',
      link: 'https://en.wikipedia.org/wiki/Distributed_computing',
      color: 'from-secondary-500 to-accent-500'
    },
    {
      icon: Lock,
      title: 'Quantum Encryption',
      description: 'Post-quantum cryptography ensuring future-proof security',
      link: 'https://en.wikipedia.org/wiki/Post-quantum_cryptography',
      color: 'from-accent-500 to-primary-500'
    },
    {
      icon: Brain,
      title: 'AI-Powered Validation',
      description: 'Machine learning algorithms for intelligent threat detection',
      link: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
      color: 'from-primary-500 to-secondary-500'
    },
    {
      icon: Layers,
      title: 'Multi-Layer Security',
      description: 'Redundant security layers with biometric authentication',
      link: 'https://en.wikipedia.org/wiki/Defense_in_depth_(computing)',
      color: 'from-secondary-500 to-accent-500'
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Git-like versioning for document history and collaboration',
      link: 'https://en.wikipedia.org/wiki/Version_control',
      color: 'from-accent-500 to-primary-500'
    },
    {
      icon: Cpu,
      title: 'Edge Computing',
      description: 'Local processing for enhanced privacy and performance',
      link: 'https://en.wikipedia.org/wiki/Edge_computing',
      color: 'from-primary-500 to-secondary-500'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Worldwide access through distributed node network',
      link: 'https://en.wikipedia.org/wiki/Content_delivery_network',
      color: 'from-secondary-500 to-accent-500'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Suneetha',
      role: 'Chief Technology Officer',
      specialty: 'Holochain Architecture',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Pioneer in distributed systems and holochain technology'
    },
    {
      name: 'Akash',
      role: 'Lead Cryptographer',
      specialty: 'Quantum Security',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Expert in post-quantum cryptography and zero-knowledge proofs'
    },
    {
      name: 'Uma sri',
      role: 'Head of Security',
      specialty: 'DMA Zones',
      image: 'https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Specialist in decentralized memory architecture and threat modeling'
    },
     {
      name: 'AAkash',
      role: 'Holochin Expert',
      specialty: 'Quantum Security',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Expert in post-quantum cryptography and zero-knowledge proofs'
    }
  ];

  const roadmapItems = [
    { year: '2025', title: 'Genesis Launch', description: 'Core holochain infrastructure deployment' },
    { year: '2027', title: 'AI Integration', description: 'Advanced machine learning validation systems' },
    { year: '2030', title: 'Quantum Ready', description: 'Full post-quantum cryptography implementation' },
    { year: '2035', title: 'Neural Interface', description: 'Brain-computer interface for seamless access' },
    { year: '2040', title: 'Galactic Network', description: 'Interplanetary data storage and retrieval' }
  ];

  const handleFeatureClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-300 to-primary-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(90,44,169,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(10,132,255,0.1),transparent_50%)]" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            style={{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,

            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  className="relative"
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <ShieldCheck size={48} className="text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
                </motion.div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-6">
                AetherVault
              </h1>
              <p className="text-xl md:text-2xl text-light-200 max-w-4xl mx-auto mb-8">
                The future of decentralized storage powered by holochain technology, 
                quantum encryption, and distributed memory architecture
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                  icon={<Network size={20} />}
                >
                  Explore Technology
                </Button>
                <Button 
                  variant="glass"
                  size="lg"
                  className="backdrop-blur-xl border-primary-500/30"
                  icon={<Code size={20} />}
                >
                  View Documentation
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light-100 mb-6">
              Revolutionary Technology Stack
            </h2>
            <p className="text-lg text-light-300 max-w-3xl mx-auto">
              Click on any feature to learn more about the underlying technology
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                }}
                className="cursor-pointer"
                onClick={() => handleFeatureClick(feature.link)}
              >
                <GlassPanel className="p-6 h-full backdrop-blur-xl border border-primary-500/20 hover:border-primary-500/50 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-light-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-light-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary-400 text-sm">
                    <span>Learn more</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light-100 mb-6">
              Visionary Leadership
            </h2>
            <p className="text-lg text-light-300 max-w-3xl mx-auto">
              Our team combines decades of experience in distributed systems, cryptography, and quantum computing
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <GlassPanel className="p-8 text-center backdrop-blur-xl border border-secondary-500/20 hover:border-secondary-500/50 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-gradient-to-r from-primary-500 to-secondary-500 p-1">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-light-100 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-primary-400 font-medium mb-1">
                    {member.role}
                  </div>
                  <div className="text-secondary-400 text-sm mb-4">
                    {member.specialty}
                  </div>
                  <p className="text-light-300 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light-100 mb-6">
              Journey to the Future
            </h2>
            <p className="text-lg text-light-300 max-w-3xl mx-auto">
              Our roadmap spans the next two decades, pushing the boundaries of what's possible
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 rounded-full" />
            
            <div className="space-y-16">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
               >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <GlassPanel className="p-6 backdrop-blur-xl border border-accent-500/20 hover:border-accent-500/50 transition-all duration-300">
                      <div className="text-3xl font-bold text-accent-400 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-light-100 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-light-300">
                        {item.description}
                      </p>
                    </GlassPanel>
                  </div>
                  
                  {/* Timeline node */}
                  <div className="relative z-10">
                    <motion.div
                      className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-dark-300 shadow-lg"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                  
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <GlassPanel className="p-12 backdrop-blur-xl border border-primary-500/30 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-light-100 mb-6">
                Ready to Enter the Future?
              </h2>
              <p className="text-lg text-light-300 mb-8 max-w-2xl mx-auto">
                Join the revolution in decentralized storage and experience the next generation of digital security
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                  icon={<Zap size={20} />}
                >
                  Start Your Journey
                </Button>
                <Button 
                  variant="glass"
                  size="lg"
                  className="backdrop-blur-xl border-secondary-500/30"
                  icon={<MessageCircle size={20} />}
                >
                  Contact Our Team
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      {/* Floating Chat Assistant */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="primary"
            className="rounded-full w-16 h-16 flex items-center justify-center shadow-2xl bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            aria-label="Open AI Assistant"
          >
            <Brain size={28} />
          </Button>
        </motion.div>
        
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};