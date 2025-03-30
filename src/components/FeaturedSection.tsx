import React from 'react';
import { Integration } from '../types';
import IntegrationCard from './IntegrationCard';

interface FeaturedSectionProps {
  title: string;
  description: string;
  integrations: Integration[];
  onConnectIntegration: (integrationId: string) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ 
  title, 
  description, 
  integrations,
  onConnectIntegration
}) => {
  return (
    <div className="py-8 bg-white">
      <div className="container-custom">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-gray-600">{description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((integration) => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
              onConnect={onConnectIntegration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
