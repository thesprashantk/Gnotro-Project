import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import './Create.css';

const CreateDiscuss = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addDiscussion } = useContent();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const wordCount = title.trim() === '' ? 0 : title.trim().split(/\s+/).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (wordCount > 30) { setError('Title must be 30 words or less.'); return; }
    if (!title.trim() || !content.trim()) { setError('Both title and explanation are required.'); return; }
    setLoading(true);

    const newDiscussion = {
      _id: `d-${Date.now()}`,
      author: {
        username: user?.username || 'gnotro_user',
        profilePicture: user?.profilePicture || '',
      },
      title: title.trim(),
      content: content.trim(),
      likes: [],
      reposts: [],
      comments: [],
      createdAt: new Date(),
    };

    addDiscussion(newDiscussion);
    setTimeout(() => {
      setLoading(false);
      navigate('/discuss');
    }, 400);
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <div className="create-header">
          <h2>Ask a Question</h2>
          <p className="create-subtitle">Start a discussion with the Gnotro community</p>
        </div>

        {error && <div className="create-error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <div className="label-row">
              <label>Question Title</label>
              <span className={`word-count ${wordCount > 30 ? 'over' : ''}`}>{wordCount}/30 words</span>
            </div>
            <input
              type="text"
              className="input"
              placeholder="What is your question? (max 30 words)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Detailed Explanation</label>
            <textarea
              className="input create-textarea"
              placeholder="Explain your question in detail. Include relevant context, what you've tried, and what you're expecting..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={10}
              required
            />
          </div>

          <div className="create-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : <><Send size={16} /> Post Question</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscuss;
