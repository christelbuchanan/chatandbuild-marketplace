import React from 'react';
import { Integration } from '../types';
import { motion } from 'framer-motion';
import { Star, Settings } from 'lucide-react';
import { getLogoUrl } from '../services/logoService';

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (integrationId: string) => void;
  onManage?: (integrationId: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, onConnect, onManage }) => {
  // Get the logo URL
  const logoUrl = getLogoUrl(integration.id, integration.name);
  
  // Animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Handle connect button click
  const handleConnectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConnect(integration.id);
  };
  
  // Handle manage button click
  const handleManageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onManage) {
      onManage(integration.id);
    }
  };
  
  // Handle card click (same as connect)
  const handleCardClick = () => {
    if (integration.isInstalled && onManage) {
      onManage(integration.id);
    } else {
      onConnect(integration.id);
    }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
      variants={item}
      whileHover={{ y: -5 }}
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
            <img 
              src={logoUrl} 
              alt={`${integration.name} logo`} 
              className="h-8 w-8 object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/40?text=' + integration.name.charAt(0);
              }}
            />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < Math.floor(integration.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">({integration.reviews})</span>
              
              {integration.isPopular && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Popular
                </span>
              )}
              
              {integration.isNew && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  New
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{integration.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {integration.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
          {integration.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{integration.tags.length - 3}
            </span>
          )}
        </div>
        
        {integration.isInstalled ? (
          <div className="flex space-x-2">
            <button 
              className="btn btn-secondary btn-sm flex-1 flex items-center justify-center"
              onClick={handleManageClick}
            >
              <Settings size={16} className="mr-1" /> Manage
            </button>
            <button 
              className="btn btn-primary btn-sm flex-1"
              onClick={handleConnectClick}
            >
              Configure
            </button>
          </div>
        ) : (
          <button 
            className="btn btn-primary btn-sm w-full"
            onClick={handleConnectClick}
          >
            Add Integration
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default IntegrationCard;
