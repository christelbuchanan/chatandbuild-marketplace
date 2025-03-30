import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import FilterBar from './components/FilterBar';
import IntegrationGrid from './components/IntegrationGrid';
import Footer from './components/Footer';
import IntegrationPermissions from './components/IntegrationPermissions';
import IntegrationSuccess from './components/IntegrationSuccess';
import IntegrationManagementPage from './components/IntegrationManagementPage';
import { integrations, categories } from './data/integrations';
import { integrationDetails } from './data/integrationDetails';
import { Integration } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>(integrations);
  const [categoryName, setCategoryName] = useState('All Categories');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [installedIntegrations, setInstalledIntegrations] = useState<string[]>(
    integrations.filter(i => i.isInstalled).map(i => i.id)
  );
  const [showIntegrationManagement, setShowIntegrationManagement] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleConnectIntegration = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (integration && !installedIntegrations.includes(integrationId)) {
      setSelectedIntegration(integration);
      setShowPermissions(true);
    }
  };

  const handleClosePermissions = () => {
    setShowPermissions(false);
  };

  const handleAuthorize = (integrationId: string) => {
    setShowPermissions(false);
    setShowSuccess(true);
    setInstalledIntegrations(prev => [...prev, integrationId]);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedIntegration(null);
  };

  const handleManageIntegrations = () => {
    setShowIntegrationManagement(true);
  };

  const handleBackToMarketplace = () => {
    setShowIntegrationManagement(false);
  };

  useEffect(() => {
    let filtered: Integration[] = [];
    
    // Update the installed status based on our state
    const updatedIntegrations = integrations.map(integration => ({
      ...integration,
      isInstalled: installedIntegrations.includes(integration.id)
    }));
    
    // Filter by category
    if (selectedCategory === 'all') {
      filtered = [...updatedIntegrations];
      setCategoryName('All Categories');
    } else if (selectedCategory === 'popular') {
      filtered = updatedIntegrations.filter(integration => integration.isPopular);
      setCategoryName('Popular Integrations');
    } else if (selectedCategory === 'new') {
      filtered = updatedIntegrations.filter(integration => integration.isNew);
      setCategoryName('New Integrations');
    } else if (selectedCategory === 'installed') {
      filtered = updatedIntegrations.filter(integration => integration.isInstalled);
      setCategoryName('Installed Integrations');
    } else {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        filtered = updatedIntegrations.filter(integration => 
          integration.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
        );
        setCategoryName(category.name);
      }
    }
    
    // Sort the filtered integrations
    if (sortOption === 'popular') {
      filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.reviews - a.reviews);
    } else if (sortOption === 'newest') {
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortOption === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredIntegrations(filtered);
  }, [selectedCategory, sortOption, installedIntegrations]);

  // Get updated popular and new integrations with current installed status
  const getUpdatedIntegrations = (filterFn: (i: Integration) => boolean) => {
    return integrations
      .map(integration => ({
        ...integration,
        isInstalled: installedIntegrations.includes(integration.id)
      }))
      .filter(filterFn)
      .slice(0, 4);
  };

  const popularIntegrations = getUpdatedIntegrations(i => i.isPopular);
  const newIntegrations = getUpdatedIntegrations(i => i.isNew);

  if (showIntegrationManagement) {
    return (
      <div className="min-h-screen bg-gray-50 font-nunito">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen} 
          onManageIntegrations={handleManageIntegrations}
        />
        <IntegrationManagementPage 
          installedIntegrations={installedIntegrations} 
          onBack={handleBackToMarketplace} 
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-nunito">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
        onManageIntegrations={handleManageIntegrations}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        <main className="flex-1">
          <Hero />
          
          <FeaturedSection 
            title="Popular Integrations" 
            description="Most used integrations by ChatAndBuild users"
            integrations={popularIntegrations}
            onConnectIntegration={handleConnectIntegration}
          />
          
          <FeaturedSection 
            title="New Additions" 
            description="Recently added integrations to our marketplace"
            integrations={newIntegrations}
            onConnectIntegration={handleConnectIntegration}
          />
          
          <div className="mt-8">
            <FilterBar 
              totalCount={filteredIntegrations.length} 
              categoryName={categoryName}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
            
            <IntegrationGrid 
              integrations={filteredIntegrations}
              onConnectIntegration={handleConnectIntegration}
            />
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Integration Permissions Modal */}
      {showPermissions && selectedIntegration && integrationDetails[selectedIntegration.id] && (
        <IntegrationPermissions
          integration={selectedIntegration}
          details={integrationDetails[selectedIntegration.id]}
          onClose={handleClosePermissions}
          onAuthorize={handleAuthorize}
        />
      )}

      {/* Success Modal */}
      {showSuccess && selectedIntegration && (
        <IntegrationSuccess
          integration={selectedIntegration}
          onClose={handleCloseSuccess}
        />
      )}
    </div>
  );
};

export default App;
