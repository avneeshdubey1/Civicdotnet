import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Header = () => {
  return (
    <header className="site-header">
      {/* Brand Name Changed */}
      <Link to="/" className="logo">
        Civic<span>Connect</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/donate">Donate</Link>
        {/* If user is logged in, show Dashboard, else show Login */}
        <Link to="/dashboard">Dashboard</Link> 
        <Link to="/login" className="btn-login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;