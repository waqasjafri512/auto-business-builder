import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import NewProject from './pages/NewProject';
import ProjectDetail from './pages/ProjectDetail';
import ProjectsList from './pages/ProjectsList';
import LandingPagePreview from './pages/LandingPagePreview';
import Pricing from './pages/Pricing';
import Success from './pages/Success';
import Layout from './components/layout/Layout';

// Protected Route Component
const PrivateRoute = ({ children, useLayout = true }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return useLayout ? <Layout>{children}</Layout> : children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)'
          }
        }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <div className="glass-card">
                <h2>Welcome back to AutoBiz Dashboard</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Your business engine is ready. Create a new project or view your saved ones.
                </p>
              </div>
            </PrivateRoute>
          } />

          <Route path="/new-project" element={
            <PrivateRoute>
              <NewProject />
            </PrivateRoute>
          } />

          <Route path="/projects/:id" element={
            <PrivateRoute>
              <ProjectDetail />
            </PrivateRoute>
          } />

          <Route path="/projects" element={
            <PrivateRoute>
              <ProjectsList />
            </PrivateRoute>
          } />

          <Route path="/pricing" element={
            <PrivateRoute>
              <Pricing />
            </PrivateRoute>
          } />

          <Route path="/success" element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          } />

          <Route path="/landing-page/:id" element={
            <PrivateRoute useLayout={false}>
              <LandingPagePreview />
            </PrivateRoute>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
