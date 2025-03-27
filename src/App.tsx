import { useState } from 'react'
import { SearchForm } from './components/SearchForm'
import { SearchResults } from './components/SearchResults'
import { useViewedArticles } from './hooks/useViewedArticles'
import { searchArticles } from './services/api'
import { Article, SearchParams } from './types/api'
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { isViewed, markAsViewed } = useViewedArticles()

  const handleSearch = async (params: SearchParams) => {
    try {
      setIsLoading(true)
      const response = await searchArticles(params)
      setSearchResults(response.results)
    } catch (error) {
      console.error('Ошибка поиска:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleArticleClick = (article: Article) => {
    const currentLocale = navigator.language.startsWith('ru') ? 'ru' : 'en'
    const url = article.public_urls[currentLocale]

    markAsViewed(article.id)

    if (url) {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="app">
      <h1>Поиск по базе знаний Swarmica</h1>
      <SearchForm onSearch={handleSearch} />
      <SearchResults
        results={searchResults}
        isViewed={isViewed}
        onArticleClick={handleArticleClick}
        isLoading={isLoading}
      />
    </div>
  )
}

export default App
