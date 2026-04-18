import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef();
  const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '' });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
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
          <h2>Create account</h2>
          <p className="auth-subtitle">Join the conversation today</p>

          {error && <div className="auth-error">{error}</div>}

          {/* Profile picture */}
          <div className="avatar-picker" onClick={() => fileRef.current.click()}>
            {preview
              ? <img src={preview} alt="preview" className="avatar-preview" />
              : <div className="avatar-placeholder"><User size={36} /></div>
            }
            <div className="avatar-overlay"><Camera size={20} /></div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageSelect} />

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="@yourname"
              value={form.username}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
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

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Create Account'}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
