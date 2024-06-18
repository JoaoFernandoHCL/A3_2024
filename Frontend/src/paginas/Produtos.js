import React, { useEffect, useState } from "react";
import {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from "../services/crudServiceProduto";
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

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [newProduto, setNewProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    unidade_medida: "",
  });
  const [editingProduto, setEditingProduto] = useState(null);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);


  useEffect(() => {
    const tipo = localStorage.getItem("tipo");
    if (tipo !== "admin") {
      setIsAdmin(false);
      window.location.href = "http://localhost:3000/";
    } else {
      loadProdutos();
    }
  }, []);

  const loadProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Error loading produtos:", error);
      setError("Failed to load produtos.");
      if (error.response && error.response.status === 401) {
        // Redireciona para a página de login se não estiver autenticado
        window.location.href = "http://localhost:3000/login";
        alert("Usuário não logado. Por favor faça o login para ter acesso ao serviço");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
    if (editingProduto) {
      setEditingProduto((prevProduto) => ({
        ...prevProduto,
        [name]: value,
      }));
    }
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,5}(\.\d{0,2})?$/.test(value)) {
      setNewProduto((prevProduto) => ({
        ...prevProduto,
        preco: value,
      }));
      if (editingProduto) {
        setEditingProduto((prevProduto) => ({
          ...prevProduto,
          preco: value,
        }));
      }
    }
  };

  const handleCreateProduto = async () => {
    try {
      const { nome, categoria, preco, unidade_medida } = newProduto;
      const produtoData = {
        nome,
        categoria,
        preco: parseFloat(preco.replace(",", ".")),
        unidade_medida,
      };

      await createProduto(produtoData);
      setNewProduto({
        nome: "",
        categoria: "",
        preco: "",
        unidade_medida: "",
      });
      loadProdutos();
    } catch (error) {
      console.error("Error creating produto:", error);
      setError("Failed to create produto.");
    }
  };

  const handleUpdateProduto = async () => {
    try {
      const { id_produto, nome, categoria, preco, unidade_medida } = editingProduto;
      const produtoData = {
        nome,
        categoria,
        preco: parseFloat(preco.replace(",", ".")),
        unidade_medida,
      };

      await updateProduto(id_produto, produtoData);
      setEditingProduto(null);
      setNewProduto({
        nome: "",
        categoria: "",
        preco: "",
        unidade_medida: "",
      });
      loadProdutos();
    } catch (error) {
      console.error("Error updating produto:", error);
      setError("Failed to update produto.");
    }
  };

  const handleDeleteProduto = async (id) => {
    try {
      await deleteProduto(id);
      loadProdutos();
    } catch (error) {
      console.error("Error deleting produto:", error);
      setError("Failed to delete produto.");
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
            Lista de Produtos
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <form noValidate autoComplete="off">
                <TextField
                  label="Nome"
                  name="nome"
                  value={newProduto.nome}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Categoria"
                  name="categoria"
                  value={newProduto.categoria}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Preço"
                  name="preco"
                  value={newProduto.preco}
                  onChange={handlePriceChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Unidade de Medida"
                  name="unidade_medida"
                  value={newProduto.unidade_medida}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={editingProduto ? handleUpdateProduto : handleCreateProduto}
                  fullWidth
                  style={{ marginTop: 20 }}
                >
                  {editingProduto ? "Atualizar Produto" : "Adicionar Produto"}
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                {produtos.map((produto) => (
                  <ListItem key={produto.id_produto} divider>
                    <ListItemText
                      primary={produto.nome}
                      secondary={`Categoria: ${produto.categoria}, Preço: ${produto.preco}, Unidade de Medida: ${produto.unidade_medida}`}
                    />
                    <IconButton
                      edge="end"
                      aria-label="editar"
                      onClick={() => {
                        setEditingProduto(produto);
                        setNewProduto({
                          nome: produto.nome,
                          categoria: produto.categoria,
                          preco: produto.preco.toString(),
                          unidade_medida: produto.unidade_medida,
                        });
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="excluir"
                      onClick={() => handleDeleteProduto(produto.id_produto)}
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
    );
  }
}

export default Produtos;
