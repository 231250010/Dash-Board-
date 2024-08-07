import React from 'react';
import './TopMenu.css'; // 引入样式

const TopMenu = ({ onLogin }) => {

    // const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

  return (
    <div className="top-menu">
      <button className="login-button" onClick={onLogin}>Login</button>
    </div>
  );
};

export default TopMenu;

