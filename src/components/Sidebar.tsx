import React from 'react';
import { categories } from '../data/integrations';
import { Package, Star, Clock, Download, Tag } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, selectedCategory, onCategoryChange }) => {
  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 pt-16 pb-4 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto`}>
      <div className="h-full overflow-y-auto scrollbar-thin">
        <div className="px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Marketplace</h2>
          <p className="mt-1 text-sm text-gray-500">Discover integrations for your projects</p>
        </div>
        
        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Browse</h3>
          <div className="mt-2 space-y-1">
            <button 
              onClick={() => onCategoryChange('all')}
              className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${selectedCategory === 'all' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Package size={18} className="mr-3 flex-shrink-0" />
              <span>All Apps</span>
              <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 text-xs rounded-full">{categories[0].count}</span>
            </button>
            <button 
              onClick={() => onCategoryChange('popular')}
              className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${selectedCategory === 'popular' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Star size={18} className="mr-3 flex-shrink-0" />
              <span>Popular</span>
            </button>
            <button 
              onClick={() => onCategoryChange('new')}
              className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${selectedCategory === 'new' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Clock size={18} className="mr-3 flex-shrink-0" />
              <span>New</span>
            </button>
            <button 
              onClick={() => onCategoryChange('installed')}
              className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${selectedCategory === 'installed' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Download size={18} className="mr-3 flex-shrink-0" />
              <span>Installed</span>
            </button>
          </div>
        </div>
        
        <div className="px-4 py-2 mt-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
          <div className="mt-2 space-y-1">
            {categories.slice(1).map((category) => (
              <button 
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${selectedCategory === category.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Tag size={18} className="mr-3 flex-shrink-0" />
                <span>{category.name}</span>
                <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 text-xs rounded-full">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
