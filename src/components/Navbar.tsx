import React from 'react';
import { Menu, X, Settings } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  onManageIntegrations?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen, onManageIntegrations }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">ChatAndBuild</span>
              <span className="ml-2 text-gray-500">|</span>
              <span className="ml-2 text-gray-500">Marketplace</span>
            </div>
          </div>
          <div className="flex items-center">
            {onManageIntegrations && (
              <button
                onClick={onManageIntegrations}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Settings size={16} className="mr-2" />
                Manage Integrations
              </button>
            )}
            <div className="ml-4 flex items-center md:ml-6">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
