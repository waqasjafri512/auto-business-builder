import React from 'react';
import IdeaForm from '../components/business/IdeaForm';

const NewProject = () => {
  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Create Something New</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Fill out the details below and let AI build your strategy.</p>
      </div>
      
      <IdeaForm />
    </div>
  );
};

export default NewProject;
