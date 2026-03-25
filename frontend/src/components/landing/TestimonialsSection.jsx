import React from 'react';

const TestimonialsSection = ({ items }) => {
  return (
    <section style={{ padding: '80px 20px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '48px' }}>What Our Clients Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {items?.map((text, index) => (
            <div key={index} className="glass-card" style={{ fontStyle: 'italic', color: '#cbd5e1' }}>
              <p style={{ fontSize: '18px', lineHeight: 1.6 }}>"{text}"</p>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--gradient-main)', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'white', fontStyle: 'normal' }}>Early Adopter</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
