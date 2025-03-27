import axios from 'axios';
import { Category, Instance, SearchParams, SearchResponse } from '../types/api';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const searchArticles = async (params: SearchParams): Promise<SearchResponse> => {
  const response = await api.get('/search/articles/', { params });
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories/');
  return response.data.results || [];
};

export const getInstance = async (): Promise<Instance> => {
  const response = await api.get('/instance/');
  
  return {
    ...response.data,
    locales: response.data.locales
  };
}; 