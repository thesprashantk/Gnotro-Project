import React, { useMemo, useState } from 'react';
import PostCard from '../../components/UI/PostCard';
import SearchBar from '../../components/Navigation/SearchBar';
import { addSearchHistoryItem } from '../../utils/searchHistory';
import { useContent } from '../../context/ContentContext';
import './Discuss.css';

const Discuss = () => {
  const { discussions } = useContent();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiscussions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return discussions;

    return discussions.filter(post => {
      return (
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.content.toLowerCase().includes(normalizedQuery) ||
        post.author.username.toLowerCase().includes(normalizedQuery) ||
        (post.author.fullName?.toLowerCase() || '').includes(normalizedQuery)
      );
    });
  }, [discussions, searchQuery]);

  return (
    <div className="discuss-page">
      <div className="discuss-feed">
        <SearchBar
          hideFilters
          placeholder="Search questions..."
          onSearch={setSearchQuery}
        />
        <div className="feed-header">
          <h2>Gnotro Discuss</h2>
          <p className="feed-subtitle">Community questions & threaded discussions</p>
        </div>
        <div className="posts-list">
          {filteredDiscussions.map(post => (
            <PostCard
              key={post._id}
              post={post}
              type="discussion"
              onResultClick={() => addSearchHistoryItem({
                query: searchQuery,
                page: 'Discuss',
                postTitle: post.title,
                type: 'Discussion',
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discuss;
