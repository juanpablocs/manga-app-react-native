import { useState, useEffect } from 'react';
import { searchManga } from '../api/jikanApi';
import { Manga } from '../types/jikan';

/**
 * Custom hook for search functionality
 * @returns Search state and functions
 */
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await searchManga(searchQuery);
        setResults(response.data || []);
      } catch (err) {
        setError('Error searching manga. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  return {
    searchQuery,
    results,
    loading,
    error,
    handleSearch,
    clearSearch,
  };
};
