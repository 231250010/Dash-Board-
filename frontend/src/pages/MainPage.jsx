import React from 'react';
import { useNavigate } from 'react-router-dom';
import moonLogo from '../assets/moon-solid.svg';
import '../styles/MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
        <img src={moonLogo} className="logo moon" alt="Moon logo" onClick={handleLogin} />
    <h1>Welcome to Dash Board!</h1>
      <p className="read-the-docs">
        Click on the moon logo to log in
      </p>
    </div>
  );
};

export default MainPage;
