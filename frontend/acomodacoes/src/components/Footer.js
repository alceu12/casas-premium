import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', p: 3, mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <Typography variant="h6">Casas Premium</Typography>
          <Typography variant="body2">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </Typography>
        </Box>
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <Link href="/" sx={{ mx: 1 }}>
            Início
          </Link>
          <Link href="#" sx={{ mx: 1 }}>
            Sobre
          </Link>
          <Link href="#" sx={{ mx: 1 }}>
            FAQ
          </Link>
          <Link href="#" sx={{ mx: 1 }}>
            Contato
          </Link>
        </Box>
        <Box>
          <IconButton href="#">
            <FacebookIcon />
          </IconButton>
          <IconButton href="#">
            <TwitterIcon />
          </IconButton>
          <IconButton href="#">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
