import React, { useMemo, useState } from 'react';
import SearchBar from '../../components/Navigation/SearchBar';
import PostCard from '../../components/UI/PostCard';
import { useContent } from '../../context/ContentContext';
import './Home.css';

const Home = () => {
  const { discussions, articles } = useContent();
  const [searchQuery, setSearchQuery] = useState('');

  const feedPosts = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    const combined = [
      ...discussions.map(item => ({ ...item, type: 'discussion' })),
      ...articles.map(item => ({ ...item, type: 'article' })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (!normalized) return combined;

    return combined.filter(post => {
      return (
        post.title.toLowerCase().includes(normalized) ||
        post.content.toLowerCase().includes(normalized) ||
        post.author.username.toLowerCase().includes(normalized) ||
        (post.author.fullName?.toLowerCase() || '').includes(normalized)
      );
    });
  }, [articles, discussions, searchQuery]);

  return (
    <div className="home-page">
      <div className="home-feed">
        <SearchBar onSearch={setSearchQuery} placeholder="Search the community..." />
        <div className="feed-header">
          <h2>Home</h2>
          <p className="feed-subtitle">Questions & Articles From Your Community.</p>
        </div>
        <div className="posts-list">
          {feedPosts.map(post => (
            <PostCard key={post._id} post={post} type={post.type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
