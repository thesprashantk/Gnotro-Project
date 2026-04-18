import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Image as ImageIcon, Link as LinkIcon, Heading1, Heading2, Send, Quote
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import './Create.css';

const ToolbarButton = ({ onClick, title, active, children }) => (
  <button
    type="button"
    title={title}
    className={`toolbar-btn ${active ? 'active' : ''}`}
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
  >
    {children}
  </button>
);

const CreateArticle = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addArticle } = useContent();
  const editorRef = useRef(null);
  const imgRef = useRef();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) exec('insertImage', url);
  };

  const insertLink = () => {
    const url = prompt('Enter link URL:');
    if (url) exec('createLink', url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editorRef.current?.innerHTML || '';
    if (!title.trim()) { setError('Article title is required.'); return; }
    if (!content || content === '<br>') { setError('Article content cannot be empty.'); return; }
    setError('');
    setLoading(true);

    const newArticle = {
      _id: `a-${Date.now()}`,
      author: {
        username: user?.username || 'gnotro_user',
        fullName: user?.fullName || user?.username || 'Gnotro Author',
        profilePicture: user?.profilePicture || '',
      },
      title: title.trim(),
      content,
      coverImage: coverPreview || '',
      likes: [],
      reposts: [],
      comments: [],
      createdAt: new Date(),
    };

    addArticle(newArticle);
    setTimeout(() => {
      setLoading(false);
      navigate('/article');
    }, 400);
  };

  return (
    <div className="create-page">
      <div className="create-card article-editor">
        <div className="create-header">
          <h2>Write an Article</h2>
          <p className="create-subtitle">Share your knowledge with the Gnotro community</p>
        </div>

        {error && <div className="create-error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-form">
          {/* Title */}
          <div className="form-group">
            <label>Article Title</label>
            <input
              type="text"
              className="input article-title-input"
              placeholder="Give your article a clear, descriptive title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Cover Image */}
          <div className="form-group">
            <label>Cover Image</label>
            <div
              className={`cover-drop-zone ${coverPreview ? 'has-image' : ''}`}
              onClick={() => imgRef.current.click()}
            >
              {coverPreview
                ? <img src={coverPreview} alt="cover" className="cover-preview-img" />
                : <div className="cover-placeholder">
                    <ImageIcon size={28} />
                    <span>Click to add a cover image</span>
                  </div>
              }
            </div>
            <input type="file" ref={imgRef} hidden accept="image/*" onChange={handleCoverImage} />
          </div>

          {/* Rich Text Toolbar + Editor */}
          <div className="form-group">
            <label>Content</label>
            <div className="rich-editor-wrapper">
              {/* Toolbar */}
              <div className="editor-toolbar">
                <ToolbarButton onClick={() => exec('bold')} title="Bold"><Bold size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => exec('italic')} title="Italic"><Italic size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => exec('underline')} title="Underline"><Underline size={15} /></ToolbarButton>
                <div className="toolbar-sep" />
                <ToolbarButton onClick={() => exec('formatBlock', 'h1')} title="Heading 1"><Heading1 size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => exec('formatBlock', 'h2')} title="Heading 2"><Heading2 size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => exec('formatBlock', 'blockquote')} title="Quote"><Quote size={15} /></ToolbarButton>
                <div className="toolbar-sep" />
                <ToolbarButton onClick={() => exec('insertUnorderedList')} title="Bullet List"><List size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => exec('insertOrderedList')} title="Numbered List"><ListOrdered size={15} /></ToolbarButton>
                <div className="toolbar-sep" />
                <ToolbarButton onClick={() => exec('justifyLeft')} title="Align Left"><AlignLeft size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => exec('justifyCenter')} title="Align Center"><AlignCenter size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => exec('justifyRight')} title="Align Right"><AlignRight size={15} /></ToolbarButton>
                <div className="toolbar-sep" />
                <ToolbarButton onClick={insertImage} title="Insert Image"><ImageIcon size={15} /></ToolbarButton>
                <ToolbarButton onClick={insertLink} title="Insert Link"><LinkIcon size={15} /></ToolbarButton>
              </div>

              {/* Editable Canvas */}
              <div
                ref={editorRef}
                className="rich-editor"
                contentEditable
                suppressContentEditableWarning
                data-placeholder="Start writing your article here..."
              />
            </div>
          </div>

          <div className="create-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : <><Send size={16} /> Publish Article</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
