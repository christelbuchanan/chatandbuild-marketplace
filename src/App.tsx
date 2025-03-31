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
import ProjectIntegrationManager from './components/ProjectIntegrationManager';
import IntegrationManagementPage from './components/IntegrationManagementPage';
import { integrations, categories } from './data/integrations';
import { integrationDetails } from './data/integrationDetails';
import { Integration } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>(integrations);
  const [categoryName, setCategoryName] = useState('All Categories');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [installedIntegrations, setInstalledIntegrations] = useState<string[]>(
    integrations.filter(i => i.isInstalled).map(i => i.id)
  );
  const [showIntegrationDetails, setShowIntegrationDetails] = useState(false);
  const [showOnlyInstalled, setShowOnlyInstalled] = useState(false);
  const [showManagementPage, setShowManagementPage] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false);
    
    // If "installed" category is selected, show only installed integrations
    if (categoryId === 'installed') {
      setShowOnlyInstalled(true);
    } else {
      setShowOnlyInstalled(false);
    }
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleConnectIntegration = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (integration) {
      if (installedIntegrations.includes(integrationId)) {
        // If already installed, show the integration details/management page
        setSelectedIntegration(integration);
        setShowIntegrationDetails(true);
        setShowManagementPage(false);
      } else {
        // If not installed, start the connection flow
        setSelectedIntegration(integration);
        setShowPermissions(true);
        setShowManagementPage(false); // Ensure we exit management page when starting connection flow
      }
    } else {
      console.error(`Integration with ID ${integrationId} not found`);
    }
  };

  const handleManageIntegration = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (integration && installedIntegrations.includes(integrationId)) {
      setSelectedIntegration(integration);
      setShowIntegrationDetails(true);
      setShowManagementPage(false);
    }
  };

  const handleManageAllIntegrations = () => {
    // Show the dedicated management page
    setShowManagementPage(true);
    setShowIntegrationDetails(false);
    setSelectedIntegration(null);
  };

  const handleClosePermissions = () => {
    setShowPermissions(false);
    // If we were in the management page before, go back to it
    if (showManagementPage) {
      setShowManagementPage(true);
    }
  };

  const handleAuthorize = () => {
    if (selectedIntegration) {
      setShowPermissions(false);
      setShowSuccess(true);
      setInstalledIntegrations(prev => [...prev, selectedIntegration.id]);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedIntegration(null);
    // If we were in the management page before, go back to it
    if (showManagementPage) {
      setShowManagementPage(true);
    }
  };

  const handleBackToMarketplace = () => {
    setShowIntegrationDetails(false);
    setShowManagementPage(false);
    setSelectedIntegration(null);
  };

  const handleToggleInstalledFilter = (showInstalled: boolean) => {
    setShowOnlyInstalled(showInstalled);
    if (showInstalled) {
      setSelectedCategory('installed');
    } else if (selectedCategory === 'installed') {
      setSelectedCategory('all');
    }
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
    
    // Apply installed filter if enabled
    if (showOnlyInstalled) {
      filtered = filtered.filter(integration => integration.isInstalled);
      if (selectedCategory !== 'installed') {
        setCategoryName(`${categoryName} (Installed Only)`);
      }
    }
    
    // Apply search filter if query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        integration => 
          integration.name.toLowerCase().includes(query) || 
          integration.description.toLowerCase().includes(query) ||
          integration.tags.some(tag => tag.toLowerCase().includes(query))
      );
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
  }, [selectedCategory, sortOption, searchQuery, installedIntegrations, showOnlyInstalled]);

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

  // Get installed integrations for the management page
  const installedIntegrationsData = integrations
    .map(integration => ({
      ...integration,
      isInstalled: installedIntegrations.includes(integration.id)
    }))
    .filter(integration => integration.isInstalled);

  // Get recommended integrations that aren't installed yet
  const recommendedIntegrations = integrations
    .map(integration => ({
      ...integration,
      isInstalled: installedIntegrations.includes(integration.id)
    }))
    .filter(integration => integration.isPopular && !integration.isInstalled)
    .slice(0, 4);

  if (showManagementPage) {
    return (
      <div className="min-h-screen bg-gray-50 font-nunito">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
          onManageIntegrations={handleManageAllIntegrations}
        />
        <div className="container-custom py-8">
          <div className="flex items-center mb-6">
            <button 
              onClick={handleBackToMarketplace}
              className="mr-4 text-gray-500 hover:text-gray-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Marketplace
            </button>
            <h1 className="text-2xl font-bold">Manage Your Integrations</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Installed Integrations</h2>
            {installedIntegrationsData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {installedIntegrationsData.map(integration => (
                  <div key={integration.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                          {integration.icon === 'triangle' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h18L12 4z" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-medium">{integration.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{integration.description}</p>
                      <button
                        onClick={() => handleManageIntegration(integration.id)}
                        className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations installed yet</h3>
                <p className="text-gray-500 mb-4">Browse the marketplace to find and install integrations</p>
                <button
                  onClick={handleBackToMarketplace}
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Explore Marketplace
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recommended Integrations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedIntegrations.length > 0 ? (
                recommendedIntegrations.map(integration => (
                  <div key={integration.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                          {integration.icon === 'triangle' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h18L12 4z" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-medium">{integration.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{integration.description}</p>
                      <button
                        onClick={() => handleConnectIntegration(integration.id)}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-6">
                  <p className="text-gray-500">No recommended integrations available at this time.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showIntegrationDetails && selectedIntegration) {
    return (
      <div className="min-h-screen bg-gray-50 font-nunito">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
          onManageIntegrations={handleManageAllIntegrations}
        />
        <ProjectIntegrationManager 
          integration={selectedIntegration} 
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
        onManageIntegrations={handleManageAllIntegrations}
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
              onSearchChange={handleSearchChange}
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
              showInstalled={showOnlyInstalled}
              onInstalledToggle={handleToggleInstalledFilter}
            />
            
            <IntegrationGrid 
              integrations={filteredIntegrations}
              onConnectIntegration={handleConnectIntegration}
              onManageIntegration={handleManageIntegration}
            />
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Integration Permissions Modal */}
      {showPermissions && selectedIntegration && (
        <IntegrationPermissions
          integration={selectedIntegration}
          onApprove={handleAuthorize}
          onCancel={handleClosePermissions}
        />
      )}

      {/* Success Modal */}
      {showSuccess && selectedIntegration && (
        <IntegrationSuccess
          integration={selectedIntegration}
          onComplete={handleCloseSuccess}
        />
      )}
    </div>
  );
};

export default App;
