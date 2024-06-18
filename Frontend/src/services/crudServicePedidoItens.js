import axios from "axios";

const API_URL = "http://localhost:3001/pedido-itens";

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

// Função para obter todos os itens de pedidos
export const getPedidoItens = async () => {
  try {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching pedido itens:", error);
    throw error;
  }
};

// Função para obter todos os itens de um pedido específico
export const getPedidoItensByPedidoId = async (pedidoId) => {
  try {
    const response = await axios.get(`${API_URL}/${pedidoId}`, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Error fetching pedido itens for pedido ${pedidoId}:`, error);
    throw error;
  }
};

// Função para obter um item de pedido específico
export const getPedidoItem = async (pedidoId, produtoId) => {
  try {
    const response = await axios.get(`${API_URL}/${pedidoId}/${produtoId}`, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Error fetching pedido item with pedidoId ${pedidoId} and produtoId ${produtoId}:`, error);
    throw error;
  }
};

// Função para criar um novo item de pedido
export const createPedidoItem = async (pedidoItemData) => {
  try {
    const response = await axios.post(API_URL, pedidoItemData, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error creating pedido item:", error);
    throw error;
  }
};

// Função para atualizar um item de pedido específico
export const updatePedidoItem = async (pedidoId, produtoId, pedidoItemData) => {
  try {
    const response = await axios.patch(`${API_URL}/${pedidoId}/${produtoId}`, pedidoItemData, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Error updating pedido item with pedidoId ${pedidoId} and produtoId ${produtoId}:`, error);
    throw error;
  }
};

// Função para remover um item de pedido específico
export const deletePedidoItem = async (pedidoId, produtoId) => {
  try {
    await axios.delete(`${API_URL}/${pedidoId}/${produtoId}`, getConfig());
  } catch (error) {
    console.error(`Error deleting pedido item with pedidoId ${pedidoId} and produtoId ${produtoId}:`, error);
    throw error;
  }
};