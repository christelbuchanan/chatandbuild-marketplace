import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Integration } from '../types';
import * as LucideIcons from 'lucide-react';

interface IntegrationSuccessProps {
  integration: Integration;
  onClose: () => void;
}

const IntegrationSuccess: React.FC<IntegrationSuccessProps> = ({ integration, onClose }) => {
  const IconComponent = (LucideIcons as any)[integration.icon.charAt(0).toUpperCase() + integration.icon.slice(1)];
  
  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                {IconComponent && <IconComponent size={20} className="text-gray-700" />}
              </div>
              <div className="ml-2 text-xl font-semibold text-gray-900">{integration.name}</div>
            </div>
            
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Successfully Connected!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Your {integration.name} account has been successfully connected to ChatAndBuild.
              You can now use all the features of this integration.
            </p>
            
            <button
              onClick={onClose}
              className="btn btn-primary w-full"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSuccess;
