import React, { useState } from 'react';
import { Plus, Edit3, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateButton.css';

const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCreate = (type) => {
    setIsOpen(false);
    if (type === 'article') navigate('/create/article');
    if (type === 'discuss') navigate('/create/discuss');
  };

  // Determine what options to show based on current route
  const currentPath = location.pathname;
  
  // Hide create button on these pages
  if (currentPath.includes('/explore') || 
      currentPath.includes('/ai') || 
      currentPath.includes('/messages') || 
      currentPath.includes('/profile')) {
    return null;
  }

  let showArticle = true;
  let showDiscuss = true;

  if (currentPath.includes('/discuss')) {
    showArticle = false;
  } else if (currentPath.includes('/article')) {
    showDiscuss = false;
  }

  return (
    <div className="create-button-container">
      {isOpen && (
        <div className="create-menu card glass">
          {showDiscuss && (
            <button className="create-menu-item" onClick={() => handleCreate('discuss')}>
              <div className="icon-wrapper bg-secondary">
                <MessageCircle size={18} />
              </div>
              <div className="item-text">
                <span className="title">Ask Question</span>
                <span className="subtitle">Start a discussion</span>
              </div>
            </button>
          )}
          
          {showArticle && (
            <button className="create-menu-item" onClick={() => handleCreate('article')}>
              <div className="icon-wrapper bg-secondary">
                <Edit3 size={18} />
              </div>
              <div className="item-text">
                <span className="title">Write Article</span>
                <span className="subtitle">Share your knowledge</span>
              </div>
            </button>
          )}
        </div>
      )}
      
      <button 
        className={`main-fab ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <Plus size={28} className="fab-icon" />
      </button>
    </div>
  );
};

export default CreateButton;
