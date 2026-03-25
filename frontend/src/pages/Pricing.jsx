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
        // For MVP, just take the first one
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
    <div>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '16px' }}>Ready to Scale?</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Unlock the full power of AI for your business ventures.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
        {plans.map((plan, i) => (
          <div key={i} className="glass-card" style={{ 
            border: plan.highlight ? '2px solid var(--accent-primary)' : '1px solid var(--border-glass)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {plan.highlight && (
              <span style={{ background: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, alignSelf: 'flex-start', marginBottom: '16px' }}>
                MOST POPULAR
              </span>
            )}
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>{plan.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '48px', fontWeight: 800 }}>{plan.price}</span>
              <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>{plan.interval}</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', flexGrow: 1 }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <FiCheck style={{ color: 'var(--accent-primary)' }} /> {f}
                </li>
              ))}
            </ul>

            <button 
              className="btn-primary" 
              onClick={plan.disabled ? null : handleUpgrade}
              disabled={plan.disabled || loading}
              style={{ 
                width: '100%', 
                background: plan.disabled ? 'rgba(255,255,255,0.05)' : 'var(--gradient-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
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
