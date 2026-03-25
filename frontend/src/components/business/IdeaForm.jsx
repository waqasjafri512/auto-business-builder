import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const IdeaForm = () => {
  const [idea, setIdea] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Generating your business plan...');
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/projects', {
        idea,
        location,
        budget
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Strategy generated!', { id: toastId });
      navigate(`/projects/${response.data._id}`);
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to generate. Please check AI service.';
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 700 }}>Launch New Business</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600 }}>
            What is your business idea?
          </label>
          <textarea 
            className="input-field" 
            rows="4"
            style={{ resize: 'none', marginBottom: 0 }}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. I want to start a shoe store in Lahore"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600 }}>
              Location (Optional)
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Lahore, Pakistan"
              style={{ marginBottom: 0 }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600 }}>
              Budget (Optional)
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. $5,000"
              style={{ marginBottom: 0 }}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading}
          style={{ width: '100%', marginTop: '24px', padding: '13px 24px', fontSize: '15px' }}
        >
          {loading ? 'Analyzing Idea...' : '✨ Generate Startup Kit'}
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
