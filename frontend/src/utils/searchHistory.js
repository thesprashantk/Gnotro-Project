const HISTORY_KEY = 'gnotro_search_history';
const MAX_HISTORY_ITEMS = 20;

export const getSearchHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
};

export const addSearchHistoryItem = (item) => {
  if (!item?.query || !item.query.trim()) return;

  const normalizedQuery = item.query.trim();
  const history = getSearchHistory();

  const existingIndex = history.findIndex(entry => entry.query === normalizedQuery && entry.page === item.page);

  const newItem = {
    query: normalizedQuery,
    page: item.page || 'Unknown',
    postTitle: item.postTitle || '',
    type: item.type || 'Search',
    clickedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    history.splice(existingIndex, 1);
  }

  history.unshift(newItem);

  if (history.length > MAX_HISTORY_ITEMS) {
    history.length = MAX_HISTORY_ITEMS;
  }

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save search history', err);
  }
};

export const clearSearchHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
