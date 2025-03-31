import { IntegrationDetails } from '../types';

// Map of integration IDs to their detailed information
export const integrationDetails: Record<string, IntegrationDetails> = {
  github: {
    permissions: [
      {
        id: 'repo',
        name: 'Repository access',
        description: 'Access to read and write to your repositories',
        isRequired: true
      },
      {
        id: 'user',
        name: 'User information',
        description: 'Read-only access to your user profile information',
        isRequired: true
      },
      {
        id: 'webhook',
        name: 'Webhooks',
        description: 'Ability to create and manage webhooks',
        isRequired: false
      }
    ],
    features: [
      'Automatic deployment from repositories',
      'Pull request previews',
      'Commit status updates',
      'Issue tracking integration'
    ],
    pricingType: 'free'
  },
  netlify: {
    permissions: [
      {
        id: 'deploy',
        name: 'Deployment access',
        description: 'Ability to deploy sites to your Netlify account',
        isRequired: true
      },
      {
        id: 'sites',
        name: 'Site management',
        description: 'Access to create and manage sites',
        isRequired: true
      }
    ],
    features: [
      'Continuous deployment',
      'Preview deployments',
      'Form handling',
      'Serverless functions'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier available with premium features for paid plans'
  },
  vercel: {
    permissions: [
      {
        id: 'deploy',
        name: 'Deployment access',
        description: 'Ability to deploy projects to your Vercel account',
        isRequired: true
      },
      {
        id: 'projects',
        name: 'Project management',
        description: 'Access to create and manage projects',
        isRequired: true
      }
    ],
    features: [
      'Preview deployments',
      'Serverless functions',
      'Edge network',
      'Analytics'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free for personal use, team plans available'
  },
  aws: {
    permissions: [
      {
        id: 's3',
        name: 'S3 access',
        description: 'Read and write access to S3 buckets',
        isRequired: true
      },
      {
        id: 'lambda',
        name: 'Lambda functions',
        description: 'Ability to create and manage Lambda functions',
        isRequired: false
      },
      {
        id: 'cloudfront',
        name: 'CloudFront',
        description: 'Manage CloudFront distributions',
        isRequired: false
      }
    ],
    features: [
      'S3 storage integration',
      'Lambda function deployment',
      'CloudFront CDN configuration',
      'API Gateway integration'
    ],
    pricingType: 'paid',
    pricingDetails: 'Pay-as-you-go pricing based on usage'
  },
  firebase: {
    permissions: [
      {
        id: 'firestore',
        name: 'Firestore access',
        description: 'Read and write access to Firestore databases',
        isRequired: false
      },
      {
        id: 'auth',
        name: 'Authentication',
        description: 'Manage authentication settings and users',
        isRequired: false
      },
      {
        id: 'storage',
        name: 'Storage access',
        description: 'Read and write access to Firebase Storage',
        isRequired: false
      }
    ],
    features: [
      'Real-time database',
      'Authentication services',
      'Cloud storage',
      'Hosting',
      'Cloud functions'
    ],
    pricingType: 'freemium',
    pricingDetails: 'Free tier with usage limits, pay as you grow'
  },
  stripe: {
    permissions: [
      {
        id: 'charges',
        name: 'Payment processing',
        description: 'Create and manage charges',
        isRequired: true
      },
      {
        id: 'customers',
        name: 'Customer management',
        description: 'Create and manage customer information',
        isRequired: true
      },
      {
        id: 'subscriptions',
        name: 'Subscription management',
        description: 'Create and manage subscriptions',
        isRequired: false
      }
    ],
    features: [
      'Payment processing',
      'Subscription management',
      'Invoice generation',
      'Payment links',
      'Fraud prevention'
    ],
    pricingType: 'paid',
    pricingDetails: 'Transaction fee of 2.9% + 30¢ per successful charge'
  }
};

// Add default empty details for any integration not explicitly defined
export const getIntegrationDetails = (integrationId: string): IntegrationDetails => {
  return integrationDetails[integrationId] || {
    permissions: [],
    features: [],
    pricingType: 'free'
  };
};
