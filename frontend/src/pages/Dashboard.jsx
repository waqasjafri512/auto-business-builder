import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiBriefcase, FiTrash2, FiClock, FiAlertCircle, FiCheckCircle, FiPlus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Sort by date to show recent ones first
      const sortedProjects = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProjects(sortedProjects.slice(0, 5)); // Only show top 5 for dashboard
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load recent projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'COMPLETED': 
        return (
          <span className="status-badge-small success">
            <FiCheckCircle size={12} /> Completed
          </span>
        );
      case 'GENERATING': 
        return (
          <span className="status-badge-small warning">
            <FiClock size={12} className="animate-spin" /> Generating
          </span>
        );
      case 'FAILED': 
        return (
          <span className="status-badge-small danger">
            <FiAlertCircle size={12} /> Failed
          </span>
        );
      default: return null;
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Welcome Card */}
      <div className="glass-card" style={{ boxShadow: 'var(--shadow-md)', padding: '32px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Welcome back to AutoBiz Dashboard 👋</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', maxWidth: '600px' }}>
            Your business engine is ready. Create a new project or view your saved ones.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <Link to="/new-project" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <FiPlus /> Create New Project
            </Link>
            <Link to="/projects" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View All Projects
            </Link>
          </div>
        </div>
        {/* Decorative element */}
        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '120px', color: 'rgba(59, 130, 246, 0.05)', transform: 'rotate(-15deg)', pointerEvents: 'none' }}>
          <FiBriefcase />
        </div>
      </div>

      {/* Recent Activities Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Recent Activities
        </h3>
        
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div className="loader" style={{ margin: '0 auto 12px' }}></div>
              <p style={{ color: 'var(--text-muted)' }}>Loading recent activities...</p>
            </div>
          ) : projects.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <FiBriefcase style={{ fontSize: '32px', color: 'var(--border-medium)', marginBottom: '12px' }} />
              <p style={{ color: 'var(--text-muted)' }}>No recent projects found</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project._id} onClick={() => window.location.href = `/projects/${project._id}`} style={{ cursor: 'pointer' }}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                          {project.aiResponse?.businessName || project.idea.substring(0, 30) + '...'}
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td>{getStatusBadge(project.status)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button 
                          onClick={(e) => handleDelete(project._id, e)}
                          className="btn-icon-danger"
                          title="Delete Project"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
