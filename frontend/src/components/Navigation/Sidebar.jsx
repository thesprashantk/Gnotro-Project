import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, FileText, Cpu, Compass, Mail, User as UserIcon, Moon, Sun, PlusCircle, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sidebar card">
      <div className="sidebar-logo">
        <h2>Gnotro.</h2>
      </div>

      <div className="sidebar-links">
        <NavLink to="/" className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <Home size={24} /> <span className="link-text">Home</span>
        </NavLink>
        <NavLink to="/discuss" className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <MessageSquare size={24} /> <span className="link-text">Discuss</span>
        </NavLink>
        <NavLink to="/article" className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <FileText size={24} /> <span className="link-text">Article</span>
        </NavLink>
        <NavLink to="/explore" className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <Compass size={24} /> <span className="link-text">Explore</span>
        </NavLink>
        <NavLink to="/ai" className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <Cpu size={24} /> <span className="link-text">Gnotro AI</span>
        </NavLink>
        <NavLink to="/messages" className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <Mail size={24} /> <span className="link-text">Messages</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <UserIcon size={24} /> <span className="link-text">Profile</span>
        </NavLink>
      </div>

      <div className="sidebar-bottom">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          <span className="link-text">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        {user && (
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={24} />
            <span className="link-text">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
