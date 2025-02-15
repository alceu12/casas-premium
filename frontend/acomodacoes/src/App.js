import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import Favorites from './views/Favorites';
import AccommodationDetail from './views/AccommodationDetail';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <Header
        favoritesCount={favorites.length}
        onToggleFavorites={() => { }}
      />
      <div style={{ marginTop: 80 }}>
        <Routes>
          <Route path="/" element={<Home favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/favoritos" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/acomodacoes/:id" element={<AccommodationDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
