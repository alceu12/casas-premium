import axios from 'axios';

const API_URL = 'http://localhost:8000';

const fetchAcomodacoes = async (filters) => {
  const params = {};
  if (filters.cidade) params.cidade = filters.cidade;
  if (filters.estado) params.estado = filters.estado;
  if (filters.tipo_imovel) params.tipo_imovel = filters.tipo_imovel;
  if (filters.priceRange) {
    params.minPrice = filters.priceRange[0];
    params.maxPrice = filters.priceRange[1];
  }
  if (filters.ratingRange) {
    params.minRating = filters.ratingRange[0];
    params.maxRating = filters.ratingRange[1];
  }
  const response = await axios.get(`${API_URL}/acomodacoes`, { params });
  return response.data;
};

const fetchCities = async () => {
  try {
    const response = await axios.get(`${API_URL}/acomodacoes`);
    const data = response.data;
    const citiesSet = new Set();
    data.forEach((item) => {
      if (item.cidade) {
        citiesSet.add(item.cidade);
      }
    });
    return Array.from(citiesSet);
  } catch (error) {
    console.error("Erro ao buscar cidades", error);
    return [];
  }
};

const fetchAccommodationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/acomodacoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar acomodação por ID", error);
    throw error;
  }
};

export default { fetchAcomodacoes, fetchCities, fetchAccommodationById };
