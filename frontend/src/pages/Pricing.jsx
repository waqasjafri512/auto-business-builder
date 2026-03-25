import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCheck, FiZap } from 'react-icons/fi';

const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const [currentOrg, setCurrentOrg] = useState(null);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/organizations/me');
        setCurrentOrg(response.data[0]?.organizationId);
      } catch (error) {
        console.error('Fetch org error:', error);
      }
    };
    fetchOrg();
  }, []);

  const handleUpgrade = async () => {
    if (!currentOrg) return toast.error('No organization found');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/subscriptions/checkout', {
        organizationId: currentOrg._id
      });
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Failed to initiate checkout');
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['2 Business Strategies', 'Standard AI Speed', 'Basic Landing Page Templates'],
      buttonText: 'Current Plan',
      disabled: true
    },
    {
      name: 'Pro',
      price: '$29',
      interval: '/mo',
      features: ['Unlimited Strategies', 'Grok-2 Latest AI', 'Advanced SEO Marketing', 'Custom Branding Options', 'Priority Support'],
      buttonText: 'Upgrade Now',
      highlight: true
    }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px', fontWeight: 800 }}>Ready to Scale?</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Unlock the full power of AI for your business ventures.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
        {plans.map((plan, i) => (
          <div key={i} className="glass-card" style={{ 
            border: plan.highlight ? '2px solid var(--accent-blue)' : '1px solid var(--border-light)',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: plan.highlight ? 'var(--shadow-md)' : 'var(--shadow-sm)',
            position: 'relative',
            overflow: 'hidden',
            animation: `slideUp 0.5s ease-out ${i * 0.1}s both`
          }}>
            {plan.highlight && (
              <span style={{ 
                background: 'var(--gradient-main)', 
                padding: '5px 16px', 
                borderRadius: 'var(--radius-full)', 
                fontSize: '11px', 
                fontWeight: 700, 
                alignSelf: 'flex-start', 
                marginBottom: '16px',
                color: '#fff',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Most Popular
              </span>
            )}
            <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 700 }}>{plan.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '28px' }}>
              <span style={{ fontSize: '44px', fontWeight: 800, color: 'var(--text-dark)' }}>{plan.price}</span>
              <span style={{ color: 'var(--text-light)', marginLeft: '4px', fontSize: '15px' }}>{plan.interval}</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px', flexGrow: 1 }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: 'var(--text-muted)', fontSize: '14px' }}>
                  <FiCheck style={{ color: 'var(--accent-teal)', flexShrink: 0 }} /> {f}
                </li>
              ))}
            </ul>

            <button 
              className="btn-primary" 
              onClick={plan.disabled ? null : handleUpgrade}
              disabled={plan.disabled || loading}
              style={{ 
                width: '100%', 
                background: plan.disabled ? 'var(--bg-soft)' : 'var(--gradient-main)',
                color: plan.disabled ? 'var(--text-light)' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px 24px',
                fontSize: '15px',
                border: plan.disabled ? '1px solid var(--border-light)' : 'none'
              }}
            >
              {plan.highlight && <FiZap />} {loading ? 'Redirecting...' : plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
