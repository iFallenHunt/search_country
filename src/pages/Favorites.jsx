import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import CountryCard from '../components/CountryCard';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="text-lg sm:text-xl text-textLight dark:text-textDark text-center">
          Nenhum país favorito ainda
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 container-responsive py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-textLight dark:text-textDark">
        {t('common.favorites')}
      </h1>
      
      <AnimatePresence>
        <motion.div
          className="grid-responsive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Favorites; 