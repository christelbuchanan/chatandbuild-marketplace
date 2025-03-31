import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
  totalCount?: number;
  categoryName?: string;
  sortOption?: string;
  onSortChange?: (option: string) => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  showInstalled?: boolean;
  onInstalledToggle?: (showInstalled: boolean) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  totalCount, 
  categoryName = 'All Integrations',
  sortOption = 'popular',
  onSortChange,
  onSearchChange,
  searchQuery = '',
  onClearSearch,
  showInstalled = false,
  onInstalledToggle,
  selectedCategory,
  onCategoryChange
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };
  
  const handleClearSearch = () => {
    setLocalSearchQuery('');
    if (onClearSearch) {
      onClearSearch();
    } else if (onSearchChange) {
      onSearchChange('');
    }
  };
  
  const handleSortChange = (option: string) => {
    if (onSortChange) {
      onSortChange(option);
    }
    setIsFilterOpen(false);
  };
  
  const handleInstalledToggle = () => {
    if (onInstalledToggle) {
      onInstalledToggle(!showInstalled);
    }
  };
  
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">{categoryName}</h2>
              {totalCount !== undefined && (
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                  {totalCount} {totalCount === 1 ? 'integration' : 'integrations'}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-1 md:flex-none items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search integrations..."
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={localSearchQuery}
                onChange={handleSearchInputChange}
              />
              {localSearchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={handleClearSearch}
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <div className="relative">
              <button
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={18} className="mr-1" />
                <span className="hidden sm:inline">Filter</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  >
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Sort by</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="sort"
                            checked={sortOption === 'popular'}
                            onChange={() => handleSortChange('popular')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Most Popular</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="sort"
                            checked={sortOption === 'newest'}
                            onChange={() => handleSortChange('newest')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Newest</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="sort"
                            checked={sortOption === 'alphabetical'}
                            onChange={() => handleSortChange('alphabetical')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Alphabetical</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="sort"
                            checked={sortOption === 'rating'}
                            onChange={() => handleSortChange('rating')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Highest Rated</span>
                        </label>
                      </div>
                      
                      {onInstalledToggle && (
                        <>
                          <div className="border-t border-gray-200 my-3"></div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Filter</h3>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={showInstalled}
                              onChange={handleInstalledToggle}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Show installed only</span>
                          </label>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
