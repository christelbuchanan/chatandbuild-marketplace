export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  publisher: string;
  rating: number;
  reviews: number;
  isInstalled: boolean;
  isPopular: boolean;
  isNew: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
}

export interface IntegrationDetails {
  permissions: Permission[];
  features: string[];
  pricingType: 'free' | 'freemium' | 'paid';
  pricingDetails?: string;
}
