import { Integration, Category } from '../types';

export const integrations: Integration[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect your GitHub repositories to automatically deploy your code and collaborate with your team.',
    icon: 'github',
    category: 'Development Tools',
    publisher: 'ChatAndBuild',
    rating: 4.8,
    reviews: 1245,
    isInstalled: true,
    isPopular: true,
    isNew: false,
    tags: ['version control', 'collaboration', 'code']
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description: 'Deploy your web projects with continuous deployment, global CDN, and one-click HTTPS.',
    icon: 'globe',
    category: 'Deployment',
    publisher: 'ChatAndBuild',
    rating: 4.7,
    reviews: 982,
    isInstalled: true,
    isPopular: true,
    isNew: false,
    tags: ['hosting', 'deployment', 'serverless']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy frontend projects with zero configuration, automatic SSL, and global CDN.',
    icon: 'triangle',
    category: 'Deployment',
    publisher: 'Vercel Inc.',
    rating: 4.9,
    reviews: 1120,
    isInstalled: false,
    isPopular: true,
    isNew: false,
    tags: ['hosting', 'deployment', 'frontend']
  },
  {
    id: 'aws',
    name: 'AWS',
    description: 'Connect to Amazon Web Services to deploy and scale your applications in the cloud.',
    icon: 'cloud',
    category: 'Cloud Services',
    publisher: 'Amazon',
    rating: 4.5,
    reviews: 876,
    isInstalled: false,
    isPopular: true,
    isNew: false,
    tags: ['cloud', 'hosting', 'serverless']
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: 'Add authentication, databases, storage, and more to your projects with Google Firebase.',
    icon: 'flame',
    category: 'Backend Services',
    publisher: 'Google',
    rating: 4.6,
    reviews: 1032,
    isInstalled: false,
    isPopular: true,
    isNew: false,
    tags: ['database', 'authentication', 'storage']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Integrate payment processing into your applications with Stripe\'s secure platform.',
    icon: 'credit-card',
    category: 'Payments',
    publisher: 'Stripe',
    rating: 4.8,
    reviews: 945,
    isInstalled: false,
    isPopular: true,
    isNew: false,
    tags: ['payments', 'e-commerce', 'billing']
  },
  {
    id: 'mongodb',
    name: 'MongoDB Atlas',
    description: 'Connect to MongoDB Atlas for scalable, cloud-hosted database solutions.',
    icon: 'database',
    category: 'Database',
    publisher: 'MongoDB Inc.',
    rating: 4.7,
    reviews: 823,
    isInstalled: false,
    isPopular: false,
    isNew: false,
    tags: ['database', 'nosql', 'cloud']
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Open source Firebase alternative with PostgreSQL database, authentication, and storage.',
    icon: 'database',
    category: 'Backend Services',
    publisher: 'Supabase',
    rating: 4.6,
    reviews: 712,
    isInstalled: false,
    isPopular: false,
    isNew: true,
    tags: ['database', 'authentication', 'storage']
  },
  {
    id: 'algolia',
    name: 'Algolia',
    description: 'Implement powerful search functionality in your applications with Algolia.',
    icon: 'search',
    category: 'Search',
    publisher: 'Algolia',
    rating: 4.7,
    reviews: 689,
    isInstalled: false,
    isPopular: false,
    isNew: false,
    tags: ['search', 'indexing', 'discovery']
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Send transactional and marketing emails through SendGrid\'s reliable delivery service.',
    icon: 'mail',
    category: 'Communication',
    publisher: 'Twilio',
    rating: 4.5,
    reviews: 756,
    isInstalled: false,
    isPopular: false,
    isNew: false,
    tags: ['email', 'marketing', 'notifications']
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'Add SMS, voice, and messaging capabilities to your applications with Twilio.',
    icon: 'phone',
    category: 'Communication',
    publisher: 'Twilio',
    rating: 4.6,
    reviews: 802,
    isInstalled: false,
    isPopular: false,
    isNew: false,
    tags: ['sms', 'voice', 'messaging']
  },
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Implement secure authentication and authorization in your applications.',
    icon: 'lock',
    category: 'Authentication',
    publisher: 'Okta',
    rating: 4.7,
    reviews: 912,
    isInstalled: false,
    isPopular: false,
    isNew: true,
    tags: ['authentication', 'security', 'identity']
  },
  {
    id: 'contentful',
    name: 'Contentful',
    description: 'Manage content for your applications with this headless CMS platform.',
    icon: 'file-text',
    category: 'Content Management',
    publisher: 'Contentful',
    rating: 4.5,
    reviews: 678,
    isInstalled: false,
    isPopular: false,
    isNew: false,
    tags: ['cms', 'content', 'headless']
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Monitor and track errors in your applications in real-time.',
    icon: 'alert-triangle',
    category: 'Monitoring',
    publisher: 'Sentry',
    rating: 4.8,
    reviews: 845,
    isInstalled: false,
    isPopular: false,
    isNew: false,
    tags: ['error tracking', 'monitoring', 'debugging']
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    description: 'Manage, optimize, and deliver images and videos for your applications.',
    icon: 'image',
    category: 'Media',
    publisher: 'Cloudinary',
    rating: 4.6,
    reviews: 723,
    isInstalled: false,
    isPopular: false,
    isNew: true,
    tags: ['images', 'videos', 'media']
  }
];

export const categories: Category[] = [
  { id: 'all', name: 'All Categories', count: integrations.length },
  { id: 'development-tools', name: 'Development Tools', count: integrations.filter(i => i.category === 'Development Tools').length },
  { id: 'deployment', name: 'Deployment', count: integrations.filter(i => i.category === 'Deployment').length },
  { id: 'cloud-services', name: 'Cloud Services', count: integrations.filter(i => i.category === 'Cloud Services').length },
  { id: 'backend-services', name: 'Backend Services', count: integrations.filter(i => i.category === 'Backend Services').length },
  { id: 'database', name: 'Database', count: integrations.filter(i => i.category === 'Database').length },
  { id: 'authentication', name: 'Authentication', count: integrations.filter(i => i.category === 'Authentication').length },
  { id: 'payments', name: 'Payments', count: integrations.filter(i => i.category === 'Payments').length },
  { id: 'communication', name: 'Communication', count: integrations.filter(i => i.category === 'Communication').length },
  { id: 'monitoring', name: 'Monitoring', count: integrations.filter(i => i.category === 'Monitoring').length },
  { id: 'content-management', name: 'Content Management', count: integrations.filter(i => i.category === 'Content Management').length },
  { id: 'media', name: 'Media', count: integrations.filter(i => i.category === 'Media').length },
  { id: 'search', name: 'Search', count: integrations.filter(i => i.category === 'Search').length }
];
