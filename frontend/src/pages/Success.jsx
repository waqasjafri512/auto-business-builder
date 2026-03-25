import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Subscription activated successfully!');
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <FiCheckCircle style={{ fontSize: '80px', color: '#10b981', marginBottom: '24px' }} />
      <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Payment Successful!</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>
        Thank you for upgrading to Auto Business Builder PRO. Your account has been updated and you now have unlimited access to all features.
      </p>
      <button className="btn-primary" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '20px' }}>
        Redirecting in 5 seconds...
      </p>
    </div>
  );
};

export default Success;
