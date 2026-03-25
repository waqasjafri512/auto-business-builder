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

  const getStatusBadge = (status) => {
    switch(status) {
      case 'COMPLETED': 
        return (
          <span className="status-badge success">
            <FiCheckCircle /> Completed
          </span>
        );
      case 'GENERATING': 
        return (
          <span className="status-badge warning">
            <FiClock className="animate-spin" style={{ animationDuration: '2s' }} /> Generating
          </span>
        );
      case 'FAILED': 
        return (
          <span className="status-badge danger">
            <FiAlertCircle /> Failed
          </span>
        );
      default: return null;
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
      <div className="loader" style={{ marginBottom: '16px' }}></div>
      <p style={{ color: 'var(--text-muted)' }}>Loading projects...</p>
    </div>
  );

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '6px' }}>Your Business Projects</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>All your AI-generated strategies in one place</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {projects.length === 0 ? (
          <div className="glass-card empty-state" style={{ gridColumn: '1/-1' }}>
            <FiBriefcase className="empty-state-icon" style={{ display: 'block', margin: '0 auto 16px', fontSize: '48px', color: 'var(--border-medium)' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No projects yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Start by describing your business idea.</p>
            <Link to="/new-project" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Create First Project
            </Link>
          </div>
        ) : (
          projects.map((project, idx) => (
            <Link 
              key={project._id} 
              to={`/projects/${project._id}`} 
              style={{ textDecoration: 'none', color: 'inherit', animationDelay: `${idx * 0.06}s` }}
              className="animate-slideUp"
            >
              <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '17px', lineHeight: '1.4', fontWeight: 600, flex: 1, marginRight: '12px' }}>
                    {project.aiResponse?.businessName || project.idea.substring(0, 40) + '...'}
                  </h3>
                  {getStatusBadge(project.status)}
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.6', flex: 1 }}>
                  {project.idea}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 500 }}>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-blue)' }}>
                    View Details <FiExternalLink size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
