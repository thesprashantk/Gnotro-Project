import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Search } from 'lucide-react';
import { getSearchHistory, clearSearchHistory } from '../../utils/searchHistory';
import './Explore.css';

const Explore = () => {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const allHistory = getSearchHistory();
    setHistory(allHistory);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const filtered = history.filter(item => 
        item.query.toLowerCase().includes(query.toLowerCase()) ||
        item.page.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  const handleClear = () => {
    clearSearchHistory();
    setHistory([]);
    setSearchQuery('');
    setFilteredResults([]);
  };

  // Get last 5 searches
  const lastSearches = history.slice(0, 5);

  return (
    <div className="explore-page">
      <div className="explore-header-top">
        <h2>Explore</h2>
        <button
          className="clear-history-btn"
          onClick={handleClear}
          disabled={history.length === 0}
          title="Clear search history"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="explore-search-container">
        <Search size={18} className="search-icon-outside" />
        <input
          type="text"
          placeholder="Search everything..."
          value={searchQuery}
          onChange={handleSearch}
          className="explore-search-input-slim"
        />
      </div>

      {/* Search Results */}
      {searchQuery.trim() && filteredResults.length > 0 && (
        <div className="search-results-section">
          <h3 className="section-title">Search Results ({filteredResults.length})</h3>
          <div className="history-list">
            {filteredResults.map((item, idx) => (
              <div key={idx} className="history-item">
                <div className="history-meta">
                  <span className="history-query">{item.query}</span>
                  <span className="history-tag">{item.page}</span>
                </div>
                <div className="history-details">
                  <span>{item.type}</span>
                  {item.postTitle && <span className="history-post-title">Clicked: {item.postTitle}</span>}
                  <span className="history-time">{formatDistanceToNow(new Date(item.clickedAt), { addSuffix: true })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchQuery.trim() && filteredResults.length === 0 && (
        <div className="search-empty">
          <p>No results found for "{searchQuery}"</p>
        </div>
      )}

      {/* Last Searches */}
      {!searchQuery.trim() && history.length > 0 && (
        <div className="last-searches-section">
          <h3 className="section-title">Recent Searches</h3>
          <div className="history-list">
            {lastSearches.map((item, idx) => (
              <div key={idx} className="history-item">
                <div className="history-meta">
                  <span className="history-query">{item.query}</span>
                  <span className="history-tag">{item.page}</span>
                </div>
                <div className="history-details">
                  <span>{item.type}</span>
                  {item.postTitle && <span className="history-post-title">Clicked: {item.postTitle}</span>}
                  <span className="history-time">{formatDistanceToNow(new Date(item.clickedAt), { addSuffix: true })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length === 0 && !searchQuery && (
        <div className="history-empty">
          <p>No search history yet. Start searching in Discuss or Article to build your history.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
