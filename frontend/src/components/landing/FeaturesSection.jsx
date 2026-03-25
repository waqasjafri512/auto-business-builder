import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const FeaturesSection = ({ items }) => {
  return (
    <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {items?.map((item, index) => (
          <div key={index} className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <FiCheckCircle style={{ color: 'var(--accent-primary)', fontSize: '24px', flexShrink: 0 }} />
            <p style={{ fontSize: '18px', fontWeight: 500 }}>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
