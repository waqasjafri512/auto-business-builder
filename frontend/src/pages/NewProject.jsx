import React from 'react';
import IdeaForm from '../components/business/IdeaForm';

const NewProject = () => {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '6px' }}>Create Something New</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Fill out the details below and let AI build your strategy.</p>
      </div>
      
      <IdeaForm />
    </div>
  );
};

export default NewProject;
