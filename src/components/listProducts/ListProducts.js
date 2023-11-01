import React, { useState } from "react";
import "./ListProducts.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const ListProducts = ({
  products,
  deleteProductHandler,
  handleEditProduct,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const translate = useTranslation();
  return (
    <div className="d-flex  flex-column align-items-center w-75">
      <table className="table table-hover mx-auto text-center"  id="tabla">
        <thead>
          <tr>
            <th>Id</th>
            <th>{translate("name")}</th>
            <th>{translate("type_of_garments")}</th>
            <th>{translate("price")}</th>
            <th>{translate("color")}</th>
            <th>{translate("size")}</th>
            <th>{translate("amount")}</th>
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
                  onMouseLeave={() => setIsHovered(false)}>
                    <span onClick={() => handleEditProduct(product)}>✏️</span>
                  </button>
                  {isHovered && (
                    <div className="hover-text">{translate("wish_edit")}</div>
                  )}
                </div>
              </td>
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
                    <div className="hover-text">{translate("wish_delete")}</div>
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
