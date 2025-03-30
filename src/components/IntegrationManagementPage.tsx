import React, { useState } from 'react';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { Integration } from '../types';
import { integrations } from '../data/integrations';
import ProjectIntegrationManager from './ProjectIntegrationManager';
import * as LucideIcons from 'lucide-react';

interface IntegrationManagementPageProps {
  installedIntegrations: string[];
  onBack: () => void;
}

const IntegrationManagementPage: React.FC<IntegrationManagementPageProps> = ({ 
  installedIntegrations, 
  onBack 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  
  // Filter installed integrations
  const installedIntegrationsData = integrations
    .filter(integration => installedIntegrations.includes(integration.id))
    .map(integration => ({
      ...integration,
      isInstalled: true
    }));
  
  // Filter available integrations (not installed)
  const availableIntegrations = integrations
    .filter(integration => !installedIntegrations.includes(integration.id))
    .map(integration => ({
      ...integration,
      isInstalled: false
    }));
  
  // Filter by search query
  const filteredInstalledIntegrations = installedIntegrationsData.filter(
    integration => integration.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAvailableIntegrations = availableIntegrations.filter(
    integration => integration.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
  };

  const handleBackToList = () => {
    setSelectedIntegration(null);
  };

  if (selectedIntegration) {
    return <ProjectIntegrationManager integration={selectedIntegration} onBack={handleBackToList} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto my-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">Project Integrations</h2>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      {filteredInstalledIntegrations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Connected Integrations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInstalledIntegrations.map((integration) => {
              const IconComponent = (LucideIcons as any)[integration.icon.charAt(0).toUpperCase() + integration.icon.slice(1)];
              
              return (
                <div 
                  key={integration.id}
                  onClick={() => handleSelectIntegration(integration)}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                      {IconComponent && <IconComponent size={20} className="text-gray-700" />}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-500">Connected</p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {filteredAvailableIntegrations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Available Integrations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAvailableIntegrations.slice(0, 4).map((integration) => {
              const IconComponent = (LucideIcons as any)[integration.icon.charAt(0).toUpperCase() + integration.icon.slice(1)];
              
              return (
                <div 
                  key={integration.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow flex items-center"
                >
                  <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                    {IconComponent && <IconComponent size={20} className="text-gray-700" />}
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-500">Not connected</p>
                  </div>
                  <button className="btn btn-sm btn-secondary flex items-center">
                    <Plus size={14} className="mr-1" /> Connect
                  </button>
                </div>
              );
            })}
          </div>
          
          {filteredAvailableIntegrations.length > 4 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => window.location.href = '/marketplace'}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View more in marketplace
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IntegrationManagementPage;
