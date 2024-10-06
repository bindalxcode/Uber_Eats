import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';

function CustomerSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
  });
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ ...formData, is_customer: true });
      alert('Signup successful!');
      history.push('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customer Signup</h2>
      <div className="form-group">
        <input type="text" name="username" className="form-control" onChange={handleChange} placeholder="Username" required />
      </div>
      <div className="form-group">
        <input type="email" name="email" className="form-control" onChange={handleChange} placeholder="Email" required />
      </div>
      <div className="form-group">
        <input type="password" name="password" className="form-control" onChange={handleChange} placeholder="Password" required />
      </div>
      <div className="form-group">
        <input type="tel" name="phone_number" className="form-control" onChange={handleChange} placeholder="Phone Number" required />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default CustomerSignup;