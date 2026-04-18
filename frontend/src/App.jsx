import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';
import Discuss from './pages/Discuss/Discuss';
import ArticleFeed from './pages/Article/ArticleFeed';
import Explore from './pages/Explore/Explore';
import GnotroAI from './pages/AI/GnotroAI';
import Messages from './pages/Messages/Messages';
import Profile from './pages/Profile/Profile';
import CreateDiscuss from './pages/Create/CreateDiscuss';
import CreateArticle from './pages/Create/CreateArticle';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <MainLayout>{children}</MainLayout>;
};

// Auth route wrapper — redirect if already logged in
const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Auth */}
    <Route path="/login"  element={<AuthRoute><Login /></AuthRoute>} />
    <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />

    {/* Protected */}
    <Route path="/"              element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/discuss"       element={<ProtectedRoute><Discuss /></ProtectedRoute>} />
    <Route path="/article"       element={<ProtectedRoute><ArticleFeed /></ProtectedRoute>} />
    <Route path="/explore"       element={<ProtectedRoute><Explore /></ProtectedRoute>} />
    <Route path="/ai"            element={<ProtectedRoute><GnotroAI /></ProtectedRoute>} />
    <Route path="/messages"      element={<ProtectedRoute><Messages /></ProtectedRoute>} />
    <Route path="/profile"       element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/create/discuss" element={<ProtectedRoute><CreateDiscuss /></ProtectedRoute>} />
    <Route path="/create/article" element={<ProtectedRoute><CreateArticle /></ProtectedRoute>} />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
