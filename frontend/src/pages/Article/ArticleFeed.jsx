import React, { useState, useEffect, useMemo } from 'react';
import PostCard from '../../components/UI/PostCard';
import { articlesAPI } from '../../services/api';
import './Article.css';

const ArticleFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesAPI.getAll();
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Fallback to empty array if API fails
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return articles;

    return articles.filter(post => {
      return (
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.content.toLowerCase().includes(normalizedQuery) ||
        post.author.username.toLowerCase().includes(normalizedQuery) ||
        (post.author.fullName?.toLowerCase() || '').includes(normalizedQuery)
      );
    });
  }, [articles, searchQuery]);

  return (
    <div className="article-feed-page">
      <div className="feed-header">
        <h2>Gnotro Article</h2>
        <p className="feed-subtitle">In-depth articles from the community</p>
      </div>
      <div className="posts-list">
        {loading ? (
          <div className="loading-state">Loading articles...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="empty-state">
            <p>No articles found.</p>
          </div>
        ) : (
          filteredArticles.map(post => (
            <PostCard
              key={post._id}
              post={post}
              type="article"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleFeed;
