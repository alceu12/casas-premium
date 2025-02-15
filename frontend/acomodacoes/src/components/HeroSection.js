import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Autocomplete 
} from '@mui/material';
import AcomodacaoService from '../services/AcomodacaoService';

const HeroSection = ({ onSearch }) => {
  const [localizacao, setLocalizacao] = useState('');
  const [tipoImovel, setTipoImovel] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const data = await AcomodacaoService.fetchCities();
      setCities(data);
    };
    fetchCities();
  }, []);

  const handleSearchClick = () => {
    onSearch('cidade', localizacao);
    onSearch('tipo_imovel', tipoImovel);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 'auto', md: '50vh' },
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?home,interior)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay com segunda imagem e transparência */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://ventramelidecor.com.br/wp-content/uploads/2024/05/casa-moderna-linhas-retas.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6,
        }}
      />
      
      {/* Conteúdo em primeiro plano */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#fff',
          textAlign: 'left',
          px: 2,
          py: { xs: 4, md: 0 },
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.8rem', md: '3rem' }
          }}
        >
          Encontre a Casa dos Seus Sonhos
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Conforto, segurança e qualidade para sua família.
        </Typography>
        
        <Paper sx={{ p: 2, maxWidth: 800, width: '100%' }} elevation={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={cities}
                value={localizacao}
                onChange={(event, newValue) => setLocalizacao(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Localização" variant="outlined" />
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Tipo de Imóvel</InputLabel>
                <Select
                  value={tipoImovel}
                  onChange={(e) => setTipoImovel(e.target.value)}
                  label="Tipo de Imóvel"
                >
                  <MenuItem value="">Qualquer</MenuItem>
                  <MenuItem value="Casa">Casa</MenuItem>
                  <MenuItem value="Apartamento">Apartamento</MenuItem>
                  <MenuItem value="Estúdio">Estúdio</MenuItem>
                  <MenuItem value="Loft">Loft</MenuItem>
                  <MenuItem value="Chalé">Chalé</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearchClick}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default HeroSection;
