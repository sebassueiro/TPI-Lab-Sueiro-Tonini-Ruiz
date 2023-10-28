import { Button } from "react-bootstrap";
import "./Shop.css";
import React from "react";

const Shop = ({ products }) => {
  return (
    <div id="divProduct">
      {products.map((product) => (
        <div className="cardProduct" key={product.id}>
          <h4>{product.name}</h4>
          {/* <h4>Producto: {product.type}</h4> */}
          <p>Precio: ${product.price}</p>
          <p>Talle: {product.size}</p>
          <p>Color: {product.color}</p>
          <p>
            {product.amount !== 0 ? (
              `Unidades disponibles: ${product.amount}`
            ) : (
              <b>Producto no disponible</b>
            )}
          </p>
          {product.amount !== 0 && <Button>Añadir al carrito</Button>}
        </div>
      ))}
    </div>
  );
};

export default Shop;
