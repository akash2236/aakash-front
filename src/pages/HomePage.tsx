import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileLock, Key, Upload, CheckCircle, Download, Trash2, Eye, Share2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { GlassPanel } from '../components/common/GlassPanel';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/Authcontext';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../components/common/Progress';
import { Tooltip } from '../components/common/Tooltip';
import { Modal } from '../components/common/Modal';
import { formatDistanceToNow } from 'date-fns';

interface User {
  name: string;
  email: string;
  id: string;
  profileImage?: string;
  createdAt: string;
}

interface FileItem {
  _id: string;
  originalName: string;
  filename: string;
  size: number;
  uploadDate: string;
  encrypted: boolean;
}

interface StorageUsage {
  used: number;
  total: number;
}

export const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [storageUsage, setStorageUsage] = useState<StorageUsage>({ used: 0, total: 1073741824 }); // 1GB default
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareLoading, setShareLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get('http://localhost:3001/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  };

  // Fetch user files
  const fetchUserFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get('http://localhost:3001/api/files/list', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFiles(response.data.files);
      return response.data.files;
    } catch (error: any) {
      console.error('Failed to fetch files:', error);
      throw error;
    }
  };

  // Fetch storage usage
  const fetchStorageUsage = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      // In a real app, this would come from your backend
      const files = await fetchUserFiles();
      const used = files.reduce((sum: number, file: FileItem) => sum + file.size, 0);
      setStorageUsage({ used, total: 1073741824 }); // 1GB storage limit
    } catch (error) {
      console.error('Failed to fetch storage usage:', error);
    }
  };

  // Load data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await Promise.all([fetchUserProfile(), fetchUserFiles(), fetchStorageUsage()]);
      } catch (error: any) {
        if (error.response?.status === 401) {
          logout();
          showToast('Session expired. Please login again.', 'error');
        } else {
          showToast('Failed to load data', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, logout]);

  // Show toast message
  const showToast = (message: string, type: string = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check storage limit
    if (storageUsage.used + file.size > storageUsage.total) {
      showToast('Storage limit exceeded. Please upgrade your plan.', 'error');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/api/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress);
            }
          }
        }
      );

      setFiles([...files, response.data.file]);
      setStorageUsage(prev => ({ ...prev, used: prev.used + file.size }));
      showToast('File uploaded and encrypted successfully');
    } catch (error: any) {
      console.error('Upload failed:', error);
      showToast(
        error.response?.data?.error || 'Failed to upload file',
        'error'
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle file download
  const handleDownload = async (fileId: string, filename: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3001/api/files/download/${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('File download started');
    } catch (error) {
      console.error('Download failed:', error);
      showToast('Failed to download file', 'error');
    }
  };

  // Handle file deletion
  const handleDelete = async (fileId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:3001/api/files/delete/${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update local state
      const deletedFile = files.find(f => f._id === fileId);
      if (deletedFile) {
        setFiles(files.filter(f => f._id !== fileId));
        setStorageUsage(prev => ({ ...prev, used: prev.used - deletedFile.size }));
      }
      
      showToast('File deleted successfully');
      setShowFileModal(false);
    } catch (error) {
      console.error('Deletion failed:', error);
      showToast('Failed to delete file', 'error');
    }
  };

  // Handle file sharing
  const handleShare = async () => {
    if (!selectedFile || !shareEmail) return;

    try {
      setShareLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/files/share',
        {
          fileId: selectedFile._id,
          recipientEmail: shareEmail
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      showToast(`File shared successfully with ${shareEmail}`);
      setShowShareModal(false);
      setShareEmail('');
    } catch (error: any) {
      console.error('Sharing failed:', error);
      showToast(
        error.response?.data?.error || 'Failed to share file',
        'error'
      );
    } finally {
      setShareLoading(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Calculate storage percentage
  const storagePercentage = Math.min(Math.round((storageUsage.used / storageUsage.total) * 100), 100);

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const event = {
        target: {
          files: [file]
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(event);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-light-100 dark:bg-dark-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-dark-300 dark:text-light-100">Loading your secure vault...</p>
        </div>
      </div>
    );
  }

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
                AetherVault provides unparalleled security for your most valuable digital assets with next-generation encryption and holochain verification.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Button 
                    variant="primary"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-light-300"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Upload File
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

      {/* Dashboard Summary */}
      {isAuthenticated && user && (
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            {/* User Profile Card */}
            <div className="bg-white dark:bg-dark-200 rounded-xl shadow-md p-6 mb-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-dark-300 flex items-center justify-center overflow-hidden">
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Welcome back, {user.name}</h2>
                    <p className="text-dark-100 dark:text-light-300">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-dark-100 dark:text-light-300">
                      Storage: {formatFileSize(storageUsage.used)} / {formatFileSize(storageUsage.total)}
                    </span>
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {storagePercentage}%
                    </span>
                  </div>
                  <Progress value={storagePercentage} className="h-2" />
                </div>
              </div>
            </div>

            {/* File Upload Card */}
            <div className="bg-white dark:bg-dark-200 rounded-xl shadow-md p-6 mb-10">
              <h2 className="text-2xl font-semibold mb-4">Secure File Upload</h2>
              <p className="mb-4 text-dark-100 dark:text-light-300">
                Upload files to your encrypted vault. All files are end-to-end encrypted before storage.
              </p>
              <div 
                className="border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:border-primary-500 dark:hover:border-primary-500"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={48} className="text-primary-500 mb-4" />
                <p className="mb-4 text-dark-100 dark:text-light-300">
                  Drag & drop or click to browse files
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                  ref={fileInputRef}
                />
                <div className="w-full max-w-xs">
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <Progress value={uploadProgress} className="h-2 mb-2 w-full" />
                      <span className="text-sm text-dark-100 dark:text-light-300">
                        Uploading... {uploadProgress}%
                      </span>
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className={`cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Choose File
                    </label>
                  )}
                </div>
                <p className="mt-4 text-sm text-dark-100 dark:text-light-300">
                  Max file size: 100MB • Supported formats: Any
                </p>
              </div>
            </div>

            {/* File List */}
            <div className="bg-white dark:bg-dark-200 rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Your Encrypted Files</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => fetchUserFiles()}>
                    Refresh
                  </Button>
                  <Tooltip content="Sort by date">
                    <Button variant="outline" size="sm">
                      Newest First
                    </Button>
                  </Tooltip>
                </div>
              </div>
              
              {files.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-dark-300">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Upload Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-dark-200 divide-y divide-gray-200 dark:divide-gray-700">
                      {files.map((file) => (
                        <tr key={file._id} className="hover:bg-gray-50 dark:hover:bg-dark-300">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileLock size={20} className="text-primary-500 mr-3" />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {file.originalName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {formatDistanceToNow(new Date(file.uploadDate), { addSuffix: true })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <CheckCircle size={16} className="mr-1" />
                              {file.encrypted ? 'Encrypted' : 'Secured'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Tooltip content="View details">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedFile(file);
                                    setShowFileModal(true);
                                  }}
                                >
                                  <Eye size={16} />
                                </Button>
                              </Tooltip>
                              <Tooltip content="Download">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownload(file._id, file.originalName)}
                                >
                                  <Download size={16} />
                                </Button>
                              </Tooltip>
                              <Tooltip content="Share">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedFile(file);
                                    setShowShareModal(true);
                                  }}
                                >
                                  <Share2 size={16} />
                                </Button>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <FileLock size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No files uploaded yet. Start by uploading your first document!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
                icon: <FileLock size={32} className="text-primary-500 cursor-pointer" />,
                title: "Document Encryption",
                description: "Military-grade AES-256 encryption keeps your files secure from unauthorized access."
              },
              {
                icon: <Lock size={32} className="text-primary-500 cursor-pointer" />,
                title: "Biometric Access",
                description: "Unlock your vault with fingerprint, facial recognition, or voice authentication."
              },
              {
                icon: <Key size={32} className="text-primary-500 cursor-pointer" />,
                title: "Zero-Knowledge",
                description: "Your encryption keys never leave your device, ensuring complete privacy."
              },
              {
                icon: <Upload size={32} className="text-primary-500 cursor-pointer" />,
                title: "Secure Sharing",
                description: "Share files securely with customizable expiration and access controls."
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
                <h3 className="text-xl font-sora font-semibold text-dark-300 dark:text-light-100 mb-3">
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-light-200 dark:bg-dark-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark-300 dark:text-light-100">
                Ready to secure your digital future?
              </h2>
              <p className="mt-4 text-lg text-dark-100 dark:text-light-300">
                Join thousands of individuals and businesses who trust AetherVault for their most sensitive digital assets.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Upload Your First File
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate('/signup')}
                  >
                    Create Free Account
                  </Button>
                )}
                <Button variant="outline" size="lg" onClick={() => navigate('/pricing')}>
                  See Plans & Pricing
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* File Details Modal */}
      <Modal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        title="File Details"
      >
        {selectedFile && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 dark:bg-dark-300 p-3 rounded-lg">
                <FileLock size={32} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-dark-300 dark:text-light-100">
                  {selectedFile.originalName}
                </h3>
                <p className="text-sm text-dark-100 dark:text-light-300">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-dark-100 dark:text-light-300">Uploaded</p>
                <p className="font-medium">
                  {new Date(selectedFile.uploadDate).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-dark-100 dark:text-light-300">Status</p>
                <p className="font-medium">
                  <span className="inline-flex items-center">
                    <CheckCircle size={16} className="mr-1 text-green-500" />
                    {selectedFile.encrypted ? 'Encrypted' : 'Secured'}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => handleDownload(selectedFile._id, selectedFile.originalName)}
              >
                <Download size={16} className="mr-2" />
                Download
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDelete(selectedFile._id)}
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Share File Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share File"
      >
        {selectedFile && (
          <div className="space-y-4">
            <div>
              <label htmlFor="share-email" className="block text-sm font-medium text-dark-300 dark:text-light-100 mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                id="share-email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-300 dark:text-white"
                placeholder="Enter recipient's email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-dark-300 dark:text-light-100 mb-2">
                Sharing Options
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="expiration"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-dark-300 dark:border-gray-600"
                  />
                  <label htmlFor="expiration" className="ml-2 block text-sm text-dark-100 dark:text-light-300">
                    Set expiration date
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="password"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-dark-300 dark:border-gray-600"
                  />
                  <label htmlFor="password" className="ml-2 block text-sm text-dark-100 dark:text-light-300">
                    Password protect
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => setShowShareModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleShare}
                disabled={!shareEmail || shareLoading}
              >
                {shareLoading ? 'Sharing...' : 'Share File'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            toast.type === 'success'
              ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
              : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'
          }`}
        >
          <div className="flex items-center">
            {toast.type === 'success' ? (
              <CheckCircle className="mr-2" size={20} />
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            )}
            <p className="font-medium">{toast.message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};