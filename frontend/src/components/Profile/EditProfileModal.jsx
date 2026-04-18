import React, { useState } from 'react';
import { X, Camera, User, Image as ImageIcon, Trash2, Plus } from 'lucide-react';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || '',
    coverPhoto: user?.coverPhoto || ''
  });
  const [preview, setPreview] = useState(user?.profilePicture || '');
  const [coverPreview, setCoverPreview] = useState(user?.coverPhoto || '');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFormData({ ...formData, profilePicture: previewUrl });
    }
  };

  const handleCoverSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
      setFormData({ ...formData, coverPhoto: previewUrl });
    }
  };

  const removeCover = () => {
    setCoverPreview('');
    setFormData({ ...formData, coverPhoto: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-profile-modal">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {/* Cover Photo Section */}
          <div className="cover-section">
            <label className="cover-upload-label">
              <div className="cover-upload-container">
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover" className="cover-preview" />
                ) : (
                  <div className="cover-placeholder">
                    <ImageIcon size={40} />
                    <span>Add Cover Photo</span>
                  </div>
                )}
                <div className="cover-overlay">
                  <Camera size={24} />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverSelect}
                className="hidden"
              />
            </label>
            {coverPreview && (
              <button
                type="button"
                onClick={removeCover}
                className="remove-cover-btn"
              >
                <Trash2 size={16} /> Remove Cover
              </button>
            )}
          </div>

          {/* Profile Picture Section */}
          <div className="form-section profile-picture-form-section">
            <div className="avatar-container">
              <label className="profile-picture-section">
                <div className="avatar-upload">
                  {preview ? (
                    <img src={preview} alt="Profile" className="avatar-preview" />
                  ) : (
                    <div className="avatar-placeholder">
                      <User size={40} />
                    </div>
                  )}
                  <div className="avatar-overlay">
                    <Camera size={20} />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
              <div className="avatar-info">
                <p className="avatar-title">Profile Photo</p>
                <p className="avatar-subtitle">Recommended: Square image, at least 400x400px</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="input"
                placeholder="@username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="input textarea"
                placeholder="Tell us about yourself..."
                rows={4}
                maxLength={150}
              />
              <div className="char-count">
                {formData.bio.length}/150
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
