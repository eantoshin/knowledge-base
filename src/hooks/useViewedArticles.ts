import { useState, useEffect } from 'react';
import { ViewedArticle } from '../types/api';

const STORAGE_KEY = 'viewed_articles';

export const useViewedArticles = () => {
  const [viewedArticles, setViewedArticles] = useState<ViewedArticle[]>([]);

  // Загружаем прсомотренные статьи при монтировании
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setViewedArticles(JSON.parse(stored));
    }
  }, []);

  // Добавляем статью в просмотренные
  const markAsViewed = (articleId: number) => {
    const newViewedArticles = [
      ...viewedArticles.filter(article => article.id !== articleId),
      { id: articleId, timestamp: Date.now() }
    ];
    
    setViewedArticles(newViewedArticles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newViewedArticles));
  };

  // Проверяем, была ли статья просмотрена
  const isViewed = (articleId: number): boolean => {
    return viewedArticles.some(article => article.id === articleId);
  };

  return { viewedArticles, markAsViewed, isViewed };
}; 