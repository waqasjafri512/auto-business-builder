import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const CTASection = ({ title, buttonText }) => {
  return (
    <section style={{ padding: '80px 20px 100px', background: '#FFFFFF' }}>
      <div style={{ 
        maxWidth: '850px', margin: '0 auto', padding: '56px 40px',
        background: 'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)',
        borderRadius: '24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 48px rgba(59,130,246,0.25)'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-30px',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '10%',
          width: '80px', height: '80px', borderRadius: '20px',
          background: 'rgba(255,255,255,0.06)', transform: 'rotate(30deg)', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            fontSize: '36px', fontWeight: 800, marginBottom: '14px', color: '#FFFFFF',
            letterSpacing: '-0.02em', lineHeight: 1.2
          }}>
            {title || 'Ready to Transform Your Business?'}
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Join thousands of entrepreneurs who are building their dreams with AI.
          </p>
          <button style={{ 
            background: '#FFFFFF', color: '#3B82F6',
            border: 'none', padding: '16px 40px', fontSize: '16px', fontWeight: 700,
            borderRadius: '12px', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            fontFamily: "'Outfit', sans-serif"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; }}
          >
            {buttonText || 'Join Now'} <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
