import React from 'react';

const CTASection = ({ title, buttonText }) => {
  return (
    <section style={{ padding: '100px 20px', textAlign: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(108,92,231,0.1) 0%, rgba(168,85,247,0.1) 100%)' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>{title}</h2>
        <button className="btn-primary" style={{ marginTop: '24px', padding: '16px 48px' }}>
          {buttonText || 'Join Now'}
        </button>
      </div>
    </section>
  );
};

export default CTASection;
