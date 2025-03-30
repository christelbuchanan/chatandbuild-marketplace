import React, { useState } from 'react';
import { X, Shield, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { IntegrationDetails, Integration } from '../types';
import * as LucideIcons from 'lucide-react';

interface IntegrationPermissionsProps {
  integration: Integration;
  details: IntegrationDetails;
  onClose: () => void;
  onAuthorize: (integrationId: string) => void;
}

const IntegrationPermissions: React.FC<IntegrationPermissionsProps> = ({
  integration,
  details,
  onClose,
  onAuthorize
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const IconComponent = (LucideIcons as any)[integration.icon.charAt(0).toUpperCase() + integration.icon.slice(1)];

  const handleAuthorize = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onAuthorize(integration.id);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                {IconComponent && <IconComponent size={24} className="text-gray-700" />}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">Connect to {integration.name}</h2>
                <p className="text-sm text-gray-500">Published by {integration.publisher}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center text-blue-600 mb-2">
              <Shield size={20} className="mr-2" />
              <h3 className="font-semibold">Permissions Required</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {integration.name} is requesting the following permissions to integrate with your account:
            </p>
            <div className="space-y-3">
              {details.permissions.map((permission) => (
                <div key={permission.id} className="flex items-start p-3 bg-gray-50 rounded-md">
                  {permission.isRequired ? (
                    <CheckCircle size={20} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  ) : (
                    <AlertCircle size={20} className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{permission.name}</div>
                    <div className="text-sm text-gray-600">{permission.description}</div>
                    {!permission.isRequired && (
                      <div className="text-xs text-amber-600 mt-1">Optional permission</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Pricing</h3>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                details.pricingType === 'free' ? 'bg-green-100 text-green-800' :
                details.pricingType === 'freemium' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {details.pricingType === 'free' ? 'Free' :
                 details.pricingType === 'freemium' ? 'Freemium' : 'Paid'}
              </span>
              {details.pricingDetails && (
                <span className="ml-2 text-sm text-gray-600">{details.pricingDetails}</span>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-6">
            By connecting, you agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> of {integration.name}.
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleAuthorize}
              disabled={isLoading}
              className="btn btn-primary flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <ExternalLink size={18} className="mr-2" />
              )}
              {isLoading ? 'Connecting...' : `Connect to ${integration.name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPermissions;
