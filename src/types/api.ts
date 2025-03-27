// Типы для API ответов
export interface Article {
  id: number;
  title: {
    en?: string;
    ru?: string;
  };
  public_urls: {
    en?: string;
    ru?: string;
  };
  highlight?: {
    title: string;
    body: string;
  };
}

interface LocalizedName {
  en: string;
  ru: string;
}

export interface Category {
  id: number;
  name: LocalizedName;
  public: boolean;
  image_path: string;
}

export interface Instance {
  locales: string[];  // массив строк ["en", "ru"]
}

export interface SearchResponse {
  results: Article[];
}

export interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchResultsProps {
  results: Article[];
  isViewed: (id: number) => boolean;
  onArticleClick: (article: Article) => void;
  isLoading: boolean;
}

// Интерфйс для паарметров поиска
export interface SearchParams {
  search: string;
  category_id?: number;
  locale?: string;
}

// Интерфейс для просмотренных статей в localStorage
export interface ViewedArticle {
  id: number;
  timestamp: number;
}
