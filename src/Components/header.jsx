import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    // You can check the username and password against your authentication system or API

    // For demonstration purposes, let's assume the login is successful if both fields are non-empty
    if (username !== '' && password !== '') {
      // Set the user role based on the username
      if (username === 'admin') {
        setLoggedInUser({ username, role: 'admin' });
      } else if (username === 'editor') {
        setLoggedInUser({ username, role: 'editor' });
      } else {
        setLoggedInUser({ username, role: 'user' });
      }
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUsername('');
    setPassword('');
  };

  const pages = [
    { path: '/', label: 'Home' },
    { path: '/settings', label: 'Settings' },
    // Add more pages as needed
  ];

  return (
    <header>
      <nav>
        <ul>
          {pages.map((page) => (
            <li key={page.path}>
              <Link to={page.path}>{page.label}</Link>
            </li>
          ))}
        </ul>
        {loggedInUser ? (
          <div>
            <span>{loggedInUser.role}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
