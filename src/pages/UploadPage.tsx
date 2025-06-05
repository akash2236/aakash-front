import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Shield, File, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { GlassPanel } from '../components/common/GlassPanel';

export const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [encryptOnUpload, setEncryptOnUpload] = useState(true);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <div className="min-h-screen bg-light-200 dark:bg-dark-300 pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-dark-300 dark:text-light-100">
            Upload Files
          </h1>
          <p className="text-dark-100 dark:text-light-300 mt-1">
            Securely upload and encrypt your documents
          </p>
        </div>

        {/* Upload Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassPanel 
              className={`p-8 transition-all duration-300 ${
                isDragging ? 'border-primary-500 bg-primary-500/5' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center"
                  animate={{ 
                    scale: isDragging ? 1.1 : 1,
                    rotate: isDragging ? 180 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Upload className="w-8 h-8 text-primary-500" />
                </motion.div>
                <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100 mb-2">
                  Drag and drop files here
                </h3>
                <p className="text-dark-100 dark:text-light-300 mb-4">
                  or click to select files from your computer
                </p>
                <Button variant="outline">
                  Choose Files
                </Button>
              </div>
            </GlassPanel>

            {/* Recent Uploads */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100 mb-4">
                Recent Uploads
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Financial Report.pdf', status: 'complete', size: '2.4 MB' },
                  { name: 'Contract Draft.docx', status: 'encrypting', size: '1.8 MB' },
                  { name: 'Meeting Notes.txt', status: 'error', size: '156 KB' }
                ].map((file, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                          <File className="w-5 h-5 text-primary-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-dark-300 dark:text-light-100">
                            {file.name}
                          </p>
                          <p className="text-xs text-dark-100 dark:text-light-300">
                            {file.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {file.status === 'complete' && (
                          <Check className="w-5 h-5 text-success-500" />
                        )}
                        {file.status === 'encrypting' && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Shield className="w-5 h-5 text-primary-500" />
                          </motion.div>
                        )}
                        {file.status === 'error' && (
                          <AlertCircle className="w-5 h-5 text-error-500" />
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="ml-2 p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Upload Settings */}
          <div className="lg:col-span-1">
            <Card variant="neumorphic" className="p-6">
              <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100 mb-4">
                Upload Settings
              </h3>
              
              <div className="space-y-6">
                {/* Encryption Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-primary-500 mr-2" />
                    <span className="text-sm text-dark-300 dark:text-light-100">
                      Encrypt on Upload
                    </span>
                  </div>
                  <motion.button
                    className={`w-12 h-6 ${
                      encryptOnUpload ? 'bg-primary-500' : 'bg-dark-100'
                    } rounded-full relative`}
                    onClick={() => setEncryptOnUpload(!encryptOnUpload)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                     className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"
                     animate={{ x: encryptOnUpload ? 19 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                {/* Upload Limits */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark-100 dark:text-light-300">Storage Used</span>
                    <span className="text-dark-300 dark:text-light-100">2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full h-2 bg-light-300 dark:bg-dark-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: '24%' }}
                    />
                  </div>
                </div>

                {/* Upload Guidelines */}
                <div className="bg-light-300/50 dark:bg-dark-200/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-dark-300 dark:text-light-100 mb-2">
                    Upload Guidelines
                  </h4>
                  <ul className="text-xs text-dark-100 dark:text-light-300 space-y-2">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      Maximum file size: 500 MB
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      Supported formats: PDF, DOC, DOCX, TXT
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      End-to-end encryption available
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};