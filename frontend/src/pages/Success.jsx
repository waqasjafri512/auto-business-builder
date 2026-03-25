import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Subscription activated successfully!');
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', animation: 'slideUp 0.5s ease-out' }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px'
      }}>
        <FiCheckCircle style={{ fontSize: '40px', color: 'var(--accent-teal)' }} />
      </div>
      <h1 style={{ fontSize: '28px', marginBottom: '12px', fontWeight: 700 }}>Payment Successful!</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.7' }}>
        Thank you for upgrading to Auto Business Builder PRO. Your account has been updated and you now have unlimited access to all features.
      </p>
      <button className="btn-primary" onClick={() => navigate('/')} style={{ padding: '13px 32px', fontSize: '15px' }}>
        Go to Dashboard
      </button>
      <p style={{ color: 'var(--text-light)', fontSize: '13px', marginTop: '20px' }}>
        Redirecting in 5 seconds...
      </p>
    </div>
  );
};

export default Success;
