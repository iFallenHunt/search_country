import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './i18n';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div className="min-h-screen bg-bgLight dark:bg-bgDark">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
