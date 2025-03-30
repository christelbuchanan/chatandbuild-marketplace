import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Key, Lock, RefreshCw, Trash2, Settings, Globe, GitBranch, Clock } from 'lucide-react';
import { Integration } from '../types';

interface ProjectIntegrationManagerProps {
  integration: Integration;
  onBack: () => void;
}

interface DeploymentRecord {
  id: string;
  status: 'success' | 'failed' | 'building';
  branch: string;
  commitMessage: string;
  timestamp: string;
  url?: string;
}

const ProjectIntegrationManager: React.FC<ProjectIntegrationManagerProps> = ({ integration, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'deployments' | 'logs'>('overview');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployments, setDeployments] = useState<DeploymentRecord[]>([
    {
      id: 'dep_1',
      status: 'success',
      branch: 'main',
      commitMessage: 'Update landing page design',
      timestamp: '2023-06-15 14:32',
      url: 'https://my-project-abc123.vercel.app'
    },
    {
      id: 'dep_2',
      status: 'failed',
      branch: 'feature/auth',
      commitMessage: 'Add OAuth authentication',
      timestamp: '2023-06-14 10:15'
    }
  ]);

  // Simulated API credentials (in a real app, these would be securely stored and never exposed to the frontend)
  const [apiCredentials, setApiCredentials] = useState({
    apiKey: 'vercel_api_key_123456789',
    teamId: 'team_123456',
    projectId: 'prj_abcdefg'
  });

  // Simulated project settings
  const [projectSettings, setProjectSettings] = useState({
    projectName: 'my-awesome-project',
    framework: 'next',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    environmentVariables: [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'API_URL', value: 'https://api.example.com' }
    ],
    autoDeployEnabled: true
  });

  const handleDeploy = () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      const newDeployment: DeploymentRecord = {
        id: `dep_${Date.now()}`,
        status: 'building',
        branch: 'main',
        commitMessage: 'Manual deployment from ChatAndBuild',
        timestamp: new Date().toLocaleString()
      };
      
      setDeployments([newDeployment, ...deployments]);
      
      // Simulate build completion after 3 seconds
      setTimeout(() => {
        setDeployments(prev => 
          prev.map(dep => 
            dep.id === newDeployment.id 
              ? { 
                  ...dep, 
                  status: 'success',
                  url: 'https://my-project-updated.vercel.app'
                } 
              : dep
          )
        );
        setIsDeploying(false);
      }, 3000);
    }, 1000);
  };

  const handleResetCredentials = () => {
    if (window.confirm('Are you sure you want to reset your Vercel API credentials? This will require reconnecting your account.')) {
      // In a real app, this would call an API to delete the stored credentials
      setApiCredentials({
        apiKey: '',
        teamId: '',
        projectId: ''
      });
    }
  };

  const handleAddEnvironmentVariable = () => {
    const key = prompt('Enter environment variable name:');
    const value = prompt('Enter environment variable value:');
    
    if (key && value) {
      setProjectSettings(prev => ({
        ...prev,
        environmentVariables: [...prev.environmentVariables, { key, value }]
      }));
    }
  };

  const handleRemoveEnvironmentVariable = (keyToRemove: string) => {
    setProjectSettings(prev => ({
      ...prev,
      environmentVariables: prev.environmentVariables.filter(({ key }) => key !== keyToRemove)
    }));
  };

  const handleToggleAutoDeploy = () => {
    setProjectSettings(prev => ({
      ...prev,
      autoDeployEnabled: !prev.autoDeployEnabled
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto my-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
            {integration.icon === 'triangle' && <Triangle size={20} className="text-black" />}
          </div>
          <h2 className="text-2xl font-bold">{integration.name} Integration</h2>
        </div>
        
        <div className="ml-auto">
          <a 
            href="https://vercel.com/dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            Open Vercel Dashboard <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </div>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('deployments')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'deployments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Deployments
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'logs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Logs
          </button>
        </nav>
      </div>
      
      {activeTab === 'overview' && (
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Project Status</h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Connected
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Latest Deployment</p>
                <p className="font-medium">
                  {deployments[0]?.status === 'success' ? (
                    <span className="text-green-600 flex items-center">
                      Success <span className="mx-2">•</span> {deployments[0]?.timestamp}
                    </span>
                  ) : deployments[0]?.status === 'building' ? (
                    <span className="text-yellow-600 flex items-center">
                      Building <RefreshCw size={14} className="ml-1 animate-spin" />
                    </span>
                  ) : (
                    <span className="text-red-600">Failed</span>
                  )}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Production URL</p>
                <a 
                  href={deployments[0]?.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  {deployments[0]?.url} <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="btn btn-primary flex items-center justify-center"
              >
                {isDeploying ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" /> Deploying...
                  </>
                ) : (
                  <>Deploy to Vercel</>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className="btn btn-secondary flex items-center justify-center"
              >
                <Settings size={16} className="mr-2" /> Configure Settings
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Deployments</h3>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Branch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deployed At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deployments.slice(0, 3).map((deployment) => (
                    <tr key={deployment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {deployment.status === 'success' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Success
                          </span>
                        ) : deployment.status === 'building' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Building
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <GitBranch size={14} className="mr-1" /> {deployment.branch}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deployment.commitMessage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" /> {deployment.timestamp}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {deployments.length > 3 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab('deployments')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View all deployments
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'deployments' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Deployment History</h3>
            
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="btn btn-primary btn-sm flex items-center"
            >
              {isDeploying ? (
                <>
                  <RefreshCw size={14} className="mr-2 animate-spin" /> Deploying...
                </>
              ) : (
                <>Deploy Now</>
              )}
            </button>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deployed At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deployments.map((deployment) => (
                  <tr key={deployment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {deployment.status === 'success' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Success
                        </span>
                      ) : deployment.status === 'building' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Building
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <GitBranch size={14} className="mr-1" /> {deployment.branch}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {deployment.commitMessage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" /> {deployment.timestamp}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {deployment.url ? (
                        <a 
                          href={deployment.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Globe size={14} className="mr-1" /> Visit
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">API Credentials</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <div className="flex">
                  <input
                    type="password"
                    value="••••••••••••••••••••••"
                    disabled
                    className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
                  />
                  <button
                    onClick={() => alert('API key copied to clipboard')}
                    className="ml-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    <Key size={16} />
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  This API key is securely stored and used for deployments and project management.
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    <Lock size={14} className="inline mr-1" /> 
                    Your credentials are encrypted and securely stored
                  </p>
                </div>
                
                <button
                  onClick={handleResetCredentials}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center"
                >
                  <RefreshCw size={14} className="mr-1" /> Reset Credentials
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Project Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectSettings.projectName}
                  onChange={(e) => setProjectSettings(prev => ({ ...prev, projectName: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Framework
                </label>
                <select
                  value={projectSettings.framework}
                  onChange={(e) => setProjectSettings(prev => ({ ...prev, framework: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
                >
                  <option value="next">Next.js</option>
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="svelte">Svelte</option>
                  <option value="static">Static HTML</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Build Command
                </label>
                <input
                  type="text"
                  value={projectSettings.buildCommand}
                  onChange={(e) => setProjectSettings(prev => ({ ...prev, buildCommand: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Output Directory
                </label>
                <input
                  type="text"
                  value={projectSettings.outputDirectory}
                  onChange={(e) => setProjectSettings(prev => ({ ...prev, outputDirectory: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoDeployEnabled"
                  checked={projectSettings.autoDeployEnabled}
                  onChange={handleToggleAutoDeploy}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoDeployEnabled" className="ml-2 block text-sm text-gray-900">
                  Enable automatic deployments on push
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Environment Variables</h3>
              
              <button
                onClick={handleAddEnvironmentVariable}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Variable
              </button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projectSettings.environmentVariables.map((variable) => (
                    <tr key={variable.key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {variable.key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ••••••••••••
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleRemoveEnvironmentVariable(variable.key)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="mt-2 text-xs text-gray-500">
              Environment variables are encrypted and securely stored. They are injected into your application during build and runtime.
            </p>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => alert('Settings saved successfully!')}
              className="btn btn-primary"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'logs' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Deployment Logs</h3>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-auto h-96">
            <p className="text-gray-500">$ vercel --prod</p>
            <p className="text-green-400">Vercel CLI 28.15.3</p>
            <p>Retrieving project settings...</p>
            <p>Detected Next.js application</p>
            <p>Installing dependencies...</p>
            <p className="text-gray-500">$ npm install</p>
            <p>added 1232 packages, and audited 1233 packages in 25s</p>
            <p>Building project...</p>
            <p className="text-gray-500">$ next build</p>
            <p>info  - Loaded env from /vercel/.env</p>
            <p>info  - Linting and checking validity of types</p>
            <p>info  - Creating an optimized production build</p>
            <p>info  - Compiled successfully</p>
            <p>info  - Collecting page data</p>
            <p>info  - Generating static pages (0/10)</p>
            <p>info  - Generating static pages (5/10)</p>
            <p>info  - Generating static pages (10/10)</p>
            <p>info  - Finalizing page optimization</p>
            <p className="text-green-400">✓ Build completed successfully</p>
            <p>Deploying build artifacts...</p>
            <p>Routing configured for all paths</p>
            <p className="text-green-400">✓ Deployment complete!</p>
            <p>Production: https://my-project-updated.vercel.app [2s]</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Import the Triangle icon from Lucide React
const Triangle = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 20h18L12 4z" />
  </svg>
);

export default ProjectIntegrationManager;
