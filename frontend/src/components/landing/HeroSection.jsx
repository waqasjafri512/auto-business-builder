import React from 'react';

const HeroSection = ({ title, subtitle, ctaText }) => {
  return (
    <section style={{ 
      padding: '120px 20px', 
      textAlign: 'center',
      background: 'radial-gradient(circle at center, #1a1a3a 0%, #05050a 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '64px', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>{title}</h1>
        <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '40px', lineHeight: 1.6 }}>{subtitle}</p>
        <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '18px' }}>
          {ctaText || 'Get Started'}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
