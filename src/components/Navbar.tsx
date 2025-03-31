import React from 'react';
import { Menu, Search, Bell, User, X, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  onManageIntegrations?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen, onManageIntegrations }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
            
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <motion.div 
                  className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center mr-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-bold text-lg">C</span>
                </motion.div>
                <span className="text-xl font-bold text-gray-900">ChatAndBuild</span>
              </a>
              
              <nav className="hidden lg:flex ml-8 space-x-6">
                <a href="#" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                  Home
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Projects
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Templates
                </a>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Integrations
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Documentation
                </a>
              </nav>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {onManageIntegrations && (
              <button
                onClick={onManageIntegrations}
                className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Settings size={16} className="mr-2" />
                Manage Integrations
              </button>
            )}
            
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Bell size={20} aria-hidden="true" />
            </button>
            
            <div className="relative">
              <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
