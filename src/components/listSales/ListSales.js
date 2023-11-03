import React from "react";
import "../listSales/ListSales.css";

const ListSales = ({ sales }) => {
  return (
    <div className="d-flex  flex-column align-items-center w-75">
      <table className="table table-hover mx-auto text-center" id="tablaSales">
        <thead>
          <tr>
            <th>Venta ID</th>
            <th>Email</th>
            <th>Productos</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.email}</td>
              <td>
                <ul>
                  {sale.cart.map((item, index) => (
                    <li key={index}>
                      Producto ID: {item.productId}, Cantidad:{" "}
                      {item.amountProducts}, Precio Subtotal: $
                      {item.subTotalPrice}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${sale.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSales;
