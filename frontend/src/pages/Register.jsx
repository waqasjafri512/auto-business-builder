import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #1a1a3a 0%, #05050a 100%)'
    }}>
      <div className="glass-card" style={{ width: '400px' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '28px' }}>Create Account</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Start building your business today</p>
        
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Full Name</label>
          <input 
            type="text" 
            className="input-field" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
            placeholder="John Doe"
          />

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)', marginTop: '16px' }}>Email Address</label>
          <input 
            type="email" 
            className="input-field" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            placeholder="name@example.com"
          />
          
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)', marginTop: '16px' }}>Password</label>
          <input 
            type="password" 
            className="input-field" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            placeholder="••••••••"
          />
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '24px' }}>
            Get Started
          </button>
        </form>
        
        <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
