import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, onRegionChange, onLanguageChange, totalCountries }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const languages = [
    'English',
    'Spanish',
    'Portuguese',
    'French',
    'German',
    'Italian',
    'Dutch',
    'Russian',
    'Arabic',
    'Chinese',
    'Japanese',
    'Korean'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-responsive">
      <div className="flex-1 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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

        <div className="text-sm text-textLight dark:text-textDark whitespace-nowrap">
          {t('filters.totalCountries', { count: totalCountries })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
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

        <select
          onChange={(e) => onLanguageChange(e.target.value)}
          className="input-primary sm:max-w-[200px]"
          aria-label={t('filters.byLanguage')}
        >
          <option value="">{t('filters.byLanguage')}</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar; 