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
      background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 50%, #F8FAFC 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative bg elements */}
      <div style={{
        position: 'absolute', top: '-120px', left: '-120px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="glass-card" style={{ 
        width: '420px', 
        padding: '40px',
        animation: 'slideUp 0.5s ease-out',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-light)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 800,
            background: 'var(--gradient-main)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            AutoBiz
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Create your free account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em' }}>
            Full Name
          </label>
          <input 
            type="text" 
            className="input-field" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
            placeholder="John Doe"
          />

          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em', marginTop: '8px' }}>
            Email Address
          </label>
          <input 
            type="email" 
            className="input-field" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            placeholder="name@example.com"
          />
          
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em', marginTop: '8px' }}>
            Password
          </label>
          <input 
            type="password" 
            className="input-field" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            placeholder="••••••••"
          />
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '24px', padding: '13px 24px', fontSize: '15px' }}>
            Get Started
          </button>
        </form>
        
        <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
