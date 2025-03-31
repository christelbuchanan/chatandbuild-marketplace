import React, { useState, useEffect } from 'react';
import { Integration } from '../types';
import { integrations as allIntegrations } from '../data/integrations';
import FilterBar from './FilterBar';
import IntegrationGrid from './IntegrationGrid';
import Hero from './Hero';
import FeaturedSection from './FeaturedSection';
import IntegrationPermissions from './IntegrationPermissions';
import IntegrationSuccess from './IntegrationSuccess';

const IntegrationManagementPage: React.FC = () => {
  // State for filtered integrations
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>(allIntegrations);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // State for showing only installed integrations
  const [showInstalled, setShowInstalled] = useState(false);
  
  // State for integration connection flow
  const [connectingIntegration, setConnectingIntegration] = useState<Integration | null>(null);
  const [connectionStep, setConnectionStep] = useState<'permissions' | 'success' | null>(null);
  
  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...allIntegrations];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(integration => 
        integration.name.toLowerCase().includes(query) || 
        integration.description.toLowerCase().includes(query) ||
        integration.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(integration => 
        integration.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
    }
    
    // Filter by installed status
    if (showInstalled) {
      result = result.filter(integration => integration.isInstalled);
    }
    
    setFilteredIntegrations(result);
  }, [searchQuery, selectedCategory, showInstalled]);
  
  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Handle installed filter toggle
  const handleInstalledToggle = (showInstalled: boolean) => {
    setShowInstalled(showInstalled);
  };
  
  // Handle integration connection
  const handleConnectIntegration = (integrationId: string) => {
    console.log(`Starting connection flow for: ${integrationId}`);
    const integration = allIntegrations.find(i => i.id === integrationId);
    if (integration) {
      setConnectingIntegration(integration);
      setConnectionStep('permissions');
    } else {
      console.error(`Integration with ID ${integrationId} not found`);
    }
  };
  
  // Handle permissions approval
  const handleApprovePermissions = () => {
    // In a real app, this would make an API call to connect the integration
    console.log(`Approving permissions for: ${connectingIntegration?.name}`);
    setConnectionStep('success');
  };
  
  // Handle connection completion
  const handleCompleteConnection = () => {
    // Update the integration as installed
    if (connectingIntegration) {
      // In a real app, this would be handled by a state management solution
      // For this demo, we're directly modifying the array
      allIntegrations.forEach((integration, index) => {
        if (integration.id === connectingIntegration.id) {
          allIntegrations[index] = { ...integration, isInstalled: true };
        }
      });
      
      // Refresh filtered integrations
      setFilteredIntegrations(prevFiltered => 
        prevFiltered.map(integration => 
          integration.id === connectingIntegration.id 
            ? { ...integration, isInstalled: true } 
            : integration
        )
      );
      
      // Reset connection flow
      setConnectingIntegration(null);
      setConnectionStep(null);
    }
  };
  
  // Handle cancellation
  const handleCancelConnection = () => {
    setConnectingIntegration(null);
    setConnectionStep(null);
  };
  
  // Get featured integrations (popular ones)
  const featuredIntegrations = allIntegrations.filter(integration => integration.isPopular);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {connectionStep === 'permissions' && connectingIntegration && (
        <IntegrationPermissions 
          integration={connectingIntegration}
          onApprove={handleApprovePermissions}
          onCancel={handleCancelConnection}
        />
      )}
      
      {connectionStep === 'success' && connectingIntegration && (
        <IntegrationSuccess 
          integration={connectingIntegration}
          onComplete={handleCompleteConnection}
        />
      )}
      
      {!connectionStep && (
        <>
          <Hero />
          <FeaturedSection integrations={featuredIntegrations} onConnectIntegration={handleConnectIntegration} />
          <FilterBar 
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onInstalledToggle={handleInstalledToggle}
            selectedCategory={selectedCategory}
            showInstalled={showInstalled}
          />
          <IntegrationGrid 
            integrations={filteredIntegrations} 
            onConnectIntegration={handleConnectIntegration} 
          />
        </>
      )}
    </div>
  );
};

export default IntegrationManagementPage;
