import "./Shop.css";
import React from "react";

const Shop = ({ products }) => {
  return (
    <div id="divProduct">
      {products.map((product) => (
        <div className="cardProduct">
          <h4>Producto: {product.type}</h4>
          <p>Precio: ${product.price}</p>
          <p>Talle: {product.size}</p>
          <p>Color: {product.color}</p>
          <p>Disponibilidad: {product.amount > 0 ? "Si" : "No hay"}</p>
        </div>
      ))}
    </div>
  );
};

export default Shop;
