import React from 'react';
import { Integration, Permission } from '../types';
import { motion } from 'framer-motion';
import { X, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { getLogoUrl } from '../services/logoService';
import { integrationDetails } from '../data/integrationDetails';

interface IntegrationPermissionsProps {
  integration: Integration;
  onApprove: () => void;
  onCancel: () => void;
}

const IntegrationPermissions: React.FC<IntegrationPermissionsProps> = ({ 
  integration, 
  onApprove, 
  onCancel 
}) => {
  // Safety check - if integration is undefined, don't render
  if (!integration) {
    console.error("Integration is undefined in IntegrationPermissions");
    return null;
  }

  // Get details for this integration
  const details = integration.id && integrationDetails[integration.id] 
    ? integrationDetails[integration.id] 
    : {
        permissions: [],
        features: [],
        pricingType: 'free' as const
      };
  
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
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center">
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
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">Connect {integration.name}</h2>
              <p className="text-sm text-gray-500">Review and approve permissions</p>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Shield size={20} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Permissions Required</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {integration.name} is requesting the following permissions:
            </p>
            
            <div className="space-y-3">
              {details.permissions.map((permission, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                  {permission.isRequired ? (
                    <AlertTriangle size={18} className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  ) : (
                    <CheckCircle size={18} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                    <p className="text-xs text-gray-500">{permission.description}</p>
                    {permission.isRequired && (
                      <p className="text-xs text-amber-600 mt-1">Required for basic functionality</p>
                    )}
                  </div>
                </div>
              ))}
              
              {details.permissions.length === 0 && (
                <div className="text-sm text-gray-500 italic">
                  No specific permissions required
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Features</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
              
              {details.features.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No specific features listed
                </p>
              )}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Pricing</h3>
            <div className="text-sm">
              {details.pricingType === 'free' && (
                <span className="text-green-600 font-medium">Free</span>
              )}
              
              {details.pricingType === 'freemium' && (
                <div>
                  <span className="text-blue-600 font-medium">Freemium</span>
                  <p className="text-gray-600 mt-1">{details.pricingDetails || 'Free plan available with premium options'}</p>
                </div>
              )}
              
              {details.pricingType === 'paid' && (
                <div>
                  <span className="text-purple-600 font-medium">Paid</span>
                  <p className="text-gray-600 mt-1">{details.pricingDetails || 'Paid subscription required'}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t pt-4 flex flex-col sm:flex-row-reverse gap-3">
            <motion.button 
              className="btn btn-primary"
              onClick={onApprove}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Approve & Connect
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntegrationPermissions;
