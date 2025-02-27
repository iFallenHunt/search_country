import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaGlobe } from 'react-icons/fa';
import { Menu } from '@headlessui/react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <nav className="sticky top-0 z-50 bg-elementLight dark:bg-elementDark shadow-md">
      <div className="nav-responsive">
        <Link 
          to="/" 
          className="text-xl font-bold text-primary dark:text-textDark py-2 sm:py-0"
        >
          Countries App
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/favorites"
            className="text-sm sm:text-base text-primary dark:text-textDark hover:text-gray-600 dark:hover:text-gray-300"
          >
            {t('common.favorites')}
          </Link>

          <Menu as="div" className="relative">
            <Menu.Button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
              <FaGlobe className="w-5 h-5 text-primary dark:text-textDark" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-elementDark ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } w-full px-4 py-2 text-sm text-left text-primary dark:text-textDark`}
                    >
                      English
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => changeLanguage('pt-BR')}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } w-full px-4 py-2 text-sm text-left text-primary dark:text-textDark`}
                    >
                      Português
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label={darkMode ? t('common.lightMode') : t('common.darkMode')}
          >
            {darkMode ? (
              <FaSun className="w-5 h-5 text-primary dark:text-textDark" />
            ) : (
              <FaMoon className="w-5 h-5 text-primary dark:text-textDark" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 