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

  if (loading) return <div style={{ background: '#05050a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading landing page...</div>;
  if (!project) return <div>Project not found</div>;

  const landingConfig = project?.aiResponse?.landingPage;

  if (!landingConfig || !landingConfig.sections) {
    return (
      <div style={{ background: '#05050a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: '20px' }}>
        <h2>Landing Page Not Available</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>The AI did not generate landing page data for this project.</p>
        <Link to={`/projects/${id}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
          ← Back to Project
        </Link>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
        <Link to={`/projects/${id}`} style={{ 
            position: 'fixed', 
            top: '20px', 
            left: '20px', 
            zIndex: 100, 
            background: 'rgba(0,0,0,0.5)', 
            backdropFilter: 'blur(10px)', 
            padding: '8px 16px', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <FiArrowLeft /> Back to Project
        </Link>
        <LandingPageRenderer config={landingConfig} />
    </div>
  );
};

export default LandingPagePreview;
