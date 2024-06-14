import React, { useEffect, useState } from "react";
import {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido,
} from "../services/crudServicePedidos";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "../paginasCss/scroll.css";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [newPedido, setNewPedido] = useState({
    data_compra: "",
    preco_total: "",
    status: "",
    userId: "", // Adicionado campo userId
  });
  const [editingPedido, setEditingPedido] = useState(null);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const tipo = localStorage.getItem("tipo");
    if (tipo !== "admin") {
      setIsAdmin(false);
      window.location.href = "http://localhost:3000/";
    } else {
      loadPedidos();
    }
  }, []);

  const loadPedidos = async () => {
    try {
      const data = await getPedidos();
      setPedidos(data);
    } catch (error) {
      console.error("Error loading pedidos:", error);
      setError("Failed to load pedidos.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPedido((prevPedido) => ({
      ...prevPedido,
      [name]: value,
    }));
    // Se editingPedido não for nulo, atualize-o também
    if (editingPedido) {
      setEditingPedido((prevPedido) => ({
        ...prevPedido,
        [name]: value,
      }));
    }
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,5}(\.\d{0,2})?$/.test(value)) {
      setNewPedido((prevPedido) => ({
        ...prevPedido,
        preco_total: value,
      }));
      if (editingPedido) {
        setEditingPedido((prevPedido) => ({
          ...prevPedido,
          preco_total: value,
        }));
      }
    }
  };


  const handleCreatePedido = async () => {
    try {
      const { data_compra, preco_total, status, userId } = newPedido;
      const pedidoData = {
        data_compra,
        preco_total,
        status,
        userId, // Inclui userId no payload
      };
      const payload = {
        data_compra: pedidoData.data_compra,
        preco_total: parseFloat(pedidoData.preco_total),
        status: pedidoData.status,
        userId: parseInt(pedidoData.userId),
      };
      await createPedido(payload);
      setNewPedido({
        data_compra: "",
        preco_total: "",
        status: "",
        userId: "", // Reset userId
      });
      loadPedidos();
    } catch (error) {
      console.error("Error creating pedido:", error);
      setError("Failed to create pedido.");
    }
  };

  const handleUpdatePedido = async () => {
    try {
      const { id_pedido, data_compra, preco_total, status, userId } = editingPedido;
      const pedidoData = {
        data_compra,
        preco_total,
        status,
        userId, // Inclui userId no payload
      };
      const payload = {
        data_compra: pedidoData.data_compra,
        preco_total: parseFloat(pedidoData.preco_total),
        status: pedidoData.status,
        userId: parseInt(pedidoData.userId),
      };
      await updatePedido(id_pedido, payload);
      setEditingPedido(null);
      setNewPedido({
        data_compra: "",
        preco_total: "",
        status: "",
        userId: "", // Reset userId
      });
      loadPedidos();
    } catch (error) {
      console.error("Error updating pedido:", error);
      setError("Failed to update pedido.");
    }
  };

  const handleDeletePedido = async (id) => {
    try {
      await deletePedido(id);
      loadPedidos();
    } catch (error) {
      console.error("Error deleting pedido:", error);
      setError("Failed to delete pedido.");
    }
  };


  if (!isAdmin) {
    return (
      <Container>
        <Typography variant="h6" color="error" gutterBottom>
          Apenas administradores podem acessar esta página.
        </Typography>
      </Container>
    );
  } else {
  return (
    <div className="scrollable">
      <Container>
        <Typography variant="h4" gutterBottom>
          Lista de Pedidos
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <form noValidate autoComplete="off">
              <TextField
                label="Data da Compra (DD/MM/AAAA)"
                name="data_compra"
                value={newPedido.data_compra}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Preço Total"
                name="preco_total"
                value={newPedido.preco_total}
                onChange={handlePriceChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Status"
                name="status"
                value={newPedido.status}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="User ID"
                name="userId"
                value={newPedido.userId}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={editingPedido ? handleUpdatePedido : handleCreatePedido}
                fullWidth
                style={{ marginTop: 20 }}
              >
                {editingPedido ? "Atualizar Pedido" : "Adicionar Pedido"}
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              {pedidos.map((pedido) => (
                <ListItem key={pedido.id_pedido} divider>
                  <ListItemText
                    primary={`Pedido ${pedido.id_pedido}`}
                    secondary={`Data: ${pedido.data_compra}, Preço: ${pedido.preco_total}, Status: ${pedido.status}, User: ${pedido.userId}`}
                  />
                  <IconButton
                    edge="end"
                    aria-label="editar"
                    onClick={() => {
                      setEditingPedido(pedido);
                      setNewPedido({
                        data_compra: pedido.data_compra,
                        preco_total: pedido.preco_total,
                        status: pedido.status,
                        userId: pedido.userId,
                      });
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="excluir"
                    onClick={() => handleDeletePedido(pedido.id_pedido)}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );}
}

export default Pedidos;
