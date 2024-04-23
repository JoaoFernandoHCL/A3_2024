import React from "react";
import { Link } from "react-router-dom";

function Aside(){
    console.log("funciona");
    return(
        <div className="aside">
            <ul>
                <li Link to = "/">Home</li>
                <li Link to = "/home">Sobre</li>
                <li Link to = "/home">Serviços</li>
                <li Link to = "/home">Contatos</li>
            </ul>
        </div>
    )
}

export default Aside;