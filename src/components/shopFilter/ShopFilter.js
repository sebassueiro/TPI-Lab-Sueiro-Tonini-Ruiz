import React, { useState } from "react";

const ShopFilter = ({ products }) => {
  const [checkbox, setCheckbox] = useState(false);
  const checkboxHandler = (event) => {
    setCheckbox(event.target.value);
  };

  const filteredProducts = products
    .filter((product) => product.color === checkbox)
    .map((product) => (
      <div className="cardProduct">
        <h4>Producto:{product.type}</h4>
        <p>Precio: ${product.price}</p>
        <p>Talle:{product.size}</p>
        <p>Color:{product.color}</p>
        <p>Disponibilidad: {product.amount > 0 ? "Si" : "No hay"}</p>
      </div>
    ));

  return (
    <div>
      <label>Azul:</label>
      <input type="checkbox" onChange={checkboxHandler} value={"Azul"} />
      <br />
      <label>Rojo:</label>
      <input type="checkbox" onChange={checkboxHandler} value={"Rojo"} />
      <br />
      <label>Amarillo:</label>
      <input type="checkbox" onChange={checkboxHandler} value={"Amarillo"} />
      <br />
      <label>Naranja:</label>
      <input type="checkbox" onChange={checkboxHandler} value={"Naranja"} />

      <div id="divProduct">{filteredProducts}</div>
    </div>
  );
};

export default ShopFilter;
