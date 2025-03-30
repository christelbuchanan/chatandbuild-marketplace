import React from 'react';
import { Integration } from '../types';
import IntegrationCard from './IntegrationCard';

interface IntegrationGridProps {
  integrations: Integration[];
  onConnectIntegration: (integrationId: string) => void;
}

const IntegrationGrid: React.FC<IntegrationGridProps> = ({ integrations, onConnectIntegration }) => {
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {integrations.length > 0 ? (
            integrations.map((integration) => (
              <IntegrationCard 
                key={integration.id} 
                integration={integration} 
                onConnect={onConnectIntegration}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-lg font-medium text-gray-900">No integrations found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationGrid;
