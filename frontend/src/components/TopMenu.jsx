// src/components/TopMenu.jsx
import React from 'react';
import '../styles/TopMenu.css'; // 引入样式

const TopMenu = ({ user, onLogin, onLogout }) => {

  const handleLoginClick = () => {
    onLogin();
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <div className="top-menu">
      {user ? (
        <div className="user-info">
          <span>{user.username}</span>
          <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
        </div>
      ) : (
        <button className="login-button" onClick={handleLoginClick}>Login</button>
      )}
    </div>
  );
};

export default TopMenu;
