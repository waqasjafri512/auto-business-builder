import React from 'react';

const PricingSection = ({ plans }) => {
  return (
    <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '48px' }}>Choose Your Plan</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {plans?.map((plan, index) => (
          <div key={index} className="glass-card" style={{ 
            border: plan.name === 'Premium' ? '2px solid var(--accent-primary)' : '1px solid var(--border-glass)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {plan.name === 'Premium' && (
              <div style={{ position: 'absolute', top: '12px', right: '-30px', background: 'var(--accent-primary)', padding: '4px 40px', transform: 'rotate(45deg)', fontSize: '12px', fontWeight: 700 }}>BEST</div>
            )}
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>{plan.name}</h3>
            <p style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>{plan.price}</p>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
              {plan.features?.map((f, i) => <li key={i} style={{ marginBottom: '12px' }}>✓ {f}</li>)}
            </ul>
            <button className="btn-primary" style={{ width: '100%', marginTop: '32px', background: plan.name === 'Premium' ? 'var(--gradient-main)' : 'rgba(255,255,255,0.1)' }}>
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
