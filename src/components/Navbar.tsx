import React from 'react';
import { Search, Menu, X, User, Bell, HelpCircle } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none lg:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center ml-2 lg:ml-0">
              <div className="flex items-center space-x-2">
                <div className="bg-primary-600 text-white p-1.5 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-code"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="m10 8-2 2 2 2"/><path d="m14 8 2 2-2 2"/></svg>
                </div>
                <span className="font-bold text-xl text-gray-900">ChatAndBuild</span>
              </div>
              <nav className="hidden lg:ml-10 lg:flex lg:space-x-8">
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Home</a>
                <a href="#" className="border-b-2 border-primary-500 text-primary-600 px-3 py-2 text-sm font-medium">Marketplace</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Documentation</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Community</a>
              </nav>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search marketplace"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
              <HelpCircle size={20} />
            </button>
            <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
              <Bell size={20} />
            </button>
            <button className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
