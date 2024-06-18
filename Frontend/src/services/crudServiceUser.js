import axios from "axios";
import { deletePedido, getPedidos } from "./crudServicePedidos";

const API_URL = "http://localhost:3001"; // Ensure this is the correct URL of your backend server

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

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
    try {
      const response = await axios.post("http://localhost:3001/user", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to handle in the component
    }
  };

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/user/${id}`, user, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    // Antes de deletar o usuário, vamos primeiro buscar todos os pedidos relacionados a ele
    let pedidosDoUsuario;
    try {
      pedidosDoUsuario = await getPedidosDoUsuario(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Se não houver pedidos relacionados ao usuário, não há necessidade de continuar
        pedidosDoUsuario = []; // Defina pedidosDoUsuario como um array vazio
      } else {
        throw error; // Rethrow qualquer outro erro
      }
    }

    // Agora podemos iterar sobre esses pedidos e deletá-los um por um
    await Promise.all(pedidosDoUsuario.map(async (pedido) => {
      await deletePedido(pedido.id_pedido); // Deletar o pedido
    }));

    // Agora que todos os pedidos relacionados foram deletados, podemos deletar o usuário em si
    const response = await axios.delete(`${API_URL}/user/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Função para obter todos os pedidos de um usuário específico
export const getPedidosDoUsuario = async (userId) => {
  try {
    // Obtenha todos os pedidos
    const pedidos = await getPedidos();

    // Filtrar pedidos relacionados ao usuário específico
    const pedidosDoUsuario = pedidos.filter(pedido => pedido.userId === userId);

    return pedidosDoUsuario;
  } catch (error) {
    console.error(`Error fetching pedidos for user ${userId}:`, error);
    throw error;
  }
};


export const getUserById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`, getConfig());
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };