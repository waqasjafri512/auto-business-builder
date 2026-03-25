import React from 'react';

const avatarColors = [
  'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)',
  'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  'linear-gradient(135deg, #F97316 0%, #EAB308 100%)',
  'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
];

const names = ['Sarah K.', 'James M.', 'Alex W.', 'Priya R.', 'David L.'];
const roles = ['CEO & Founder', 'Marketing Director', 'Tech Lead', 'Product Manager', 'Growth Strategist'];

const TestimonialsSection = ({ items }) => {
  return (
    <section style={{ 
      padding: '90px 20px', 
      background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute', top: '40px', right: '5%',
        fontSize: '120px', color: 'rgba(59,130,246,0.04)', fontWeight: 900,
        fontFamily: 'Georgia, serif', lineHeight: 1, pointerEvents: 'none'
      }}>"</div>
      <div style={{
        position: 'absolute', bottom: '40px', left: '5%',
        fontSize: '120px', color: 'rgba(20,184,166,0.04)', fontWeight: 900,
        fontFamily: 'Georgia, serif', lineHeight: 1, pointerEvents: 'none', transform: 'rotate(180deg)'
      }}>"</div>

      <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block', fontSize: '13px', fontWeight: 700,
            color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.1em',
            marginBottom: '12px'
          }}>Testimonials</span>
          <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#1E293B', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Loved by Entrepreneurs
          </h2>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '450px', margin: '0 auto' }}>
            See what our customers have to say about their experience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {items?.map((text, index) => (
            <div key={index} style={{ 
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '28px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              animation: `slideUp 0.4s ease-out ${index * 0.1}s both`,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Star rating */}
              <div style={{ marginBottom: '16px', display: 'flex', gap: '3px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#FBBF24', fontSize: '16px' }}>★</span>
                ))}
              </div>
              
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', flex: 1, marginBottom: '20px' }}>
                "{text}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                <div style={{ 
                  width: '42px', height: '42px', 
                  background: avatarColors[index % avatarColors.length], 
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '14px', fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  {names[index % names.length].split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '2px' }}>
                    {names[index % names.length]}
                  </p>
                  <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                    {roles[index % roles.length]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
