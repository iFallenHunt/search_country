import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import { getCountries, searchCountries, getCountryByRegion, getCountryByLanguage } from '../services/api';

const Home = () => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState({
    type: null, // 'search', 'region', ou 'language'
    value: null
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const data = await getCountries();
      setCountries(data);
      setError(null);
      setActiveFilter({ type: null, value: null });
    } catch (err) {
      setError('Error fetching countries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchCountries();
      return;
    }

    try {
      setLoading(true);
      const data = await searchCountries(searchTerm);
      setCountries(data);
      setError(null);
      setActiveFilter({ type: 'search', value: searchTerm });
    } catch (err) {
      setError('Error searching countries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = async (region) => {
    if (!region) {
      fetchCountries();
      return;
    }

    try {
      setLoading(true);
      const data = await getCountryByRegion(region);
      setCountries(data);
      setError(null);
      setActiveFilter({ type: 'region', value: region });
    } catch (err) {
      setError('Error filtering by region');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (language) => {
    if (!language) {
      fetchCountries();
      return;
    }

    try {
      setLoading(true);
      const data = await getCountryByLanguage(language);
      setCountries(data);
      setError(null);
      setActiveFilter({ type: 'language', value: language });
    } catch (err) {
      setError('Error filtering by language');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="text-lg sm:text-xl text-textLight dark:text-textDark">
          {t('common.loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="text-lg sm:text-xl text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 container-responsive py-4 sm:py-6">
      <SearchBar 
        onSearch={handleSearch} 
        onRegionChange={handleRegionChange}
        onLanguageChange={handleLanguageChange}
        totalCountries={countries.length}
      />
      
      {activeFilter.type && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-textLight dark:text-textDark">
            {activeFilter.type === 'search' && `${t('filters.searchResults')}: "${activeFilter.value}"`}
            {activeFilter.type === 'region' && `${t('filters.regionResults')}: ${activeFilter.value}`}
            {activeFilter.type === 'language' && `${t('filters.languageResults')}: ${activeFilter.value}`}
          </span>
          <button
            onClick={fetchCountries}
            className="text-sm text-primary dark:text-textDark hover:underline"
          >
            {t('filters.clearFilter')}
          </button>
        </div>
      )}
      
      <AnimatePresence>
        <motion.div
          className="grid-responsive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </motion.div>
      </AnimatePresence>

      {countries.length === 0 && (
        <div className="flex justify-center items-center mt-8">
          <p className="text-lg sm:text-xl text-textLight dark:text-textDark">
            {t('filters.noResults')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home; 