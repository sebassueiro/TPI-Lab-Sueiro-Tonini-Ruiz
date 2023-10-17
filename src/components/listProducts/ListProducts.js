import React from "react";
import { Button } from "react-bootstrap";

const ListProducts = ({ products, deleteProductHandler }) => {
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo de prenda</th>
              <th>Precio</th>
              <th>Color</th>
              <th>Talle</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          {products.map((product) => (
            <tbody>
              <tr>
                <td>{product.id}</td>
                <td>{product.type}</td>
                <td>${product.price}</td>
                <td>{product.color}</td>
                <td>{product.size}</td>
                <td>{product.amount}</td>
                <td>
                  <Button onClick={() => deleteProductHandler(product.id)}>
                    Eliminar Producto
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ListProducts;
