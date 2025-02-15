import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Typography,
  IconButton,
  Button,
  Rating,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import OutdoorGrill from '@mui/icons-material/OutdoorGrill';
import SingleLineAmenities from './SingleLineAmenities';

const amenityIcons = {
  'wi-fi': <WifiIcon fontSize="small" />,
  'piscina': <PoolIcon fontSize="small" />,
  'ar-condicionado': <AcUnitIcon fontSize="small" />,
  'pet friendly': <PetsIcon fontSize="small" />,
  'estacionamento': <LocalParkingIcon fontSize="small" />,
  'vista para o mar': <BeachAccessIcon fontSize="small" />,
  'cozinha equipada': <KitchenIcon fontSize="small" />,
  'lareira': <FireplaceIcon fontSize="small" />,
  'churrasqueira': <OutdoorGrill fontSize="small" />
};

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const images = property.images && property.images.length > 0 ? property.images : [property.imagem];

  const handleViewMore = () => {
    navigate(`/acomodacoes/${property.id}`);
  };

  return (
    <Card
      sx={{
        width: 340,
        height: 520,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.01)' }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ height: 200 }}
          image={hovered && images[1] ? images[1] : images[0]}
          alt={property.nome}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://loremflickr.com/800/600/house';
          }}
        />
        <IconButton
          onClick={() => onToggleFavorite(property.id)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
          }}
        >
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1, overflow: 'hidden' }}>
        <Tooltip title={property.nome}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', minHeight: 50 }}>
            {property.nome}
          </Typography>
        </Tooltip>

        <Tooltip title={`${property.cidade}, ${property.estado} • ${property.tipo_imovel}`}>
          <Typography variant="body2" color="text.secondary" sx={{ minHeight: 24 }}>
            {property.cidade}, {property.estado} • {property.tipo_imovel}
          </Typography>
        </Tooltip>

        <Box sx={{ minHeight: 40 }}>
          <Typography variant="body1">Preço: R$ {property.preco_noite}</Typography>
          <Typography variant="body2" color="text.secondary">
            Quartos: {property.quartos} | Banheiros: {property.banheiros}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: 24 }}>
          <Rating value={property.avaliacao || 0} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {property.avaliacao ? property.avaliacao.toFixed(1) : 'N/A'}
          </Typography>
        </Box>

        {property.amenities && property.amenities.length > 0 && (
          <SingleLineAmenities
            amenities={property.amenities}
            amenityIcons={amenityIcons}
            maxChipWidth={140}
          />
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', minHeight: 50 }}>
        <Button variant="outlined" size="small" onClick={handleViewMore}>
          VER MAIS
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
