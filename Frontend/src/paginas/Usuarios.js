import React, { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/crudServiceUser";
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

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);


  useEffect(() => {
    const tipo = localStorage.getItem("tipo");
    if (tipo !== "admin") {
      setIsAdmin(false);
      window.location.href = "http://localhost:3000/";
    } else {
      loadUsers();
    }
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
      setError("Failed to load users.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // If editingUser is not null, update it as well
    if (editingUser) {
      setEditingUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleCreateUser = async () => {
    try {
      const { nome, email, senha, tipo } = newUser;
      const userData = {
        nome,
        email,
        senha,
        tipo,
      };

      await createUser(userData);
      setNewUser({
        nome: "",
        email: "",
        senha: "",
        tipo: "",
      });
      loadUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user.");
    }
  };

  const handleUpdateUser = async () => {
    try {
      const { id_user, nome, email, senha, tipo } = editingUser; // Destructure from editingUser
      console.log("editingUser:", editingUser)
      const userData = {
        nome,
        email,
        senha,
        tipo,
      };
      console.log("Payload:", userData);
      await updateUser(id_user, userData); // Update user with id_user and userData
      setEditingUser(null); // Reset editingUser after update
      setNewUser({ // Clear form fields after update
        nome: "",
        email: "",
        senha: "",
        tipo: "",
      });

      loadUsers(); // Reload users after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user.");
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
  }
  return (
    <div className="scrollable">
      <Container>
        <Typography variant="h4" gutterBottom>
          Lista de Usuários
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <form noValidate autoComplete="off">
              <TextField
                label="Nome"
                name="nome"
                value={newUser.nome}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Senha"
                name="senha"
                value={newUser.senha}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                type="password"
              />
              <TextField
                label="Tipo"
                name="tipo"
                value={newUser.tipo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={editingUser ? handleUpdateUser : handleCreateUser}
                fullWidth
                style={{ marginTop: 20 }}
              >
                {editingUser ? "Atualizar Usuário" : "Adicionar Usuário"}
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              {users.map((user) => (
                <ListItem key={user.id_user} divider>
                  <ListItemText
                    primary={user.nome}
                    secondary={`Email: ${user.email}, Tipo: ${user.tipo}`}
                  />
                  <IconButton
                    edge="end"
                    aria-label="editar"
                    onClick={() => {
                      setEditingUser(user);
                      setNewUser({
                        nome: user.nome,
                        email: user.email,
                        senha: user.senha,
                        tipo: user.tipo,
                      });
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="excluir"
                    onClick={() => handleDeleteUser(user.id_user)}
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

export default Usuarios;
