import { Integration } from '../types';

// Map of integration IDs to their actual logo URLs
const logoMap: Record<string, string> = {
  github: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  netlify: 'https://www.netlify.com/v3/img/components/logomark.png',
  vercel: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
  aws: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
  firebase: 'https://www.gstatic.com/devrel-devsite/prod/v2210deb8920cd4a55bd580441aa58e7853afc04b39a9d9ac4198e1cd7fbe04ef/firebase/images/touchicon-180.png',
  stripe: 'https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png',
  mongodb: 'https://cdn.iconscout.com/icon/free/png-256/free-mongodb-5-1175140.png',
  supabase: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png',
  algolia: 'https://cdn.iconscout.com/icon/free/png-256/free-algolia-3521429-2944873.png',
  sendgrid: 'https://sendgrid.com/wp-content/themes/sgdotcom/pages/resource/brand/2016/SendGrid-Logomark.png',
  twilio: 'https://cdn.iconscout.com/icon/free/png-256/free-twilio-282195.png',
  auth0: 'https://cdn.auth0.com/website/bob/press/logo-dark.png',
  contentful: 'https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea2a/PoweredByContentful_LightBackground.svg',
  sentry: 'https://sentry-brand.storage.googleapis.com/sentry-logo-black.png',
  cloudinary: 'https://cloudinary-res.cloudinary.com/image/upload/c_scale,w_256/v1597183771/website/cloudinary_logo_for_white_bg.svg'
};

// Fallback function that uses the first letter of the name to create a colored background
const generateFallbackLogo = (name: string): string => {
  const colors = [
    '#4299E1', // blue-500
    '#48BB78', // green-500
    '#ED8936', // orange-500
    '#9F7AEA', // purple-500
    '#F56565', // red-500
    '#ECC94B'  // yellow-500
  ];
  
  // Use the first character of the name to determine the color
  const colorIndex = name.charCodeAt(0) % colors.length;
  const backgroundColor = colors[colorIndex];
  const letter = name.charAt(0).toUpperCase();
  
  // Create an SVG with the first letter
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <rect width="40" height="40" rx="8" fill="${backgroundColor.replace('#', '%23')}" />
    <text x="50%" y="50%" font-family="Arial" font-size="20" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">${letter}</text>
  </svg>`;
  
  return `data:image/svg+xml;utf8,${svgContent}`;
};

/**
 * Get the logo URL for a specific integration
 */
export const getLogoUrl = (integrationId: string, name: string): string => {
  return logoMap[integrationId] || generateFallbackLogo(name);
};

/**
 * Preload all logos to improve performance
 */
export const preloadLogos = (): void => {
  Object.values(logoMap).forEach(url => {
    const img = new Image();
    img.src = url;
  });
};
