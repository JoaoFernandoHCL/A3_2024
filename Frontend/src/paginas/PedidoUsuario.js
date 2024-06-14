import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import {
  getPedidoById,
  updatePedido,
  deletePedido,
} from "../services/crudServicePedidos";
import { getPedidoItensByPedidoId } from "../services/crudServicePedidoItens";
import { getProdutoById } from "../services/crudServiceProduto";
import "../paginasCss/scroll.css";

function PedidoUsuario() {
  const [pedido, setPedido] = useState(null);
  const [produtosPedido, setProdutosPedido] = useState([]);
  const [openPagamento, setOpenPagamento] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const pedidoId = localStorage.getItem("pedidoId");

    if (!userId) {
      alert("Por favor, faça login para acessar esta página.");
      window.location.href = "http://localhost:3000/login";
      return;
    }

    if (!pedidoId) {
      alert("Você precisa montar seu pedido antes de acessar esta página.");
      window.location.href = "http://localhost:3000/listaCompra";
      return;
    }

    const fetchData = async () => {
      try {
        const pedidoData = await getPedidoById(pedidoId);
        setPedido(pedidoData);
    
        const produtosPedidoData = await getPedidoItensByPedidoId(pedidoId);
        
        const produtosCompletos = await Promise.all(
          produtosPedidoData.map(async (pedidoItem) => {
            try {
              const produto = await getProdutoById(pedidoItem.id_produto);
              const precoTotalItem = pedidoItem.quantidade * pedidoItem.preco_unidade;
              return {
                ...pedidoItem,
                nome: produto.nome,
                preco_total_item: precoTotalItem,
              };
            } catch (error) {
              console.error(`Erro ao buscar produto ${pedidoItem.id_produto}:`, error);
              // Caso ocorra um erro ao buscar um produto, você pode decidir como lidar com isso aqui
              return {
                ...pedidoItem,
                nome: "Produto não encontrado",
                preco_total_item: 0,
              };
            }
          })
        );
        setProdutosPedido(produtosCompletos);
      } catch (error) {
        console.error("Erro ao buscar pedido e produtos do pedido:", error);
      }
    };
    
    fetchData();
    
  }, []);

  const handleComprar = () => {
    setOpenPagamento(true);
  };

  const handleCancelarPedido = async () => {
    if (window.confirm("Tem certeza que deseja cancelar o pedido?")) {
      try {
        await deletePedido(pedido.id_pedido);
        alert("Pedido cancelado com sucesso!");
        setPedido(null);
      } catch (error) {
        console.error("Erro ao cancelar pedido:", error);
      }
    }
  };

  const handleConfirmarPagamento = async () => {
    if (!metodoPagamento) {
      alert("Selecione um método de pagamento!");
      return;
    }

    try {
      // Aqui você pode integrar com a lógica real de pagamento
      // Por simplicidade, apenas atualizamos o status do pedido
      await updatePedido(pedido.id_pedido, { status: "Concluído" });
      localStorage.removeItem("pedidoId");
      setPedido((prevPedido) => ({
        ...prevPedido,
        status: "Concluído",
      }));
      alert("Compra realizada com sucesso!");
      setOpenPagamento(false);
    } catch (error) {
      console.error("Erro ao realizar pagamento:", error);
      alert("Erro ao realizar pagamento. Tente novamente mais tarde.");
    }
  };

  const handleClosePagamento = () => {
    setOpenPagamento(false);
  };

  const handleChangeMetodoPagamento = (metodo) => {
    setMetodoPagamento(metodo);
  };

  const handleAlterarPedido = () => {
    window.location.href = "http://localhost:3000/listaCompra";
  };

  return (
    <div className="scrollable">
      <Typography variant="h4" gutterBottom>
        Bem-vindo à Página do seu Pedido
      </Typography>
      {pedido ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Detalhes do Pedido
          </Typography>
          <Typography variant="body1">
            Data da Compra: {pedido.data_compra}
          </Typography>
          <Typography variant="body1">
            Preço Total: R$ {pedido.preco_total}
          </Typography>
          <Typography variant="body1">Status: {pedido.status}</Typography>
          <Typography variant="h4" gutterBottom>
            Produtos do Pedido
          </Typography>
          <List>
            {produtosPedido.map((pedidoItem) => (
              <ListItem key={pedidoItem.produto_id} divider>
                <ListItemText
                  primary={pedidoItem.nome}
                  secondary={`Quantidade: ${pedidoItem.quantidade} | Preço Unitário: R$ ${pedidoItem.preco_unidade} | Preço Total: R$ ${pedidoItem.preco_total_item}`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
            onClick={handleComprar}
          >
            Comprar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleAlterarPedido}
          >
            Alterar Pedido
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleCancelarPedido}
          >
            Cancelar Pedido
          </Button>
        </div>
      ) : (
        <Typography variant="body1">
          Não há pedido em andamento. Por favor, faça um pedido na página de
          Cardápio.
        </Typography>
      )}

      {/* Diálogo de Pagamento */}
      <Dialog open={openPagamento} onClose={handleClosePagamento}>
        <DialogTitle>Escolha o método de pagamento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione uma das opções de pagamento abaixo:
          </DialogContentText>
          <List>
            <ListItem>
              <Button
                onClick={() => handleChangeMetodoPagamento("Cartão de crédito")}
                color="primary"
              >
                Cartão de crédito
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onClick={() => handleChangeMetodoPagamento("Boleto Bancário")}
                color="primary"
              >
                Boleto Bancário
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onClick={() => handleChangeMetodoPagamento("Pix")}
                color="primary"
              >
                Pix
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onClick={() => handleChangeMetodoPagamento("Transferência Bancária")}
                color="primary"
              >
                Transferência Bancária
              </Button>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePagamento} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmarPagamento} color="primary">
            Confirmar Pagamento
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PedidoUsuario;
