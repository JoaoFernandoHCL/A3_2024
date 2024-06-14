import React from "react";
import homep from '../img/homep.jpg';
import "../Home.css"

function Home() {
  return (
    <div>
      <img src={homep} alt="Banner" id="homep"/>
    </div>
  );
}

export default Home;