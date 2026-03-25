import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import CTASection from './CTASection';

const sectionMap = {
  hero: HeroSection,
  features: FeaturesSection,
  testimonials: TestimonialsSection,
  pricing: PricingSection,
  cta: CTASection,
};

const LandingPageRenderer = ({ config }) => {
  if (!config || !config.sections) return null;

  return (
    <div className="lp-container" style={{ color: '#1E293B', background: '#FFFFFF', minHeight: '100vh' }}>
      {config.sections.map((section, index) => {
        const SectionComponent = sectionMap[section.type];
        if (!SectionComponent) return null;
        return <SectionComponent key={index} {...section} />;
      })}
      
      {/* Footer */}
      <footer style={{
        padding: '32px 20px',
        background: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 500 }}>
          Built with{' '}
          <span style={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>AutoBiz</span>
          {' '}— AI Business Builder
        </p>
      </footer>
    </div>
  );
};

export default LandingPageRenderer;
