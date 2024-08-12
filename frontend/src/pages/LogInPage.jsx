import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LogInPage.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:7001/api/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Store the JWT token in localStorage
        console.log('Token:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', response.data.token.id);
        // Navigate to the home page
        navigate('/Home');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
