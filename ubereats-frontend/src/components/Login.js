import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const history = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.data.token);
      if (response.data.is_customer) {
        history.push('/customer-dashboard');
      } else if (response.data.is_restaurant) {
        history.push('/restaurant-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <input type="text" name="username" className="form-control" onChange={handleChange} placeholder="Username" required />
      </div>
      <div className="form-group">
        <input type="password" name="password" className="form-control" onChange={handleChange} placeholder="Password" required />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

export default Login;