import React from 'react';
import { SearchResultsProps } from '../types/api';

export const SearchResults: React.FC<SearchResultsProps> = ({
  results = [],
  isViewed,
  onArticleClick,
  isLoading
}) => {
  // Используем текущую локаль браузера или ru по умолчанию
  const currentLocale = navigator.language.startsWith('ru') ? 'ru' : 'en';

  // Функция для фомратирования текста статьи
  const formatArticleText = (text: string) => {
    // Заменяем markdown заголовки на HTML
    const withoutMarkdown = text.replace(/^#\s(.+)$/gm, '<h4>$1</h4>');
    // Разбиваем на параграфы и брем только первые два
    const withParagraphs = withoutMarkdown
      .split('\n')
      .filter(Boolean)
      .slice(0, 2)  // Берем только первые 2 параргфа
      .join('\n');
    
    // Обрезаем текст до 200 символовв
    if (withParagraphs.length > 200) {
      return withParagraphs.substring(0, 200) + '...';
    }
    
    return withParagraphs;
  };

  if (isLoading) {
    return (
      <div className="search-results">
        <div className="loader">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="search-results">
      {!results?.length ? (
        <p>Нет результатов</p>
      ) : (
        <ul>
          {results.map(article => (
            <li 
              key={article.id}
              className={isViewed(article.id) ? 'viewed' : ''}
              onClick={() => onArticleClick(article)}
            >
              <h3>{article.highlight?.title || article.title[currentLocale]}</h3>
              <div className="article-content">
                {article.highlight?.body && 
                  <div 
                    className="article-paragraph"
                    dangerouslySetInnerHTML={{ __html: formatArticleText(article.highlight.body) }}
                  />
                }
              </div>
              {isViewed(article.id) && <span className="viewed-badge">Просмотрено</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 