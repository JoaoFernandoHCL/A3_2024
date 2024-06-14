import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from "@mui/material";
import { getUserById, updateUser } from "../services/crudServiceUser";
import { getPedidos } from "../services/crudServicePedidos";
import "../paginasCss/scroll.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setAlertMessage("Você deve estar logado para acessar esta página.");
      window.location.href = "http://localhost:3000/";
      return;
    }
    fetchUser(userId);
  }, []);

  const fetchUser = async (userId) => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const fetchPedidos = async (userId) => {
    try {
      const allPedidos = await getPedidos();
      const userPedidos = allPedidos.filter((pedido) => pedido.userId === parseInt(userId));
      setPedidos(userPedidos);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const { nome, email, senha } = user; // Desestruturação para pegar apenas os campos desejados
      const payload = { nome, email, senha }; // Cria um novo objeto com apenas os campos desejados
      await updateUser(parseInt(user.id_user), payload);
      alert("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleFetchPedidos = () => {
    const userId = localStorage.getItem("userId");
    fetchPedidos(userId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="scrollable">
      <Container>
        <Typography variant="h4" gutterBottom>
          Perfil do Usuário
        </Typography>
        {alertMessage && <Alert severity="warning">{alertMessage}</Alert>}
        {user && (
          <>
            <TextField
              label="Nome"
              name="nome"
              value={user.nome || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              value={""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUser}
              style={{ marginTop: "20px" }}
            >
              Atualizar Informações
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFetchPedidos}
              style={{ marginTop: "20px", marginLeft: "10px" }}
            >
              Ver Histórico de Pedidos
            </Button>
            <List>
              {pedidos.map((pedido) => (
                <div key={pedido.id_pedido}>
                  <ListItem>
                    <ListItemText
                      primary={`Pedido #${pedido.id_pedido}`}
                      secondary={`Data: ${pedido.data_compra} - Preço Total: R$ ${pedido.preco_total}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </>
        )}
      </Container>
    </div>
  );
}

export default UserProfile;
