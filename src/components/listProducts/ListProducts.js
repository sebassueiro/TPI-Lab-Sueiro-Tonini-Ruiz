import React, { useState } from "react";
import "./ListProducts.css";

const ListProducts = ({ products, deleteProductHandler }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="d-flex  flex-column align-items-center w-75">
      <table className="table table-hover mx-auto text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Tipo de prenda</th>
            <th>Precio</th>
            <th>Color</th>
            <th>Talle</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        {products.map((product) => (
          <tbody>
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>${product.price}</td>
              <td>{product.color}</td>
              <td>{product.size}</td>
              <td>{product.amount}</td>
              <td>
                <div className="button-container">
                  <button
                    id="tacho"
                    className={`button ${isHovered ? "hovered" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span onClick={() => deleteProductHandler(product.id)}>
                      🗑️
                    </span>
                  </button>
                  {isHovered && (
                    <div className="hover-text">Deseas eliminar?</div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ListProducts;
