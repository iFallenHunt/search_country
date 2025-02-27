import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1'
});

export const getCountries = async () => {
  try {
    const response = await api.get('/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const searchCountries = async (name) => {
  try {
    const response = await api.get(`/name/${name}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error('Error searching countries:', error);
    throw error;
  }
};

export const getCountryByRegion = async (region) => {
  try {
    const response = await api.get(`/region/${region}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    throw error;
  }
};

export const getCountryByLanguage = async (language) => {
  try {
    // Como a API não tem endpoint direto para filtrar por idioma,
    // vamos buscar todos os países e filtrar no cliente
    const response = await api.get('/all');
    return response.data.filter(country => {
      if (!country.languages) return false;
      return Object.values(country.languages).some(lang => 
        lang.toLowerCase().includes(language.toLowerCase())
      );
    });
  } catch (error) {
    console.error('Error fetching countries by language:', error);
    throw error;
  }
}; 