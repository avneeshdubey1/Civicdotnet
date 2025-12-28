import React from 'react';
import './Layout.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Civic Connect</h4>
          <p>Empowering citizens to build better cities, together.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/donate">Donate</a></li>
            <li><a href="/complaints">Complaints</a></li>
            <li><a href="/events">Events</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>help@civicconnect.com</p>
        </div>
      </div>
      <div style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} Civic Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;