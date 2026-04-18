import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API = axios.create({ baseURL: '/api', withCredentials: true });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('gnotro_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const signup = async (formData) => {
    const res = await API.post('/api/auth/signup', formData);
    setUser(res.data.user);
    localStorage.setItem('gnotro_user', JSON.stringify(res.data.user));
    return res.data;
  };

  const login = async (credentials) => {
    const res = await API.post('/api/auth/login', credentials);
    setUser(res.data.user);
    localStorage.setItem('gnotro_user', JSON.stringify(res.data.user));
    return res.data;
  };

  const logout = async () => {
    await API.post('/api/auth/logout');
    setUser(null);
    localStorage.removeItem('gnotro_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default API;
