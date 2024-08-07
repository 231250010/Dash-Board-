import React, { useState } from 'react';

const LoginModal = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // 发送登录请求并进行验签
    onLogin(username, password);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>登录</h2>
        <label>
          用户名:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          密码:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default LoginModal;
