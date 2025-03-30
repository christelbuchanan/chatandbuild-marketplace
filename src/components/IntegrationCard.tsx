import React from 'react';
import { Integration } from '../types';
import { Star, Download, Plus } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (integrationId: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, onConnect }) => {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[integration.icon.charAt(0).toUpperCase() + integration.icon.slice(1)];
  
  const handleConnectClick = () => {
    onConnect(integration.id);
  };
  
  return (
    <div className="card flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
              {IconComponent && <IconComponent size={24} className="text-gray-700" />}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
              <p className="text-sm text-gray-500">{integration.publisher}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{integration.rating}</span>
            <span className="text-sm text-gray-500">({integration.reviews})</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 line-clamp-3">{integration.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {integration.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto border-t border-gray-200 p-4">
        {integration.isInstalled ? (
          <button className="w-full btn btn-secondary flex items-center justify-center">
            <Download size={18} className="mr-2" />
            Installed
          </button>
        ) : (
          <button 
            className="w-full btn btn-primary flex items-center justify-center"
            onClick={handleConnectClick}
          >
            <Plus size={18} className="mr-2" />
            Add Integration
          </button>
        )}
      </div>
      {(integration.isNew || integration.isPopular) && (
        <div className="absolute top-4 right-4">
          {integration.isNew && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              New
            </span>
          )}
          {integration.isPopular && !integration.isNew && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Popular
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default IntegrationCard;
