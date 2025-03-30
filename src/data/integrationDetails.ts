import { IntegrationDetails } from '../types';

export const integrationDetails: Record<string, IntegrationDetails> = {
  github: {
    permissions: [
      {
        id: 'repo',
        name: 'Repository Access',
        description: 'Read and write access to your repositories',
        isRequired: true
      },
      {
        id: 'workflow',
        name: 'Workflow Access',
        description: 'Ability to create and manage GitHub Actions workflows',
        isRequired: true
      },
      {
        id: 'issues',
        name: 'Issues Access',
        description: 'Read and write access to issues and pull requests',
        isRequired: false
      },
      {
        id: 'user',
        name: 'User Information',
        description: 'Read access to your user profile information',
        isRequired: true
      }
    ],
    features: [
      'Automatic code deployment from GitHub repositories',
      'GitHub Actions integration for CI/CD pipelines',
      'Pull request previews and status checks',
      'Issue and pull request management',
      'Repository statistics and insights'
    ],
    pricingType: 'free',
    pricingDetails: 'Free for all users. Works with both public and private repositories.'
  },
  netlify: {
    permissions: [
      {
        id: 'sites',
        name: 'Sites Access',
        description: 'Create and manage Netlify sites',
        isRequired: true
      },
      {
        id: 'deploys',
        name: 'Deployments Access',
        description: 'Trigger and manage deployments',
        isRequired: true
      },
      {
        id: 'forms',
        name: 'Forms Access',
        description: 'Access to form submissions',
        isRequired: false
      },
      {
        id: 'functions',
        name: 'Functions Access',
        description: 'Deploy and manage serverless functions',
        isRequired: false
      }
    ],
    features: [
      'Continuous deployment from Git repositories',
      'Preview deployments for pull requests',
      'Custom domain management with automatic HTTPS',
      'Serverless functions deployment',
      'Form handling and processing'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier available. Pro plans start at $19/month.'
  },
  vercel: {
    permissions: [
      {
        id: 'read_projects',
        name: 'Read Projects',
        description: 'View your Vercel projects and deployments',
        isRequired: true
      },
      {
        id: 'write_projects',
        name: 'Write Projects',
        description: 'Create and update projects on your behalf',
        isRequired: true
      },
      {
        id: 'read_team',
        name: 'Read Team',
        description: 'View your team members and settings',
        isRequired: false
      },
      {
        id: 'read_user',
        name: 'Read User',
        description: 'Access your user profile information',
        isRequired: true
      }
    ],
    features: [
      'Automatic deployments from your Git repositories',
      'Preview deployments for pull requests',
      'Custom domain configuration',
      'Environment variables management',
      'Serverless functions support'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free for personal projects. Team plans start at $20/month.'
  },
  aws: {
    permissions: [
      {
        id: 'read_s3',
        name: 'S3 Access',
        description: 'Read and write to your S3 buckets',
        isRequired: true
      },
      {
        id: 'lambda_exec',
        name: 'Lambda Execution',
        description: 'Create and invoke Lambda functions',
        isRequired: true
      },
      {
        id: 'cloudformation',
        name: 'CloudFormation',
        description: 'Create and manage CloudFormation stacks',
        isRequired: true
      },
      {
        id: 'iam_limited',
        name: 'IAM Limited Access',
        description: 'Create service roles for deployed resources',
        isRequired: true
      },
      {
        id: 'cloudwatch',
        name: 'CloudWatch',
        description: 'Monitor your deployed resources',
        isRequired: false
      }
    ],
    features: [
      'Deploy serverless applications to AWS Lambda',
      'Manage S3 buckets for static assets',
      'Configure API Gateway endpoints',
      'Set up CloudFront distributions',
      'Monitor resources with CloudWatch'
    ],
    pricingType: 'paid',
    pricingDetails: 'Pay-as-you-go for AWS resources. ChatAndBuild does not charge additional fees.'
  },
  firebase: {
    permissions: [
      {
        id: 'auth',
        name: 'Authentication',
        description: 'Manage authentication methods and users',
        isRequired: true
      },
      {
        id: 'firestore',
        name: 'Firestore Database',
        description: 'Read and write to Firestore databases',
        isRequired: true
      },
      {
        id: 'storage',
        name: 'Cloud Storage',
        description: 'Upload and manage files in Firebase Storage',
        isRequired: false
      },
      {
        id: 'functions',
        name: 'Cloud Functions',
        description: 'Deploy and manage Firebase Cloud Functions',
        isRequired: false
      }
    ],
    features: [
      'User authentication and management',
      'Real-time database with Firestore',
      'File storage with Firebase Storage',
      'Serverless functions with Cloud Functions',
      'Analytics and crash reporting'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier available. Pay-as-you-go pricing for higher usage.'
  },
  stripe: {
    permissions: [
      {
        id: 'charges',
        name: 'Payment Processing',
        description: 'Create charges and process payments',
        isRequired: true
      },
      {
        id: 'customers',
        name: 'Customer Management',
        description: 'Create and manage customer records',
        isRequired: true
      },
      {
        id: 'subscriptions',
        name: 'Subscription Management',
        description: 'Create and manage subscription plans',
        isRequired: false
      },
      {
        id: 'webhooks',
        name: 'Webhook Events',
        description: 'Receive webhook events for payment activities',
        isRequired: true
      }
    ],
    features: [
      'Process one-time and recurring payments',
      'Manage customer payment information securely',
      'Create and manage subscription plans',
      'Generate invoices and receipts',
      'Detailed payment analytics and reporting'
    ],
    pricingType: 'paid',
    pricingDetails: '2.9% + 30¢ per successful card charge. No monthly fees.'
  },
  mongodb: {
    permissions: [
      {
        id: 'read_write',
        name: 'Database Read/Write',
        description: 'Read and write data to your MongoDB databases',
        isRequired: true
      },
      {
        id: 'admin',
        name: 'Database Administration',
        description: 'Create and manage database users and indexes',
        isRequired: true
      },
      {
        id: 'metrics',
        name: 'Performance Metrics',
        description: 'Access performance metrics and logs',
        isRequired: false
      }
    ],
    features: [
      'Connect to MongoDB Atlas clusters',
      'Automatic database backups and restoration',
      'Performance monitoring and optimization',
      'Database user management',
      'Data visualization and exploration'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier available. Paid plans start at $9/month.'
  },
  supabase: {
    permissions: [
      {
        id: 'database',
        name: 'Database Access',
        description: 'Full access to your Supabase PostgreSQL database',
        isRequired: true
      },
      {
        id: 'auth',
        name: 'Authentication',
        description: 'Manage users and authentication settings',
        isRequired: true
      },
      {
        id: 'storage',
        name: 'Storage',
        description: 'Manage files in Supabase Storage',
        isRequired: false
      },
      {
        id: 'functions',
        name: 'Edge Functions',
        description: 'Deploy and invoke serverless functions',
        isRequired: false
      }
    ],
    features: [
      'PostgreSQL database with real-time subscriptions',
      'User authentication and management',
      'File storage with access controls',
      'Serverless functions deployment',
      'Auto-generated APIs for your database'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier available. Pro plan starts at $25/month.'
  },
  algolia: {
    permissions: [
      {
        id: 'search',
        name: 'Search Operations',
        description: 'Perform search queries on your indices',
        isRequired: true
      },
      {
        id: 'indices',
        name: 'Index Management',
        description: 'Create and configure search indices',
        isRequired: true
      },
      {
        id: 'analytics',
        name: 'Search Analytics',
        description: 'Access search analytics and insights',
        isRequired: false
      }
    ],
    features: [
      'Lightning-fast search capabilities',
      'Typo-tolerance and synonyms',
      'Faceted search and filtering',
      'Personalized search results',
      'Search analytics and A/B testing'
    ],
    pricingType: 'paid',
    pricingDetails: 'Starts at $29/month. Free trial available.'
  },
  sendgrid: {
    permissions: [
      {
        id: 'mail_send',
        name: 'Send Emails',
        description: 'Send transactional and marketing emails',
        isRequired: true
      },
      {
        id: 'templates',
        name: 'Template Management',
        description: 'Create and manage email templates',
        isRequired: true
      },
      {
        id: 'stats',
        name: 'Email Statistics',
        description: 'Access email delivery and engagement statistics',
        isRequired: false
      },
      {
        id: 'contacts',
        name: 'Contact Management',
        description: 'Manage contact lists and segments',
        isRequired: false
      }
    ],
    features: [
      'Transactional email delivery',
      'Email template management',
      'Delivery and engagement tracking',
      'Email scheduling and automation',
      'Detailed analytics and reporting'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier: 100 emails/day. Paid plans start at $14.95/month for 50,000 emails.'
  },
  twilio: {
    permissions: [
      {
        id: 'sms',
        name: 'SMS Messaging',
        description: 'Send and receive SMS messages',
        isRequired: true
      },
      {
        id: 'voice',
        name: 'Voice Calls',
        description: 'Make and receive voice calls',
        isRequired: false
      },
      {
        id: 'phone_numbers',
        name: 'Phone Number Management',
        description: 'Purchase and manage phone numbers',
        isRequired: true
      },
      {
        id: 'webhooks',
        name: 'Webhook Events',
        description: 'Receive webhook events for messaging and calls',
        isRequired: true
      }
    ],
    features: [
      'SMS and MMS messaging',
      'Voice calls and IVR systems',
      'WhatsApp messaging integration',
      'Phone number management',
      'Programmable chat and video'
    ],
    pricingType: 'paid',
    pricingDetails: 'Pay-as-you-go pricing. SMS starts at $0.0075 per message. Voice starts at $0.013 per minute.'
  },
  auth0: {
    permissions: [
      {
        id: 'users',
        name: 'User Management',
        description: 'Create and manage user accounts',
        isRequired: true
      },
      {
        id: 'connections',
        name: 'Identity Providers',
        description: 'Configure social and enterprise connections',
        isRequired: true
      },
      {
        id: 'rules',
        name: 'Authentication Rules',
        description: 'Create and manage authentication rules',
        isRequired: false
      },
      {
        id: 'logs',
        name: 'Authentication Logs',
        description: 'Access authentication logs and events',
        isRequired: false
      }
    ],
    features: [
      'Single Sign-On (SSO) capabilities',
      'Multi-factor authentication',
      'Social login integration',
      'User management and profiles',
      'Customizable login flows'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free for up to 7,000 active users. Paid plans start at $23/month.'
  },
  contentful: {
    permissions: [
      {
        id: 'content_management',
        name: 'Content Management',
        description: 'Create and manage content entries and assets',
        isRequired: true
      },
      {
        id: 'content_types',
        name: 'Content Type Management',
        description: 'Define and modify content models',
        isRequired: true
      },
      {
        id: 'environments',
        name: 'Environment Management',
        description: 'Create and manage environments',
        isRequired: false
      },
      {
        id: 'webhooks',
        name: 'Webhook Management',
        description: 'Configure webhooks for content changes',
        isRequired: false
      }
    ],
    features: [
      'Headless CMS with structured content',
      'Content localization and translation',
      'Media asset management',
      'Content scheduling and publishing',
      'Content delivery API for multiple platforms'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier available. Team plans start at $489/month.'
  },
  sentry: {
    permissions: [
      {
        id: 'event_write',
        name: 'Error Reporting',
        description: 'Send error events to Sentry',
        isRequired: true
      },
      {
        id: 'project_read',
        name: 'Project Access',
        description: 'Access project information and settings',
        isRequired: true
      },
      {
        id: 'team_read',
        name: 'Team Access',
        description: 'Access team information and members',
        isRequired: false
      },
      {
        id: 'alerts',
        name: 'Alert Rules',
        description: 'Configure alert rules and notifications',
        isRequired: false
      }
    ],
    features: [
      'Real-time error tracking and monitoring',
      'Performance monitoring and profiling',
      'Release tracking and source maps',
      'Issue assignment and resolution workflows',
      'Detailed error context and breadcrumbs'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier: 5,000 errors/month. Team plans start at $26/month.'
  },
  cloudinary: {
    permissions: [
      {
        id: 'asset_upload',
        name: 'Asset Upload',
        description: 'Upload images and videos to your account',
        isRequired: true
      },
      {
        id: 'asset_management',
        name: 'Asset Management',
        description: 'Organize and manage media assets',
        isRequired: true
      },
      {
        id: 'transformations',
        name: 'Transformations',
        description: 'Apply transformations to media assets',
        isRequired: true
      },
      {
        id: 'admin',
        name: 'Admin Settings',
        description: 'Manage account settings and usage',
        isRequired: false
      }
    ],
    features: [
      'Image and video optimization',
      'On-the-fly transformations and effects',
      'Responsive image delivery',
      'AI-powered content analysis',
      'Media asset management'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier available. Plus plan starts at $89/month.'
  }
};
