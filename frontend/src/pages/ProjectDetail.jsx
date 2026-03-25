import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiLayout, FiArrowRight, FiTarget, FiTrendingUp, FiCheckCircle, FiDollarSign } from 'react-icons/fi';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProject(response.data);
        
        if (response.data.status === 'GENERATING') {
          if (!interval) {
            interval = setInterval(fetchProject, 3000);
          }
        } else {
          if (interval) clearInterval(interval);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id]);

  if (loading) return (
    <div style={{ padding: '80px 40px', textAlign: 'center' }}>
      <div className="loader" style={{ margin: '0 auto 20px' }}></div>
      <p style={{ color: 'var(--text-muted)' }}>Analyzing your business strategy...</p>
    </div>
  );
  
  if (!project) return <div style={{ padding: '80px 40px', textAlign: 'center', color: 'var(--text-muted)' }}>Project not found</div>;

  const { aiResponse, status } = project;

  if (status === 'GENERATING') {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center' }}>
        <div className="loader" style={{ margin: '0 auto 32px', width: '48px', height: '48px' }}></div>
        <h2 style={{ marginBottom: '12px', fontSize: '24px' }}>AI is Crafting Your Success...</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
          We are generating your market analysis, business plan, and landing page. This usually takes 15-30 seconds.
        </p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-dark)' }}>
            {aiResponse?.businessName || 'Your Business Strategy'}
          </h1>
          <p style={{ color: 'var(--accent-teal)', fontWeight: 600, fontSize: '16px' }}>
            {aiResponse?.tagline}
          </p>
        </div>
        <Link to={`/landing-page/${id}`} className="btn-primary" style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', 
          padding: '12px 24px', borderRadius: 'var(--radius-md)', fontSize: '14px',
          flexShrink: 0
        }}>
          <FiLayout fontSize={16} /> View Landing Page <FiArrowRight />
        </Link>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        
        {/* Executive Summary */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div className="icon-badge blue">
              <FiTarget fontSize={20} />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Executive Summary</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '14px' }}>
            {aiResponse?.businessPlan?.executiveSummary || aiResponse?.description || 'Your vision is currently being refined...'}
          </p>
        </div>

        {/* Market Analysis */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div className="icon-badge teal">
              <FiTrendingUp fontSize={20} />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Market Analysis</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '14px' }}>
            {aiResponse?.businessPlan?.marketAnalysis || 'Market research completed. Strategic positioning identified.'}
          </p>
        </div>

        {/* Marketing Strategy */}
        <div className="glass-card" style={{ gridColumn: 'span 2', padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className="icon-badge blue">
              <FiCheckCircle fontSize={20} />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Marketing Strategy</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
            <div>
              <p style={{ fontWeight: 700, marginBottom: '14px', color: 'var(--text-dark)', fontSize: '15px' }}>Growth Channels</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {aiResponse?.marketingPlan?.channels?.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '14px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-teal)', flexShrink: 0 }}></div>
                    {c}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p style={{ fontWeight: 700, marginBottom: '14px', color: 'var(--text-dark)', fontSize: '15px' }}>SEO Keywords</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {aiResponse?.marketingPlan?.seoKeywords?.map((k, i) => (
                  <span key={i} className="tag">
                    #{k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div className="glass-card" style={{ padding: '28px', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className="icon-badge teal">
              <FiDollarSign fontSize={20} />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Financial Estimates</h3>
          </div>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '13px', fontWeight: 500 }}>Initial Startup Cost</p>
              <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-dark)' }}>{aiResponse?.businessPlan?.costEstimation?.startup || 'TBD'}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '13px', fontWeight: 500 }}>Monthly Running Cost</p>
              <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-dark)' }}>{aiResponse?.businessPlan?.costEstimation?.monthly || 'TBD'}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '13px', fontWeight: 500 }}>Revenue Strategy</p>
              <p style={{ color: 'var(--text-dark)', fontWeight: 600, fontSize: '15px' }}>{aiResponse?.businessPlan?.revenueModel || 'Scalable SaaS Model'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
