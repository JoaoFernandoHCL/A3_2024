import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import '../paginasCss/LoginStyles.css';
import axios from 'axios';
import { createUser } from '../services/crudServiceUser';

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        senha,
      });
      alert("Login realizado com sucesso");
      console.log("Login realizado com sucesso:", response.data);

      const token = response.data?.access_token;
      const tipo = response.data?.tipo;
      const userId = response.data?.userId;

      if (token) {
        localStorage.setItem("token", response.data.access_token);
        console.log("Token armazenado:", localStorage.getItem("token"));
      } else {
        throw new Error("Token não encontrado na resposta");
      }

      if(tipo) {
          localStorage.setItem("tipo", response.data.tipo);
          console.log("Tipo armazenado:", localStorage.getItem("tipo"));
      } else {
        throw new Error("Tipo não encontrado na resposta");
      }

      if (userId) {
        localStorage.setItem("userId", response.data.userId);
        console.log("Id armazenado:", localStorage.getItem("userId"));
      } else {
        throw new Error("UserId não encontrado na resposta");
      }

      //garantir que não haja um pediodId no loacal storage
      if(localStorage.getItem("pedidoId")){
        localStorage.removeItem("pedidoId")
      }

      // Redireciona o usuário após o login
      window.location.href = "http://localhost:3000/";

    } catch (error) {
      console.error("Erro durante o login:", error);
      if (error.response && error.response.status === 404) {
        setError("Credenciais inválidas");
      } else {
        setError(error.message || "Erro ao fazer login");
      }
    }
  };

  const handleCadastro = async () => {
    try {
      const userData = {
        nome,
        email,
        senha,
        tipo: "comum",
      };

      const response = await createUser(userData);
      alert("Cadastro realizado com sucesso");
      console.log("Cadastro realizado com sucesso:", response.data);

      // Após cadastro, alterna para a tela de login
      setIsLogin(true);

    } catch (error) {
      console.error("Erro durante o cadastro:", error);
      setError(error.message || "Erro ao fazer cadastro");
    }
  };

  return (
    <Box className="login-container">
      <Paper elevation={10} className="login-paper">
        <Typography variant="h5" component="h1" textAlign="center">
          {isLogin ? "Login" : "Cadastro"}
        </Typography>
        {error && (
          <Typography variant="body1" color="error" textAlign="center">
            {error}
          </Typography>
        )}
        {!isLogin && (
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            required
            className="login-field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          className="login-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          required
          className="login-field"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="login-button"
          onClick={isLogin ? handleLogin : handleCadastro}
        >
          {isLogin ? "Entrar" : "Cadastrar"}
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          className="login-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Faça login"}
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
