import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PostCard from '../../components/UI/PostCard';
import EditProfileModal from '../../components/Profile/EditProfileModal';
import { Settings, UserPlus, UserCheck } from 'lucide-react';
import './Profile.css';

const MOCK_USER_POSTS = [
  {
    _id: 'p1',
    author: { username: 'alice_dev', profilePicture: '' },
    title: 'What is the best way to manage global state in large React applications?',
    content: 'I have been working on a large-scale React app and finding it increasingly hard to manage state with just Context and useState.',
    likes: [1, 2],
    reposts: [],
    comments: [],
    createdAt: new Date(Date.now() - 3600000),
  },
];

const Profile = () => {
  const { user, setUser } = useAuth();
  const [tab, setTab] = useState('posts');
  const [followed, setFollowed] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditProfile = async (formData) => {
    // Simulate API call - in real app, this would call backend
    const updatedUser = {
      ...user,
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      profilePicture: formData.profilePicture || user.profilePicture,
      coverPhoto: formData.coverPhoto || user.coverPhoto
    };
    
    setUser(updatedUser);
    localStorage.setItem('gnotro_user', JSON.stringify(updatedUser));
  };

  // If viewing own profile vs another's
  const isOwn = true;
  const profileUser = user || { username: 'alice_dev', profilePicture: '', bio: 'Building cool things. Gnotro enthusiast.' };

  return (
    <div className="profile-page">
      {/* Cover */}
      <div 
        className="profile-cover" 
        style={profileUser.coverPhoto ? { backgroundImage: `url(${profileUser.coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      />

      <div className="profile-main">
        {/* Avatar */}
        <div className="profile-avatar-row">
          <div className="profile-avatar">
            {profileUser.profilePicture
              ? <img src={profileUser.profilePicture} alt={profileUser.username} />
              : <span>{profileUser.username?.[0]?.toUpperCase() || 'G'}</span>
            }
          </div>
          <div className="profile-actions">
            {isOwn
              ? <button className="btn btn-secondary" onClick={() => setShowEditModal(true)}><Settings size={16} /> Edit Profile</button>
              : (
                <button
                  className={`btn ${followed ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => setFollowed(!followed)}
                >
                  {followed ? <><UserCheck size={16} /> Following</> : <><UserPlus size={16} /> Follow</>}
                </button>
              )
            }
          </div>
        </div>

        {/* Info */}
        <div className="profile-info">
          <h2 className="profile-name">@{profileUser.username}</h2>
          <p className="profile-bio">{profileUser.bio || 'No bio yet.'}</p>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          {['posts', 'articles', 'saved'].map(t => (
            <button
              key={t}
              className={`profile-tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="profile-content">
          {tab === 'posts' && MOCK_USER_POSTS.map(p =>
            <PostCard key={p._id} post={p} type="discussion" />
          )}
          {tab === 'articles' && (
            <div className="empty-state">
              <p>No articles yet.</p>
            </div>
          )}
          {tab === 'saved' && (
            <div className="empty-state">
              <p>Nothing saved yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={profileUser}
        onSave={handleEditProfile}
      />
    </div>
  );
};

export default Profile;
