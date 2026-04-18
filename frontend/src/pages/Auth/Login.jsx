import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loginType, setLoginType] = useState('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loginData = loginType === 'username' 
        ? { username: form.email, password: form.password }
        : { email: form.email, password: form.password };
      await login(loginData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">Gnotro.</h1>
          <p className="auth-tagline">Where knowledge meets discussion.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Welcome back</h2>
          <p className="auth-subtitle">Sign in to your account</p>

          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <div className="login-type-toggle">
              <button 
                type="button" 
                className={`toggle-btn ${loginType === 'email' ? 'active' : ''}`}
                onClick={() => setLoginType('email')}
              >
                Email
              </button>
              <button 
                type="button" 
                className={`toggle-btn ${loginType === 'username' ? 'active' : ''}`}
                onClick={() => setLoginType('username')}
              >
                Username
              </button>
            </div>
            <label htmlFor="email">{loginType === 'email' ? 'Email' : 'Username'}</label>
            <input
              id="email"
              name="email"
              type={loginType === 'email' ? 'email' : 'text'}
              placeholder={loginType === 'email' ? 'you@example.com' : '@username'}
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign In'}
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
