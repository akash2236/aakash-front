import { motion } from 'framer-motion';
import { Upload, Shield, File, X, Check, AlertCircle, Trash2, Eye, Download, Share2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { GlassPanel } from '../components/common/GlassPanel';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/Authcontext';
import { formatDistanceToNow } from 'date-fns';
import { Progress } from '../components/common/Progress';

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

export const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [encryptOnUpload, setEncryptOnUpload] = useState(true);
  const [files, setFiles] = useState<FileItem[]>([]);
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
  const { isAuthenticated } = useAuth();

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
    }
  };

  // Fetch storage usage
  const fetchStorageUsage = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const files = await fetchUserFiles();
      const used = files.reduce((sum: number, file: FileItem) => sum + file.size, 0);
      setStorageUsage({ used, total: 1073741824 }); // 1GB limit
    } catch (error) {
      console.error('Failed to fetch storage usage:', error);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Handle file upload
 const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (storageUsage.used + file.size > storageUsage.total) {
    showToast('Storage limit exceeded. Please upgrade your plan.', 'error');
    return;
  }

  setUploading(true);
  setUploadProgress(0);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('encrypt', encryptOnUpload.toString()); // Add encryption preference

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
    showToast(
      encryptOnUpload 
        ? 'File uploaded and encrypted successfully' 
        : 'File uploaded successfully',
      'success'
    );
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

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
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
      showToast('File download started', 'success');
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
      const deletedFile = files.find(f => f._id === fileId);
      if (deletedFile) {
        setFiles(files.filter(f => f._id !== fileId));
        setStorageUsage(prev => ({ ...prev, used: prev.used - deletedFile.size }));
      }
      showToast('File deleted successfully', 'success');
      setShowFileModal(false);
    } catch (error) {
      console.error('Deletion failed:', error);
      showToast('Failed to delete file', 'error');
    }
  };

  // Handle share file
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
      showToast(`File shared successfully with ${shareEmail}`, 'success');
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

  // Show toast message
  const showToast = (message: string, type: string = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // Load data on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchStorageUsage();
    }
  }, [isAuthenticated]);

  const storagePercentage = Math.min(Math.round((storageUsage.used / storageUsage.total) * 100), 100);

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
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                  ref={fileInputRef}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Choose File
                </label>
                {uploading && (
                  <div className="mt-4 w-full max-w-xs mx-auto">
                    <div className="flex flex-col items-center">
                      <Progress value={uploadProgress} className="h-2 mb-2 w-full" />
                      <span className="text-sm text-dark-100 dark:text-light-300">
                        Uploading... {uploadProgress}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </GlassPanel>

            {/* Recent Uploads */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100 mb-4">
                Your Encrypted Files
              </h3>
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
                              <File size={20} className="text-primary-500 mr-3" />
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
                              <Check size={16} className="mr-1" />
                              {file.encrypted ? 'Encrypted' : 'Secured'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedFile(file);
                                  setShowFileModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleDownload(file._id, file.originalName)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <Download size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedFile(file);
                                  setShowShareModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <Share2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(file._id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <File size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No files uploaded yet. Start by uploading your first document!
                  </p>
                </div>
              )}
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
                    <span className="text-dark-300 dark:text-light-100">
                      {formatFileSize(storageUsage.used)} / {formatFileSize(storageUsage.total)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-light-300 dark:bg-dark-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${storagePercentage}%` }}
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
                      Maximum file size: 1 GB
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      Supported formats: Any
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

        {/* File Details Modal */}
        {showFileModal && selectedFile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-dark-200 rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100">File Details</h3>
                <button onClick={() => setShowFileModal(false)}>
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 dark:bg-dark-300 p-3 rounded-lg">
                    <File size={32} className="text-primary-600 dark:text-primary-400" />
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
                        <Check size={16} className="mr-1 text-green-500" />
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
            </div>
          </div>
        )}

        {/* Share File Modal */}
        {showShareModal && selectedFile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-dark-200 rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-dark-300 dark:text-light-100">Share File</h3>
                <button onClick={() => setShowShareModal(false)}>
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
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
                  <h4 className="text-sm font-medium text-dark-100 dark:text-light-100 mb-2">
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
            </div>
          </div>
        )}

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
                <Check size={20} className="mr-2" />
              ) : (
                <AlertCircle size={20} className="mr-2" />
              )}
              <p className="font-medium">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};