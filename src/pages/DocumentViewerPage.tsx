import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Share, 
  Star, 
  Tag, 
  Clock, 
  QrCode, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { GlassPanel } from '../components/common/GlassPanel';
import { Card } from '../components/common/Card';
import { SecureBadge } from '../components/common/SecureBadge';

export const DocumentViewerPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Mock document data
  const documentData = {
    title: 'Financial Report 2025',
    type: 'PDF',
    dateCreated: 'June 5, 2025',
    dateModified: 'June 6, 2025',
    size: '4.2 MB',
    securityLevel: 'high',
    holochainVerified: true,
    signatures: 2,
    version: '1.3',
    trustScore: 98,
  };

  // Mock suggested tags
  const suggestedTags = ['Financial', 'Quarterly', 'Report', 'Confidential', 'March 2025'];

  return (
    <div className="min-h-screen bg-light-200 dark:bg-dark-300 pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Document Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                aria-label="Back"
                className="mr-2"
              >
                <ChevronLeft size={20} />
              </Button>
              <h1 className="text-2xl md:text-3xl font-sora font-bold text-dark-300 dark:text-light-100">
                {documentData.title}
              </h1>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleFavorite}
                className="ml-3 text-dark-100 dark:text-light-300"
              >
                <Star 
                  size={20} 
                  fill={isFavorite ? 'currentColor' : 'none'} 
                  className={isFavorite ? 'text-yellow-500' : ''} 
                />
              </motion.button>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                icon={<Share size={16} />}
              >
                Share
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                icon={<Download size={16} />}
              >
                Download
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <SecureBadge level={documentData.securityLevel as 'low' | 'medium' | 'high'} pulse={true} />
            <div className="text-sm text-dark-100 dark:text-light-300 flex items-center">
              <Clock size={14} className="mr-1" />
              Modified {documentData.dateModified}
            </div>
            <div className="text-sm text-dark-100 dark:text-light-300 ml-4">
              Version {documentData.version}
            </div>
          </div>
        </div>
        
        {/* Document Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Document Viewer */}
          <div className="lg:col-span-3 space-y-6">
            <GlassPanel className="p-4 flex items-center justify-between border-b border-light-400 dark:border-dark-100">
              <div className="flex space-x-2">
                <Button variant="glass" size="sm">
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="glass" size="sm">
                  <ChevronRight size={16} />
                </Button>
                <div className="px-2 text-sm flex items-center text-dark-300 dark:text-light-100">
                  Page 1 of 24
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="glass" size="sm">
                  100%
                  <ChevronDown size={16} className="ml-1" />
                </Button>
              </div>
            </GlassPanel>
            
            <Card variant="glass" className="aspect-[3/4] w-full flex items-center justify-center p-0 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-white dark:bg-dark-100 p-8">
                <div className="w-full max-w-xl mx-auto text-center">
                  <div className="border-b-2 border-primary-500 pb-4 mb-6">
                    <h3 className="text-2xl font-bold text-dark-300 dark:text-dark-300 mb-2">Financial Report 2025</h3>
                    <p className="text-dark-200 dark:text-dark-200">Quarterly Analysis - Q1</p>
                  </div>
                  
                  <div className="space-y-6 text-left">
                    <p className="text-dark-300 dark:text-dark-300 font-medium">EXECUTIVE SUMMARY</p>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    
                    <p className="text-dark-300 dark:text-dark-300 font-medium mt-8">FINANCIAL HIGHLIGHTS</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <div className="h-20 bg-primary-100 rounded flex items-center justify-center text-primary-500 font-bold">+24%</div>
                        <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
                      </div>
                      <div className="col-span-1">
                        <div className="h-20 bg-secondary-100 rounded flex items-center justify-center text-secondary-500 font-bold">$1.2M</div>
                        <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
                      </div>
                      <div className="col-span-1">
                        <div className="h-20 bg-accent-100 rounded flex items-center justify-center text-accent-500 font-bold">98%</div>
                        <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
                      </div>
                    </div>
                    
                    <p className="text-dark-300 dark:text-dark-300 font-medium mt-4">QUARTERLY TRENDS</p>
                    <div className="h-40 bg-gray-100 rounded w-full flex items-center justify-center">
                      <div className="text-gray-400">Chart Visualization</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar with document details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Document Security Panel */}
            <Card variant="neumorphic" className="p-6">
              <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100 mb-4 flex items-center">
                <Shield size={18} className="mr-2 text-primary-500" />
                Security Verification
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-dark-100 dark:text-light-300">Trust Score</span>
                    <span className="text-sm font-medium text-primary-500">{documentData.trustScore}%</span>
                  </div>
                  <div className="w-full bg-light-300 dark:bg-dark-100 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${documentData.trustScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-light-300 dark:border-dark-100">
                  <span className="text-sm text-dark-300 dark:text-light-100">Holochain Verified</span>
                  {documentData.holochainVerified ? (
                    <div className="flex items-center text-success-500">
                      <Shield size={16} className="mr-1" fill="currentColor" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  ) : (
                    <span className="text-sm text-warning-500">Pending</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-light-300 dark:border-dark-100">
                  <span className="text-sm text-dark-300 dark:text-light-100">Digital Signatures</span>
                  <span className="text-sm font-medium text-dark-300 dark:text-light-100">{documentData.signatures}</span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-dark-300 dark:text-light-100">Hash Verification</span>
                  <Button variant="ghost" size="sm" className="p-1" aria-label="QR Code">
                    <QrCode size={20} className="text-secondary-500" />
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Tags Panel */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100 flex items-center">
                  <Tag size={18} className="mr-2 text-primary-500" />
                  Tags
                </h3>
                <Button variant="ghost" size="sm" className="p-1" aria-label="Add Tag">
                  <Plus size={18} />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag, index) => (
                  <div 
                    key={index}
                    className="px-3 py-1 bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 
                             rounded-full text-xs font-medium"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-light-300 dark:border-dark-100">
                <p className="text-sm font-medium text-dark-300 dark:text-light-100 mb-2">
                  Suggested Tags:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Budget', 'Annual', '2025'].map((tag, index) => (
                    <div 
                      key={index}
                      className="px-3 py-1 bg-light-300 dark:bg-dark-200 text-dark-100 dark:text-light-300 
                              rounded-full text-xs font-medium cursor-pointer hover:bg-primary-500/10 dark:hover:bg-primary-500/20 
                              hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      + {tag}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};