import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LandingPageRenderer from '../components/landing/LandingPageRenderer';
import { FiArrowLeft } from 'react-icons/fi';

const LandingPagePreview = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProject(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return (
    <div style={{ background: '#FFFFFF', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loader" style={{ margin: '0 auto 16px' }}></div>
        <p>Loading landing page...</p>
      </div>
    </div>
  );
  if (!project) return <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>Project not found</div>;

  const landingConfig = project?.aiResponse?.landingPage;

  if (!landingConfig || !landingConfig.sections) {
    return (
      <div style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dark)', gap: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Landing Page Not Available</h2>
        <p style={{ color: 'var(--text-muted)' }}>The AI did not generate landing page data for this project.</p>
        <Link to={`/projects/${id}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600, marginTop: '8px' }}>
          ← Back to Project
        </Link>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <Link to={`/projects/${id}`} style={{ 
        position: 'fixed', 
        top: '16px', 
        left: '16px', 
        zIndex: 100, 
        background: 'rgba(255,255,255,0.9)', 
        backdropFilter: 'blur(8px)', 
        padding: '8px 18px', 
        color: 'var(--text-dark)', 
        textDecoration: 'none', 
        borderRadius: 'var(--radius-full)', 
        border: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: 600,
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 0.2s ease'
      }}>
        <FiArrowLeft /> Back to Project
      </Link>
      <LandingPageRenderer config={landingConfig} />
    </div>
  );
};

export default LandingPagePreview;
