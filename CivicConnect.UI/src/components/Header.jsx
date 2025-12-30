import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const Header = () => {
  const navigate = useNavigate();
  // Check if token exists to decide what to show
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload(); // Refresh to update the UI
  };

  return (
    <header className="site-header">
      <Link to="/" className="logo">Civic<span>Connect</span></Link>
      
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        
        {/* Only show these if Logged In */}
        {isLoggedIn && (
          <>
            <Link to="/donate">Donate</Link>
            <Link to="/complaints">Complaints</Link>
            <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
          </>
        )}

        {/* Toggle Login/Logout button */}
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            style={{background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: 'bold'}}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={{color: '#2563eb', fontWeight: 'bold'}}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;