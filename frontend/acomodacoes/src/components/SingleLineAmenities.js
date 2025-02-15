import React, { useState, useRef, useEffect } from 'react';
import { Box, Chip, Tooltip } from '@mui/material';

function SingleLineAmenities({ amenities, amenityIcons, maxChipWidth = 200 }) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);

  const [displayed, setDisplayed] = useState([]);
  const [excess, setExcess] = useState([]);

  useEffect(() => {
    if (!amenities || amenities.length === 0) {
      setDisplayed([]);
      setExcess([]);
      return;
    }
    setDisplayed([]);
    setExcess([]);

    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    let usedWidth = 0;

    const visible = [];
    const hidden = [];

    amenities.forEach((amenity) => {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.visibility = 'hidden';
      div.style.whiteSpace = 'nowrap';
      div.style.maxWidth = `${maxChipWidth}px`;
      div.style.overflow = 'hidden';
      div.textContent = amenity;
      measureRef.current.appendChild(div);
      const chipWidth = div.offsetWidth + 50; 
      measureRef.current.removeChild(div);

      if (usedWidth + chipWidth <= containerWidth) {
        usedWidth += chipWidth;
        visible.push(amenity);
      } else {
        hidden.push(amenity);
      }
    });

    setDisplayed(visible);
    setExcess(hidden);
  }, [amenities, maxChipWidth]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        display: 'flex',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Box ref={measureRef} sx={{ position: 'absolute', visibility: 'hidden' }} />

      {displayed.map((amenity) => {
        const key = amenity.toLowerCase();
        return (
          <Tooltip key={amenity} title={amenity}>
            <Chip
              label={amenity}
              icon={amenityIcons[key] || null}
              size="small"
              color="primary"
              sx={{
                maxWidth: maxChipWidth,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                mr: 0.5
              }}
            />
          </Tooltip>
        );
      })}

      {excess.length > 0 && (
        <Tooltip title={excess.join(', ')}>
          <Chip
            label={`+${excess.length}`}
            size="small"
            color="default"
            sx={{ ml: 0.5 }}
          />
        </Tooltip>
      )}
    </Box>
  );
}

export default SingleLineAmenities;
