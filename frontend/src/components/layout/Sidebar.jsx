import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiPlusSquare, FiBriefcase, FiLogOut, FiZap } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/' },
    { name: 'New Project', icon: <FiPlusSquare />, path: '/new-project' },
    { name: 'My Projects', icon: <FiBriefcase />, path: '/projects' },
    { name: 'Upgrade to PRO', icon: <FiZap />, path: '/pricing', highlight: true },
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '26px', 
          fontWeight: 800,
          background: 'var(--gradient-main)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em'
        }}>
          AutoBiz
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px', fontWeight: 500 }}>
          AI Business Builder
        </p>
      </div>
      
      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 14px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              color: isActive 
                ? 'var(--accent-blue)' 
                : item.highlight 
                  ? 'var(--accent-teal)' 
                  : 'var(--text-muted)',
              background: isActive 
                ? '#EFF6FF' 
                : item.highlight 
                  ? '#F0FDFA' 
                  : 'transparent',
              fontWeight: isActive || item.highlight ? 600 : 500,
              borderLeft: isActive 
                ? '3px solid var(--accent-blue)' 
                : '3px solid transparent',
            })}
          >
            <span style={{ fontSize: '18px', display: 'flex' }}>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div style={{ 
        borderTop: '1px solid var(--border-light)', 
        paddingTop: '16px', 
        marginTop: '16px' 
      }}>
        {user && (
          <p style={{ 
            fontSize: '13px', 
            color: 'var(--text-muted)', 
            marginBottom: '12px',
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {user.name || user.email}
          </p>
        )}
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            color: 'var(--danger)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
            textAlign: 'left',
            borderRadius: 'var(--radius-md)',
            transition: 'background 0.2s ease',
            width: '100%',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
