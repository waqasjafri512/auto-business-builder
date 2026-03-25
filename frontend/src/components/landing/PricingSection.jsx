import React from 'react';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const PricingSection = ({ plans }) => {
  return (
    <section style={{ padding: '90px 20px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block', fontSize: '13px', fontWeight: 700,
            color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.1em',
            marginBottom: '12px'
          }}>Pricing</span>
          <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#1E293B', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Choose Your Plan
          </h2>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '450px', margin: '0 auto' }}>
            Simple, transparent pricing. No hidden fees.
          </p>
        </div>

        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px', maxWidth: '750px', margin: '0 auto' 
        }}>
          {plans?.map((plan, index) => {
            const isPremium = plan.name === 'Premium' || plan.name === 'Pro';
            return (
              <div key={index} style={{ 
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                border: isPremium ? '2px solid #3B82F6' : '1px solid #E2E8F0',
                padding: isPremium ? '36px' : '36px',
                background: isPremium 
                  ? 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' 
                  : '#FFFFFF',
                boxShadow: isPremium ? '0 8px 32px rgba(59,130,246,0.12)' : '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                animation: `slideUp 0.4s ease-out ${index * 0.1}s both`,
                display: 'flex', flexDirection: 'column'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = isPremium ? '0 16px 48px rgba(59,130,246,0.18)' : '0 8px 24px rgba(0,0,0,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isPremium ? '0 8px 32px rgba(59,130,246,0.12)' : '0 1px 3px rgba(0,0,0,0.05)'; }}
              >
                {/* Premium ribbon */}
                {isPremium && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '-32px',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)',
                    padding: '5px 44px', transform: 'rotate(45deg)',
                    fontSize: '11px', fontWeight: 700, color: '#fff',
                    letterSpacing: '0.08em', boxShadow: '0 2px 8px rgba(59,130,246,0.3)'
                  }}>BEST</div>
                )}
                
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '24px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 800, color: '#1E293B', letterSpacing: '-0.03em' }}>{plan.price}</span>
                  {plan.price !== 'Free' && plan.price !== '$0' && (
                    <span style={{ color: '#94A3B8', marginLeft: '4px', fontSize: '15px' }}>/month</span>
                  )}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px', flexGrow: 1 }}>
                  {plan.features?.map((f, i) => (
                    <li key={i} style={{ 
                      display: 'flex', alignItems: 'center', gap: '10px', 
                      marginBottom: '14px', fontSize: '14px', color: '#475569' 
                    }}>
                      <span style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: isPremium ? '#ECFDF5' : '#F1F5F9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <FiCheck style={{ fontSize: '12px', color: isPremium ? '#10B981' : '#64748B' }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button style={{ 
                  width: '100%',
                  background: isPremium ? 'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)' : '#F8FAFC',
                  color: isPremium ? '#fff' : '#64748B',
                  border: isPremium ? 'none' : '1px solid #E2E8F0',
                  padding: '14px 24px', fontSize: '15px', fontWeight: 700,
                  borderRadius: '12px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  fontFamily: "'Outfit', sans-serif"
                }}
                onMouseEnter={(e) => { if(isPremium) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.3)'; } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Choose {plan.name} {isPremium && <FiArrowRight />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
