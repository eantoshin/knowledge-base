import React, { useState, useEffect } from 'react';
import { Category, SearchFormProps } from '../types/api';
import { getCategories, getInstance } from '../services/api';

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [locales, setLocales] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedLocale, setSelectedLocale] = useState<string | undefined>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, instanceData] = await Promise.all([
          getCategories(),
          getInstance()
        ]);

        setCategories(categoriesData);
        setLocales(instanceData.locales);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        
        setCategories([]);
        setLocales([]);
      }
    };
    
    loadData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      search: query,
      category_id: selectedCategory,
      locale: selectedLocale
    });
  };

  // Использеум текущую локаль браузера или ru по умолчанию
  const currentLocale = navigator.language.startsWith('ru') ? 'ru' : 'en';

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по статьям..."
        required
      />
      
      <select
        value={selectedCategory || ''}
        onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
      >
        <option value="">Все категории</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name[currentLocale]}
          </option>
        ))}
      </select>

      <select
        value={selectedLocale || ''}
        onChange={(e) => setSelectedLocale(e.target.value || undefined)}
      >
        <option value="">Все языки</option>
        {locales.map(locale => (
          <option key={locale} value={locale}>
            {locale.toUpperCase()}
          </option>
        ))}
      </select>

      <button type="submit">Поиск</button>
    </form>
  );
}; 