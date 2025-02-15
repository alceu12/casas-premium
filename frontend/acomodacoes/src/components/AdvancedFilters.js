import React from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdvancedFilters = ({ filters, onFilterChange }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 280,
        p: 2,
        boxSizing: 'border-box',
        position: { xs: 'relative', md: 'sticky' },
        top: { md: 80 }
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filtros Avançados
      </Typography>
      
      {/* Accordion para Preço */}
      <Accordion defaultExpanded={isMdUp}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Preço (R$)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={filters.priceRange}
            onChange={(e, newValue) => onFilterChange('priceRange', newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </AccordionDetails>
      </Accordion>
      
      {/* Accordion para Avaliação */}
      <Accordion defaultExpanded={isMdUp}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Avaliação</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={filters.ratingRange}
            onChange={(e, newValue) => onFilterChange('ratingRange', newValue)}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={5}
          />
        </AccordionDetails>
      </Accordion>
      
      {/* Accordion para Quartos */}
      <Accordion defaultExpanded={isMdUp}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Quartos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {['1', '2', '3+', '4+'].map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={filters.rooms?.includes(option) || false}
                    onChange={() => {
                      const current = filters.rooms || [];
                      const newRooms = current.includes(option)
                        ? current.filter((r) => r !== option)
                        : [...current, option];
                      onFilterChange('rooms', newRooms);
                    }}
                  />
                }
                label={`${option} quartos`}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      
      {/* Accordion para Amenidades */}
      <Accordion defaultExpanded={isMdUp}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Outros Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {['Pet Friendly', 'Piscina', 'Estacionamento', 'Vista para o mar'].map((amenity) => (
              <FormControlLabel
                key={amenity}
                control={
                  <Checkbox
                    checked={filters.amenities?.includes(amenity) || false}
                    onChange={() => {
                      const current = filters.amenities || [];
                      const newAmenities = current.includes(amenity)
                        ? current.filter((a) => a !== amenity)
                        : [...current, amenity];
                      onFilterChange('amenities', newAmenities);
                    }}
                  />
                }
                label={amenity}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AdvancedFilters;
