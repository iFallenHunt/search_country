import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';

const CountryCard = ({ country }) => {
  const { t } = useTranslation();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCountryFavorite = isFavorite(country.cca3);

  const handleFavoriteClick = () => {
    if (isCountryFavorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card-responsive"
    >
      <div className="relative aspect-video">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-elementDark rounded-full shadow-md hover:scale-110 transition-transform duration-200"
          aria-label={isCountryFavorite ? t('country.removeFromFavorites') : t('country.addToFavorites')}
        >
          {isCountryFavorite ? (
            <FaHeart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          ) : (
            <FaRegHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-textLight dark:text-textDark line-clamp-2">
          {country.name.common}
        </h2>
        
        <div className="space-y-2 text-sm sm:text-base text-textLight dark:text-textDark">
          <p className="flex justify-between">
            <span className="font-semibold">{t('country.capital')}:</span>
            <span className="text-right">{country.capital?.[0] || 'N/A'}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">{t('country.region')}:</span>
            <span className="text-right">{country.region}</span>
          </p>
          <p className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-semibold">{t('country.languages')}:</span>
            <span className="text-right">
              {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryCard; 