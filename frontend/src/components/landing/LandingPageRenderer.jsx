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
    <div className="lp-container" style={{ color: '#fff', background: '#05050a' }}>
      {config.sections.map((section, index) => {
        const SectionComponent = sectionMap[section.type];
        if (!SectionComponent) return null;
        return <SectionComponent key={index} {...section} />;
      })}
    </div>
  );
};

export default LandingPageRenderer;
