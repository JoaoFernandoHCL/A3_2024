import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import menuLinks from "../jsondata/rotas.json";
import "../componentes/Aside.css";

function Aside() {
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    // Obtém o tipo de usuário do local storage
    const tipo = localStorage.getItem("tipo");
    setTipoUsuario(tipo);
  }, []);

  // Filtra os links com base no tipo de usuário
  const filteredLinks = menuLinks.filter(link => {
    if (
      ["PedidosAdmin", "ProdutosAdmin", "UsuariosAdmin"].includes(link.component) &&
      tipoUsuario !== "admin"
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="scrollable">
      <nav>
        <List>
          {filteredLinks.map(link => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton component={Link} to={link.path}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </div>
  );
}

export default Aside;