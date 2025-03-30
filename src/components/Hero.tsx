import React from 'react';
import { Search } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Discover integrations for ChatAndBuild
          </h1>
          <p className="mt-6 text-xl leading-8">
            Enhance your projects with powerful tools and services that seamlessly integrate with ChatAndBuild.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for integrations..."
                className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-primary-600 rounded-r-md hover:bg-primary-700 focus:outline-none">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
