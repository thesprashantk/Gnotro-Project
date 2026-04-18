import React from 'react';
import Sidebar from '../components/Navigation/Sidebar';
import CreateButton from '../components/CreateButton/CreateButton';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <CreateButton />
    </div>
  );
};

export default MainLayout;
