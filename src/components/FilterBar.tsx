import React from 'react';
import { Filter, ArrowDownAZ, TrendingUp } from 'lucide-react';

interface FilterBarProps {
  totalCount: number;
  categoryName: string;
  sortOption: string;
  onSortChange: (option: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ totalCount, categoryName, sortOption, onSortChange }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900">{categoryName}</h2>
            <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 text-sm rounded-full">
              {totalCount} {totalCount === 1 ? 'integration' : 'integrations'}
            </span>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
            </div>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
