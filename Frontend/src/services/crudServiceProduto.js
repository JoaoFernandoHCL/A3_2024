import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Função para obter o token do localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Função para configurar os headers com o token de autenticação
const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProdutos = async () => {
  try {
    const response = await axios.get(`${API_URL}/produtos`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching produtos:", error);
    throw error;
  }
};

export const getProdutoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/produtos/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Error fetching produto with id ${id}:`, error);
    throw error;
  }
};

export const createProduto = async (produtoData) => {
  try {
    const response = await axios.post(`${API_URL}/produtos`, produtoData, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error creating produto:", error);
    throw error;
  }
};

export const updateProduto = async (id, produtoData) => {
  try {
    const response = await axios.patch(`${API_URL}/produtos/${id}`, produtoData, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error updating produto:", error);
    throw error;
  }
};

export const deleteProduto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/produtos/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error deleting produto:", error);
    throw error;
  }
};
