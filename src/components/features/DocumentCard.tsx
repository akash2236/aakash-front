import { useState } from 'react';
import { File, Lock, Eye, Download, Star, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { SecureBadge } from '../common/SecureBadge';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

interface DocumentCardProps {
  id: string;
  title: string;
  type: string;
  securityLevel: 'low' | 'medium' | 'high';
  date: string;
  size: string;
  favorite?: boolean;
  thumbnailUrl?: string;
  className?: string;
}

export const DocumentCard = ({
  id,
  title,
  type,
  securityLevel,
  date,
  size,
  favorite = false,
  thumbnailUrl,
  className,
}: DocumentCardProps) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isHovered, setIsHovered] = useState(false);
  
  const getIconForFileType = () => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <File size={28} className="text-primary-500" />;
      default:
        return <File size={28} className="text-primary-500" />;
    }
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <motion.div
      className={cn(
        "relative bg-white dark:bg-dark-200 rounded-xl shadow-md overflow-hidden transition-all duration-300",
        isHovered ? "shadow-lg transform -translate-y-1" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {thumbnailUrl ? (
              <div className="w-10 h-10 rounded bg-light-300 dark:bg-dark-100 overflow-hidden">
                <img 
                  src={thumbnailUrl} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded flex items-center justify-center bg-primary-500/10 dark:bg-primary-500/20">
                {getIconForFileType()}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-dark-300 dark:text-light-100 truncate">{title}</h3>
              <p className="text-xs text-dark-100 dark:text-light-300 mt-0.5">
                {type.toUpperCase()} • {size} • {date}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <motion.button
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full",
                isFavorite ? "text-yellow-500" : "text-dark-100 dark:text-light-300"
              )}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
            >
              <Star
                size={18}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </motion.button>
            <motion.button
              className="flex items-center justify-center w-8 h-8 rounded-full text-dark-100 dark:text-light-300"
              whileTap={{ scale: 0.9 }}
            >
              <MoreVertical size={18} />
            </motion.button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <SecureBadge level={securityLevel} size="sm" pulse={securityLevel === 'high'} />
          
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm"
              className="p-1.5"
              aria-label="View document"
            >
              <Eye size={18} />
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className="p-1.5"
              aria-label="Download document"
            >
              <Download size={18} />
            </Button>
          </div>
        </div>
        
        {/* Hover state only visible on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-primary-500/5 dark:bg-primary-500/10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 flex flex-col items-center space-y-3">
              <Button 
                variant="primary"
                size="sm"
                icon={<Eye size={16} />}
              >
                View
              </Button>
              <Button 
                variant="outline"
                size="sm"
                icon={<Download size={16} />}
              >
                Download
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};