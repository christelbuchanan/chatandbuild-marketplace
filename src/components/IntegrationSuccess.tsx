import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
import { Integration } from '../types';
import { getLogoUrl } from '../services/logoService';

interface IntegrationSuccessProps {
  integration: Integration;
  onComplete: () => void;
}

const IntegrationSuccess: React.FC<IntegrationSuccessProps> = ({ 
  integration, 
  onComplete 
}) => {
  // Get the logo URL
  const logoUrl = getLogoUrl(integration.id, integration.name);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="p-6">
          <div className="flex justify-end">
            <button 
              onClick={onComplete}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col items-center text-center mb-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Successfully Connected!
            </h2>
            
            <p className="text-gray-600">
              You have successfully connected {integration.name} to your account.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center">
            <div className="h-12 w-12 bg-white rounded-md flex items-center justify-center overflow-hidden">
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
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">{integration.name}</h3>
              <p className="text-sm text-gray-500">Integration is now active</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button 
              className="btn btn-primary w-full flex items-center justify-center"
              onClick={onComplete}
            >
              Continue to Marketplace <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntegrationSuccess;
