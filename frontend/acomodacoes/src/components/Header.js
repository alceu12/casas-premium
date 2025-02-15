import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = ({ favoritesCount }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToFavorites = () => {
    navigate('/favoritos');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff', color: '#333', boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer'
          }}
          onClick={handleGoHome}
        >
          <img src={Logo} alt="Logo" style={{ height: 40 }} />
          <Typography variant="h6" noWrap>
            Casas Premium
          </Typography>
        </Box>
        <IconButton onClick={handleGoToFavorites} color="inherit">
          <Badge badgeContent={favoritesCount} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
