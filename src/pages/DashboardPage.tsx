import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  FolderPlus, 
  Filter, 
  Eye, 
  Clock, 
  ShieldCheck, 
  Folder 
} from 'lucide-react';
import { DocumentCard } from '../components/features/DocumentCard';
import { Button } from '../components/common/Button';
import { GlassPanel } from '../components/common/GlassPanel';
import { Card } from '../components/common/Card';

// Mock data for demonstration
const mockDocuments = [
  { id: '1', title: 'Financial Report 2025', type: 'pdf', securityLevel: 'high', date: 'Yesterday', size: '4.2 MB', favorite: true },
  { id: '2', title: 'Contract Agreement', type: 'docx', securityLevel: 'high', date: '3 days ago', size: '1.8 MB',favorite: false },
  { id: '3', title: 'Product Roadmap', type: 'ppt', securityLevel: 'medium', date: 'Last week', size: '8.5 MB',favorite: false },
  { id: '4', title: 'User Research Data', type: 'xlsx', securityLevel: 'high', date: '2 weeks ago', size: '3.1 MB', favorite: true },
  { id: '5', title: 'Marketing Strategy', type: 'pdf', securityLevel: 'medium', date: 'Mar 15, 2025', size: '2.7 MB',favorite: false },
  { id: '6', title: 'Technical Documentation', type: 'md', securityLevel: 'low', date: 'Mar 10, 2025', size: '1.2 MB',favorite: false },
] as const;

const mockFolders = [
  { id: '1', name: 'Financial Documents', count: 23, securityLevel: 'high' },
  { id: '2', name: 'Contracts', count: 15, securityLevel: 'high' },
  { id: '3', name: 'Projects', count: 8, securityLevel: 'medium' },
  { id: '4', name: 'Personal', count: 12, securityLevel: 'high' },
] as const;

export const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-light-200 dark:bg-dark-300 pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-sora font-bold text-dark-300 dark:text-light-100">
                Your Vault
              </h1>
              <p className="text-dark-100 dark:text-light-300 mt-1">
                Manage and access your secure documents
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                icon={<FolderPlus size={18} />}
              >
                New Folder
              </Button>
              <Button 
                variant="primary"
                icon={<Plus size={18} />}
              >
                Upload File
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <GlassPanel className="p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-dark-100 dark:text-light-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-0 rounded-lg bg-light-100 dark:bg-dark-200 
                             focus:ring-2 focus:ring-primary-500 text-dark-300 dark:text-light-100 placeholder-dark-100 dark:placeholder-light-300"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="glass" 
                  size="sm" 
                  icon={<Filter size={16} />}
                  className="whitespace-nowrap"
                >
                  Filter
                </Button>
                <Button 
                  variant="glass" 
                  size="sm"
                  icon={<Clock size={16} />}
                  className="whitespace-nowrap"
                >
                  Recent
                </Button>
                <Button 
                  variant="glass" 
                  size="sm"
                  icon={<Eye size={16} />}
                  className="whitespace-nowrap"
                >
                  View: Grid
                </Button>
              </div>
            </div>
          </GlassPanel>
        </div>
        
        {/* Folders Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-dark-300 dark:text-light-100 mb-4">
            Your Folders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFolders.map((folder, index) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  variant="neumorphic" 
                  hover
                  className="flex items-center p-5 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                      <Folder size={24} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-300 dark:text-light-100">{folder.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-dark-100 dark:text-light-300 mr-2">
                          {folder.count} files
                        </span>
                        {folder.securityLevel === 'high' && (
                          <ShieldCheck size={14} className="text-primary-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Recent Documents Section */}
        <div>
          <h2 className="text-xl font-semibold text-dark-300 dark:text-light-100 mb-4">
            Recent Documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDocuments.map((doc, index) => (
              <DocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                type={doc.type}
                securityLevel={doc.securityLevel as 'low' | 'medium' | 'high'}
                date={doc.date}
                size={doc.size}
                favorite={doc.favorite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};