import axios from "axios";
import { getPedidoItensByPedidoId, deletePedidoItem } from "./crudServicePedidoItens"

const API_URL = "http://localhost:3001"; // Certifique-se de que este é o URL correto do seu servidor backend

export const getPedidos = async () => {
  try {
    const response = await axios.get(`${API_URL}/pedidos`);
    // Extrai os pedidos da resposta
    const pedidos = response.data.flatMap(user => 
      user.pedidos.map(pedido => ({
        ...pedido,
        userId: user.id_user,
        userName: user.nome,
      }))
    );
    return pedidos;
  } catch (error) {
    console.error("Error fetching pedidos:", error);
    throw error;
  }
};

export const createPedido = async (pedidoData) => {
  try {
    const response = await axios.post(`${API_URL}/pedidos`, pedidoData);
    return response.data;
  } catch (error) {
    console.error("Error creating pedido:", error);
    throw error; // Rethrow the error to handle in the component
  }
};

export const updatePedido = async (id, pedidoData) => {
  try {
    const response = await axios.put(`${API_URL}/pedidos/${id}`, pedidoData);
    return response.data;
  } catch (error) {
    console.error("Error updating pedido:", error);
    throw error;
  }
};

export const deletePedido = async (id) => {
  try {
    // Antes de deletar o pedido, vamos primeiro buscar todos os itens de pedido relacionados a ele
    let pedidoItens;
    try {
      pedidoItens = await getPedidoItensByPedidoId(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Se não houver itens de pedido relacionados ao pedido, não há necessidade de continuar
        pedidoItens = []; // Defina pedidoItens como um array vazio
      } else {
        throw error; // Rethrow qualquer outro erro
      }
    }

    // Agora podemos iterar sobre esses itens de pedido e deletá-los um por um
    await Promise.all(pedidoItens.map(async (item) => {
      await deletePedidoItem(id, item.id_produto); // Deletar o item de pedido
    }));

    // Agora que todos os itens de pedido relacionados foram deletados, podemos deletar o pedido em si
    const response = await axios.delete(`${API_URL}/pedidos/${id}`);
    localStorage.removeItem("pedidoId");
    return response.data;
  } catch (error) {
    console.error("Error deleting pedido:", error);
    throw error;
  }
};


export const getPedidoById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/pedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pedido:", error);
      throw error;
    }
  };