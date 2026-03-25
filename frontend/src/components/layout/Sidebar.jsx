import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiPlusSquare, FiBriefcase, FiLogOut, FiZap } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/' },
    { name: 'New Project', icon: <FiPlusSquare />, path: '/new-project' },
    { name: 'My Projects', icon: <FiBriefcase />, path: '/projects' },
    { name: 'Upgrade to PRO', icon: <FiZap />, path: '/pricing', highlight: true },
  ];

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontStyle: 'italic', background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AutoBiz
        </h2>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
              ...(item.highlight && {
                background: 'linear-gradient(90deg, rgba(0, 122, 255, 0.15) 0%, transparent 100%)',
                color: 'var(--accent-primary)',
                fontWeight: '700'
              })
            })}
          >
            {item.icon}
            <span style={{ fontWeight: 500 }}>{item.name}</span>
          </NavLink>
        ))}
        
        <button
          onClick={logout}
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            color: '#ef4444',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 500,
            textAlign: 'left'
          }}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
