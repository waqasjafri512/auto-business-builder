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
import Dashboard from './pages/Dashboard';
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
            background: '#FFFFFF',
            color: '#1E293B',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500
          }
        }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
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
