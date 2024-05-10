import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8895/api/users/login', formData);
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'instructor') {
        navigate('/');
      } else {
        setError('Invalid role');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
