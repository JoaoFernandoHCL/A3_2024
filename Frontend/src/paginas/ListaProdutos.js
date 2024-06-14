import React, { useEffect, useState } from "react";

import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import {
  createPedido,
  updatePedido,
  getPedidoById
} from "../services/crudServicePedidos";
import {
  getPedidoItem,
  createPedidoItem,
  updatePedidoItem,
  deletePedidoItem,
  getPedidoItensByPedidoId
} from "../services/crudServicePedidoItens"
import { getProdutos } from "../services/crudServiceProduto";
import "../paginasCss/scroll.css";


function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [precoTotal, setPrecoTotal] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setAlertMessage("Você deve estar logado no sistema primeiro.");
      return;
    }

    const pedidoId = localStorage.getItem("pedidoId");
    if (!pedidoId) {
      createPedidoCardapio(userId);
    } else {
      fetchProdutos();
      fetchQuantidades(pedidoId);
    }
  }, [localStorage.getItem("userId")]);


  useEffect(() => {
    calculateTotalPrice();
  }, [quantidades]);

  const calculateTotalPrice = () => {
    let total = 0;
    produtos.forEach((produto) => {
      const quantidade = quantidades[produto.id_produto] || 0;
      total += quantidade * produto.preco;
    });
    setPrecoTotal(total.toFixed(2));
  };

  const createPedidoCardapio = async (userId) => {
    try {
      const payload = {
        data_compra: new Date().toLocaleDateString("pt-BR"),
        preco_total: 0.00,
        status: "Em andamento",
        userId: parseInt(userId),
      };
      const novoPedido = await createPedido(payload);
      localStorage.setItem("pedidoId", novoPedido.id_pedido);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const produtos = await getProdutos();
      setProdutos(produtos);

      const pedidoId = localStorage.getItem("pedidoId");
      const pedido = await getPedidoById(pedidoId);

      if (pedido.preco_total > 0) {
        const pedidoItens = await getPedidoItensByPedidoId(pedidoId);
        const initialQuantidades = pedidoItens.reduce((acc, item) => {
          acc[item.produto_id] = item.quantidade;
          return acc;
        }, {});
        setQuantidades(initialQuantidades);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchQuantidades = async (pedidoId) => {
    try {
      const pedidoItens = await getPedidoItensByPedidoId(pedidoId);
      const quantidadesAtualizadas = {};
      pedidoItens.forEach((item) => {
        quantidadesAtualizadas[item.id_produto] = item.quantidade;
      });
      setQuantidades(quantidadesAtualizadas);
    } catch (error) {
      console.error("Erro ao buscar quantidades:", error);
    }
  };



  const handleAddUnit = (produtoId) => {
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [produtoId]: (prevQuantidades[produtoId] || 0) + 1,
    }));
  };

  const handleSubtractUnit = (produtoId) => {
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [produtoId]: Math.max((prevQuantidades[produtoId] || 0) - 1, 0),
    }));
  };

  const handleFinalizarCompra = async () => {
    const pedidoId = localStorage.getItem("pedidoId");
    try {
      await updatePedido(pedidoId, { preco_total: parseFloat(precoTotal) });
      await Promise.all(
        produtos.map(async (produto) => {
          const quantidade = quantidades[produto.id_produto] || 0;
          let pedidoItem;
          try {
            pedidoItem = await getPedidoItem(pedidoId, produto.id_produto);
          } catch (error) {
            if (error.response && error.response.status === 404) {
              // Item não encontrado, deve ser criado
              pedidoItem = null;
            } else {
              // Re-throw outros erros
              throw error;
            }
          }

          if (pedidoItem) {
            if (quantidade > 0) {
              await updatePedidoItem(pedidoId, produto.id_produto, {
                quantidade: parseFloat(quantidade),
                preco_unidade: parseFloat(produto.preco),
              });
            } else {
              await deletePedidoItem(pedidoId, produto.id_produto);
            }
          } else {
            if (quantidade > 0) {
              await createPedidoItem({
                pedido_id: parseInt(pedidoId),
                produto_id: parseInt(produto.id_produto),
                quantidade: parseFloat(quantidade),
                preco_unidade: parseFloat(produto.preco),
              });
            }
          }
        })
      );
      alert("Compra finalizada com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
    }
  };




  const renderProdutos = () => {
    return produtos.map((produto) => (
      <ListItem key={produto.id_produto} divider>
        <ListItemText
          primary={produto.nome}
          secondary={`Preço: ${produto.preco} | Unidade: ${produto.unidade_medida}`}
        />
        <IconButton onClick={() => handleSubtractUnit(produto.id_produto)}>
          <Remove />
        </IconButton>
        <TextField
          value={quantidades[produto.id_produto] || 0}
          inputProps={{ readOnly: true }}
          style={{ width: 40, textAlign: "center" }}
        />
        <IconButton onClick={() => handleAddUnit(produto.id_produto)}>
          <Add />
        </IconButton>
        <Typography variant="body2">
          Total: R${(quantidades[produto.id_produto] || 0) * produto.preco}
        </Typography>
      </ListItem>
    ));
  };


  return (
    <div className="scrollable">
      <Container>
        <Typography variant="h4" gutterBottom>
          Bem-vindo à página para montar seu pedido
        </Typography>
        {alertMessage && <Alert severity="warning">{alertMessage}</Alert>}
        {localStorage.getItem("pedidoId") && localStorage.getItem("userId") ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => fetchQuantidades(localStorage.getItem("pedidoId"))}
              style={{ marginTop: "20px", marginLeft: "10px" }}
            >
              Se já fez seu pedido e quer mudar algo antes da compra, clique
              aqui para poder mudá-lo
            </Button>
            <List>{renderProdutos()}</List>
            <Typography variant="h6">
              Preço Total: R${precoTotal}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinalizarCompra}
            >
              Finalizar Compra
            </Button>

          </>
        ) : (
          !alertMessage && (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                createPedidoCardapio(localStorage.getItem("userId"))
              }
            >
              Começar Pedido
            </Button>
          )
        )}
      </Container>
    </div>
  );
}
export default ListaProdutos;
