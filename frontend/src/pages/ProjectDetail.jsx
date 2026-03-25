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
      <p style={{ color: 'var(--text-secondary)' }}>Analyzing your business strategy...</p>
    </div>
  );
  
  if (!project) return <div style={{ padding: '80px 40px', textAlign: 'center' }}>Project not found</div>;

  const { aiResponse, status } = project;

  if (status === 'GENERATING') {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center' }}>
        <div className="loader" style={{ margin: '0 auto 40px' }}></div>
        <h2 style={{ marginBottom: '16px' }}>AI is Crafting Your Success...</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
          We are generating your market analysis, business plan, and landing page. This usually takes 15-30 seconds.
        </p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px', background: 'linear-gradient(90deg, #fff 0%, var(--accent-primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {aiResponse?.businessName || 'Your Business Strategy'}
          </h1>
          <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '18px', letterSpacing: '0.5px' }}>
             {aiResponse?.tagline}
          </p>
        </div>
        <Link to={`/landing-page/${id}`} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 122, 255, 0.3)' }}>
          <FiLayout fontSize={18} /> View Landing Page <FiArrowRight />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Executive Summary */}
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '10px', background: 'rgba(0, 122, 255, 0.1)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
              <FiTarget fontSize={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '20px' }}>Executive Summary</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '15px' }}>
            {aiResponse?.businessPlan?.executiveSummary || aiResponse?.description || 'Your vision is currently being refined...'}
          </p>
        </div>

        {/* Market Analysis */}
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '10px', background: 'rgba(0, 122, 255, 0.1)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
              <FiTrendingUp fontSize={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '20px' }}>Market Analysis</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '15px' }}>
            {aiResponse?.businessPlan?.marketAnalysis || 'Market research completed. Strategic positioning identified.'}
          </p>
        </div>

        {/* Marketing Strategy */}
        <div className="glass-card" style={{ gridColumn: 'span 2', padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
             <div style={{ padding: '10px', background: 'rgba(0, 122, 255, 0.1)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
              <FiCheckCircle fontSize={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '20px' }}>Marketing Strategy</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
            <div>
              <p style={{ fontWeight: 700, marginBottom: '16px', color: '#fff', fontSize: '16px' }}>Growth Channels</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {aiResponse?.marketingPlan?.channels?.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                    {c}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p style={{ fontWeight: 700, marginBottom: '16px', color: '#fff', fontSize: '16px' }}>SEO Keywords</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {aiResponse?.marketingPlan?.seoKeywords?.map((k, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    #{k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financials */}
         <div className="glass-card" style={{ padding: '32px', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '10px', background: 'rgba(0, 122, 255, 0.1)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
              <FiDollarSign fontSize={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '20px' }}>Financial Estimates</h3>
          </div>
          <div style={{ display: 'flex', gap: '60px' }}>
             <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Initial Startup Cost</p>
                <p style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>{aiResponse?.businessPlan?.costEstimation?.startup || 'TBD'}</p>
             </div>
             <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Monthly Running Cost</p>
                <p style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>{aiResponse?.businessPlan?.costEstimation?.monthly || 'TBD'}</p>
             </div>
             <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Revenue Strategy</p>
                <p style={{ color: '#fff', fontWeight: 600 }}>{aiResponse?.businessPlan?.revenueModel || 'Scalable SaaS Model'}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
