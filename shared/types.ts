// shared/types.ts

export type ProjectStatus = 'DRAFT' | 'GENERATING' | 'COMPLETED' | 'FAILED';
export type PlanType = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface BusinessPlan {
  executiveSummary: string;
  marketAnalysis: string;
  revenueModel: string;
  costEstimation: {
    startup: string;
    monthly: string;
  };
  competitiveAdvantage: string;
}

export interface MarketingPlan {
  channels: string[];
  adCopy: string;
  seoKeywords: string[];
  socialMediaPlan: string;
}

export interface Branding {
  colorPalette: string[];
  fontSuggestion: string;
  logoDescription: string;
}

export interface LandingPageSection {
  type: 'hero' | 'features' | 'testimonials' | 'pricing' | 'cta';
  title?: string;
  subtitle?: string;
  ctaText?: string;
  items?: string[] | any[];
  plans?: any[];
  buttonText?: string;
}

export interface LandingPageConfig {
  sections: LandingPageSection[];
}

export interface AIResponse {
  businessName: string;
  tagline: string;
  description: string;
  targetAudience: string;
  businessPlan: BusinessPlan;
  marketingPlan: MarketingPlan;
  branding: Branding;
  landingPage: LandingPageConfig;
}

export interface ProjectDTO {
  id: string;
  organizationId: string;
  idea: string;
  location?: string;
  budget?: string;
  industry?: string;
  aiResponse?: AIResponse;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}
