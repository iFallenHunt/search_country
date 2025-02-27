import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import { getCountries, searchCountries, getCountryByRegion } from '../services/api';

const Home = () => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const data = await getCountries();
      setCountries(data);
      setError(null);
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
    } catch (err) {
      setError('Error filtering by region');
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
      <SearchBar onSearch={handleSearch} onRegionChange={handleRegionChange} />
      
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
            Nenhum país encontrado
          </p>
        </div>
      )}
    </div>
  );
};

export default Home; 