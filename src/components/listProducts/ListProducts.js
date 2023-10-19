import React from "react";

const ListProducts = ({ products, deleteProductHandler }) => {
  return (
    <div className="d-flex  flex-column align-items-center w-75">
      <table className="table table-hover mx-auto text-center">
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
              <td><span onClick={() => deleteProductHandler(product.id)}>🗑️</span></td>
            </tr>
          </tbody>
          ))}
      </table>
    </div>
  );
};

export default ListProducts;
