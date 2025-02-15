import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import HeroSection from '../components/HeroSection';
import AdvancedFilters from '../components/AdvancedFilters';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import AcomodacaoService from '../services/AcomodacaoService';

const Home = ({ favoritesView = false, favorites, setFavorites }) => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    cidade: '',
    estado: '',
    tipo_imovel: '',
    priceRange: [0, 1000],
    ratingRange: [0, 5],
    rooms: [],
    amenities: [],
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await AcomodacaoService.fetchAcomodacoes({
          cidade: filters.cidade,
          estado: filters.estado,
          tipo_imovel: filters.tipo_imovel,
        });
        setProperties(data);
      } catch (error) {
        console.error('Erro ao carregar propriedades', error);
      }
    };
    loadProperties();
  }, [filters.cidade, filters.estado, filters.tipo_imovel]);
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const filteredProperties = properties.filter((prop) => {
    let match = true;
    if (filters.cidade && !prop.cidade.toLowerCase().includes(filters.cidade.toLowerCase()))
      match = false;
    if (filters.estado && !prop.estado.toLowerCase().includes(filters.estado.toLowerCase()))
      match = false;
    if (
      filters.tipo_imovel &&
      filters.tipo_imovel.trim() !== '' &&
      !prop.tipo_imovel.toLowerCase().includes(filters.tipo_imovel.toLowerCase())
    )
      match = false;
    if (prop.preco_noite < filters.priceRange[0] || prop.preco_noite > filters.priceRange[1])
      match = false;
    if ((prop.avaliacao || 0) < filters.ratingRange[0] || (prop.avaliacao || 0) > filters.ratingRange[1])
      match = false;
    if (filters.rooms && filters.rooms.length > 0) {
      const roomMatch = filters.rooms.some((r) =>
        r.endsWith('+') ? prop.quartos >= parseInt(r) : String(prop.quartos) === r
      );
      if (!roomMatch) match = false;
    }
    if (filters.amenities && filters.amenities.length > 0) {
      const selectedAmenities = filters.amenities.map(a => a.trim().toLowerCase());
      const propertyAmenities = (prop.amenities || []).map(a => a.trim().toLowerCase());
      const amenitiesMatch = selectedAmenities.every(a => propertyAmenities.includes(a));
      if (!amenitiesMatch) match = false;
    }
    return match;
  });
  const finalProperties = favoritesView
    ? filteredProperties.filter(prop => favorites.includes(prop.id))
    : filteredProperties;

  const visibleProperties = finalProperties.slice(0, page * itemsPerPage);

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

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleHeroSearch = (field, value) => {
    handleFilterChange(field, value);
  };

  const handleViewMore = (property) => {
    console.log('Ver mais:', property);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Box>
      <HeroSection onSearch={handleHeroSearch} />
      {visibleProperties.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Infelizmente, não temos imóveis disponíveis nesse local. Procure em lugares próximos.
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 4, px: 2 }}>
        <AdvancedFilters filters={filters} onFilterChange={handleFilterChange} />
        <Box sx={{ flexGrow: 1, ml: { sm: 2 }, mt: { xs: 2, sm: 0 } }}>
          <Grid container spacing={3}>
            {visibleProperties.map((prop) => (
              <Grid item xs={12} sm={6} md={4} key={prop.id}>
                <PropertyCard
                  property={prop}
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={toggleFavorite}
                  onViewMore={handleViewMore}
                />
              </Grid>
            ))}
          </Grid>
          {visibleProperties.length < finalProperties.length && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="contained" onClick={handleLoadMore}>
                Carregar Mais
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
