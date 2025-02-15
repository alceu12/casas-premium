import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import AcomodacaoService from '../services/AcomodacaoService';

const Favorites = ({ favorites, setFavorites }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await AcomodacaoService.fetchAcomodacoes({});
        setProperties(data);
      } catch (error) {
        console.error('Erro ao carregar propriedades', error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const favoriteProperties = properties.filter(prop => favorites.includes(prop.id));

  const toggleFavorite = (id) => {
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(fav => fav !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Carregando favoritos...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        Imóveis Favoritados
      </Typography>
      {favoriteProperties.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Você não tem nenhum imóvel favoritado.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favoriteProperties.map(prop => (
            <Grid item xs={12} sm={6} md={4} key={prop.id}>
              <PropertyCard
                property={prop}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
                onViewMore={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Footer />
    </Box>
  );
};

export default Favorites;
