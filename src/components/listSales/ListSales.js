import React from "react";
import "../listSales/ListSales.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const ListSales = ({ sales }) => {
  const translate = useTranslation();
  return (
    <div className="d-flex  flex-column align-items-center w-75">
      <table className="table table-hover mx-auto text-center" id="tablaSales">
        <thead>
          <tr>
            <th>{translate("sales_id")}</th>
            <th>Email</th>
            <th>{translate("products")}</th>
            <th>{translate("total_price")}</th>
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
                      {translate("product")} ID: {item.productId}, {translate("amount")}:{" "}
                      {item.amountProducts}, {translate("subtotal_price")}: $
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
