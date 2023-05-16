import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const pages = [
    { path: '/', label: 'Home' },
    { path: '/settings', label: 'Settings' },
    // Add more pages as needed
  ];

  return (
    <header>
      <nav>
        <ul>
          {pages.map(page => (
            <li key={page.path}>
              <Link to={page.path}>{page.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
