import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiBriefcase, FiExternalLink, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'COMPLETED': return <FiCheckCircle style={{ color: '#10b981' }} />;
      case 'GENERATING': return <FiClock style={{ color: '#f59e0b' }} className="spin" />;
      case 'FAILED': return <FiAlertCircle style={{ color: '#ef4444' }} />;
      default: return null;
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Your Business Projects</h1>
        <p style={{ color: 'var(--text-secondary)' }}>All your AI-generated strategies in one place</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {projects.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px' }}>
            <FiBriefcase style={{ fontSize: '48px', color: 'rgba(255,255,255,0.1)', marginBottom: '16px' }} />
            <h3>No projects yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>Start by describing your business idea.</p>
            <Link to="/new-project" className="btn-primary" style={{ textDecoration: 'none' }}>Create First Project</Link>
          </div>
        ) : (
          projects.map((project) => (
            <Link key={project._id} to={`/projects/${project._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '20px', lineHeight: '1.4' }}>{project.aiResponse?.businessName || project.idea.substring(0, 40) + '...'}</h3>
                  {getStatusIcon(project.status)}
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.idea}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary)' }}>
                        View Details <FiExternalLink />
                    </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 2s linear infinite; }
      `}</style>
    </div>
  );
};

export default ProjectsList;
