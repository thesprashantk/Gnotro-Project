import React, { useState, useEffect, useMemo } from 'react';
import PostCard from '../../components/UI/PostCard';
import { postsAPI } from '../../services/api';
import './Discussion.css';

const DiscussionFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Fallback to empty array if API fails
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await postsAPI.like(postId);
      // Update the post in the local state
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleRepost = async (postId) => {
    try {
      const response = await postsAPI.repost(postId);
      // Update the post in the local state
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Error reposting:', error);
    }
  };

  const handleComment = async (postId, content) => {
    try {
      const response = await postsAPI.comment(postId, content);
      // Update the post in the local state
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const handleSave = async (postId) => {
    try {
      const response = await postsAPI.save(postId);
      // Update the post in the local state
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="discussion-feed-page">
      <div className="feed-header">
        <h2>Gnotro Discussions</h2>
        <p className="feed-subtitle">Join the conversation with the community</p>
      </div>
      <div className="posts-list">
        {loading ? (
          <div className="loading-state">Loading discussions...</div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <p>No discussions yet. Be the first to start a conversation!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              type="discussion"
              onLike={() => handleLike(post._id)}
              onRepost={() => handleRepost(post._id)}
              onComment={(content) => handleComment(post._id, content)}
              onSave={() => handleSave(post._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DiscussionFeed;
