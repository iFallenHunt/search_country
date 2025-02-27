import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, onRegionChange }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-responsive">
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('filters.byName')}
            className="input-primary pl-10"
          />
          <FaSearch 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </form>

      <select
        onChange={(e) => onRegionChange(e.target.value)}
        className="input-primary sm:max-w-[200px]"
        aria-label={t('filters.byRegion')}
      >
        <option value="">{t('filters.byRegion')}</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar; 