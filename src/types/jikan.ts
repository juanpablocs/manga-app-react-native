/**
 * Types for Jikan API responses
 */

export interface MangaImage {
  jpg?: {
    image_url?: string;
    small_image_url?: string;
    large_image_url?: string;
  };
  webp?: {
    image_url?: string;
    small_image_url?: string;
    large_image_url?: string;
  };
}

export interface Manga {
  mal_id: number;
  url?: string;
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  type?: string;
  chapters?: number;
  volumes?: number;
  status?: string;
  publishing?: boolean;
  published?: {
    from?: string;
    to?: string;
    prop?: {
      from?: {
        day?: number;
        month?: number;
        year?: number;
      };
      to?: {
        day?: number;
        month?: number;
        year?: number;
      };
    };
    string?: string;
  };
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  background?: string;
  authors?: Array<{
    mal_id?: number;
    type?: string;
    name?: string;
    url?: string;
  }>;
  serializations?: Array<{
    mal_id?: number;
    type?: string;
    name?: string;
    url?: string;
  }>;
  genres?: Array<{
    mal_id?: number;
    type?: string;
    name?: string;
    url?: string;
  }>;
  explicit_genres?: Array<{
    mal_id?: number;
    type?: string;
    name?: string;
    url?: string;
  }>;
  themes?: Array<{
    mal_id?: number;
    type?: string;
    name?: string;
    url?: string;
  }>;
  demographics?: Array<{
    mal_id?: number;
    type?: string;
    name?: string;
    url?: string;
  }>;
  images?: MangaImage;
}

export interface JikanResponse<T> {
  data: T;
  pagination?: {
    last_visible_page?: number;
    has_next_page?: boolean;
    current_page?: number;
    items?: {
      count?: number;
      total?: number;
      per_page?: number;
    };
  };
}

export interface MangaListResponse extends JikanResponse<Manga[]> {}

export interface MangaDetailResponse extends JikanResponse<Manga> {}

export interface TopMangaResponse extends JikanResponse<Manga[]> {}

export interface MangaRecommendationEntry {
  entry: Manga;
  url?: string;
  votes?: number;
}

export interface MangaRecommendationsResponse {
  data: MangaRecommendationEntry[];
}
