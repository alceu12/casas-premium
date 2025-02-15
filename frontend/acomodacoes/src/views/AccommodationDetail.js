import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid,
  Rating,
  Chip,
  TextField,
  Alert
} from '@mui/material';
import AcomodacaoService from '../services/AcomodacaoService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AccommodationDetail = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sentMessage, setSentMessage] = useState(false);

  useEffect(() => {
    const loadAccommodation = async () => {
      try {
        const data = await AcomodacaoService.fetchAccommodationById(id);
        setAccommodation(data);
      } catch (error) {
        console.error("Erro ao carregar detalhes da acomodação", error);
      } finally {
        setLoading(false);
      }
    };

    loadAccommodation();
  }, [id]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Mensagem enviada:", { contactName, contactEmail, contactMessage });
    setSentMessage(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => setSentMessage(false), 3000);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!accommodation) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Acomodação não encontrada.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Voltar
      </Button>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={accommodation.imagem}
              alt={accommodation.nome}
              sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {accommodation.nome}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              {accommodation.cidade}, {accommodation.estado} • {accommodation.tipo_imovel}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Preço: R$ {accommodation.preco_noite} / noite
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={accommodation.avaliacao || 0} precision={0.1} readOnly />
              <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                {accommodation.avaliacao ? accommodation.avaliacao.toFixed(1) : 'N/A'}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {accommodation.descricao}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Quartos: {accommodation.quartos} | Banheiros: {accommodation.banheiros}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(accommodation.amenities || []).map((amenity) => (
                <Chip key={amenity} label={amenity} color="primary" />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Seção de Contato */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Entre em Contato
        </Typography>
        {sentMessage && <Alert severity="success" sx={{ mb: 2 }}>Mensagem enviada com sucesso!</Alert>}
        <Box component="form" onSubmit={handleContactSubmit}>
          <TextField
            label="Seu Nome"
            variant="outlined"
            fullWidth
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Seu E-mail"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mensagem"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Enviar Mensagem
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccommodationDetail;
