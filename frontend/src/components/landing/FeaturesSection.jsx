import React from 'react';
import { FiCheckCircle, FiZap, FiShield, FiTrendingUp, FiGlobe, FiLayers, FiAward } from 'react-icons/fi';

const iconMap = [FiZap, FiShield, FiTrendingUp, FiGlobe, FiLayers, FiAward, FiCheckCircle];

const colorPairs = [
  { bg: '#EFF6FF', color: '#3B82F6' },
  { bg: '#F0FDFA', color: '#14B8A6' },
  { bg: '#F5F3FF', color: '#8B5CF6' },
  { bg: '#FFF7ED', color: '#F97316' },
  { bg: '#ECFDF5', color: '#10B981' },
  { bg: '#FEF3C7', color: '#D97706' },
  { bg: '#FCE7F3', color: '#EC4899' },
];

const FeaturesSection = ({ items }) => {
  return (
    <section style={{ padding: '90px 20px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block', fontSize: '13px', fontWeight: 700,
            color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.1em',
            marginBottom: '12px'
          }}>Features</span>
          <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#1E293B', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            What Makes Us Different
          </h2>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '500px', margin: '0 auto' }}>
            Everything you need to succeed, all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' 
        }}>
          {items?.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            const colors = colorPairs[index % colorPairs.length];
            return (
              <div key={index} style={{ 
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '28px',
                transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease',
                cursor: 'default',
                animation: `slideUp 0.4s ease-out ${index * 0.08}s both`,
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-6px)'; 
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = colors.color + '30';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: colors.color, fontSize: '22px'
                }}>
                  <Icon />
                </div>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', lineHeight: 1.6 }}>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
