import React from 'react';
import { Integration } from '../types';
import { motion } from 'framer-motion';
import { getLogoUrl } from '../services/logoService';

interface FeaturedSectionProps {
  integrations: Integration[];
  onConnectIntegration: (integrationId: string) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ integrations, onConnectIntegration }) => {
  // Only show up to 5 featured integrations
  const featuredIntegrations = integrations.slice(0, 5);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Handle connect button click
  const handleConnectClick = (integrationId: string) => {
    console.log(`Featured connect clicked for: ${integrationId}`);
    onConnectIntegration(integrationId);
  };
  
  return (
    <div className="bg-white py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Integrations</h2>
          <p className="text-gray-600 mt-2">Connect with these popular tools to enhance your workflow</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {featuredIntegrations.map((integration) => {
            // Get the logo URL
            const logoUrl = getLogoUrl(integration.id, integration.name);
            
            return (
              <motion.div 
                key={integration.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <img 
                    src={logoUrl} 
                    alt={`${integration.name} logo`} 
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://via.placeholder.com/40?text=' + integration.name.charAt(0);
                    }}
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{integration.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{integration.description}</p>
                
                {integration.isInstalled ? (
                  <button className="btn btn-secondary btn-sm w-full">
                    Installed
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary btn-sm w-full"
                    onClick={() => handleConnectClick(integration.id)}
                  >
                    Add Integration
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedSection;
