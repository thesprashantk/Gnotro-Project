import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ hideFilters = false, onSearch = () => {}, placeholder = 'Search...' }) => {
  const [filter, setFilter] = useState('All Content');
  const [query, setQuery] = useState('');

  const filters = ['All Content', 'Article', 'Discussion', 'User'];

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder={placeholder} 
          value={query}
          onChange={handleInput}
          className="search-input"
        />
      </div>
      {!hideFilters && (
        <div className="search-filters">
          {filters.map(f => (
            <button 
              key={f} 
              className={`filter-badge ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
