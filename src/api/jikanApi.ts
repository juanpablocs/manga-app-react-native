/**
 * API service for Jikan API
 */
import { MangaListResponse, MangaDetailResponse } from '../types/jikan';

const BASE_URL = 'https://api.jikan.moe/v4';

// Añadir un retraso para evitar límites de tasa de la API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Search for manga by query
 * @param query - Search query
 * @returns Promise with list of manga
 */
export const searchManga = async (query: string): Promise<MangaListResponse> => {
  try {
    if (!query || query.trim() === '') {
      return { data: [] };
    }
    
    const response = await fetch(`${BASE_URL}/manga?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching manga:', error);
    throw error;
  }
};

/**
 * Get manga details by ID
 * @param id - Manga ID
 * @returns Promise with manga details
 */
export const getMangaDetails = async (id: number): Promise<MangaDetailResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/manga/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting manga details:', error);
    throw error;
  }
};

/**
 * Get top manga
 * @param page - Page number (optional)
 * @param limit - Number of results per page (optional)
 * @returns Promise with list of top manga
 */
export const getTopManga = async (page: number = 1, limit: number = 10): Promise<MangaListResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/top/manga?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting top manga:', error);
    throw error;
  }
};

/**
 * Get manga recommendations
 * @param limit - Number of results (optional)
 * @returns Promise with list of recommended manga
 */
export const getMangaRecommendations = async (limit: number = 10): Promise<MangaListResponse> => {
  try {
    // Jikan API doesn't have a direct endpoint for recommendations,
    // so we're getting manga with high scores instead
    const response = await fetch(`${BASE_URL}/manga?order_by=score&sort=desc&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting manga recommendations:', error);
    throw error;
  }
};
