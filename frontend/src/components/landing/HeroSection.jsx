import React from 'react';

const HeroSection = ({ title, subtitle, ctaText }) => {
  return (
    <section style={{ 
      padding: '140px 20px 120px', 
      textAlign: 'center',
      background: 'linear-gradient(180deg, #EFF6FF 0%, #F0FDFA 40%, #FFFFFF 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative floating elements */}
      <div style={{
        position: 'absolute', top: '60px', left: '8%',
        width: '80px', height: '80px', borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(20,184,166,0.08) 100%)',
        transform: 'rotate(25deg)',
        animation: 'float 6s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '120px', right: '10%',
        width: '60px', height: '60px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
        animation: 'float 8s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '80px', left: '15%',
        width: '40px', height: '40px', borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(59,130,246,0.08) 100%)',
        transform: 'rotate(-15deg)',
        animation: 'float 7s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '60px', right: '12%',
        width: '50px', height: '50px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        animation: 'float 5s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />
      
      {/* Large decorative gradient orb */}
      <div style={{
        position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, rgba(20,184,166,0.03) 40%, transparent 65%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)',
          border: '1px solid rgba(59,130,246,0.15)',
          padding: '8px 20px', borderRadius: '9999px',
          marginBottom: '28px',
          fontSize: '14px', fontWeight: 600, color: '#3B82F6',
          boxShadow: '0 1px 4px rgba(59,130,246,0.1)',
          animation: 'slideDown 0.6s ease-out'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#14B8A6', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
          Now Available
        </div>

        <h1 style={{ 
          fontSize: '60px', fontWeight: 800, marginBottom: '22px', lineHeight: 1.08, 
          color: '#1E293B',
          animation: 'slideUp 0.6s ease-out',
          letterSpacing: '-0.03em'
        }}>
          {title}
        </h1>
        <p style={{ 
          fontSize: '20px', color: '#64748B', marginBottom: '40px', lineHeight: 1.7,
          maxWidth: '600px', margin: '0 auto 40px',
          animation: 'slideUp 0.6s ease-out 0.1s both'
        }}>
          {subtitle}
        </p>
        
        <div style={{ animation: 'slideUp 0.6s ease-out 0.2s both' }}>
          <button style={{ 
            background: 'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)',
            color: '#fff', border: 'none',
            padding: '18px 44px', fontSize: '17px', fontWeight: 700,
            borderRadius: '14px', cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(59,130,246,0.3), 0 1px 3px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.01em'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.35), 0 2px 6px rgba(0,0,0,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(59,130,246,0.3), 0 1px 3px rgba(0,0,0,0.08)'; }}
          >
            {ctaText || 'Get Started'} →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(25deg); }
          50% { transform: translateY(-18px) rotate(25deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
