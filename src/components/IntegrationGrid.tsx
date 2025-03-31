import React, { useEffect } from 'react';
import { Integration } from '../types';
import IntegrationCard from './IntegrationCard';
import { motion } from 'framer-motion';
import { preloadLogos } from '../services/logoService';

interface IntegrationGridProps {
  integrations: Integration[];
  onConnectIntegration: (integrationId: string) => void;
  onManageIntegration?: (integrationId: string) => void;
}

const IntegrationGrid: React.FC<IntegrationGridProps> = ({ 
  integrations, 
  onConnectIntegration,
  onManageIntegration 
}) => {
  // Preload all logos when the component mounts
  useEffect(() => {
    preloadLogos();
  }, []);

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Handler for when an integration is selected to connect
  const handleConnectIntegration = (integrationId: string) => {
    console.log(`Connecting integration: ${integrationId}`);
    onConnectIntegration(integrationId);
  };

  // Handler for when an integration is selected to manage
  const handleManageIntegration = (integrationId: string) => {
    if (onManageIntegration) {
      console.log(`Managing integration: ${integrationId}`);
      onManageIntegration(integrationId);
    }
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {integrations.length > 0 ? (
            integrations.map((integration) => (
              <IntegrationCard 
                key={integration.id} 
                integration={integration} 
                onConnect={handleConnectIntegration}
                onManage={onManageIntegration ? handleManageIntegration : undefined}
              />
            ))
          ) : (
            <motion.div 
              className="col-span-full py-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-900">No integrations found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default IntegrationGrid;
