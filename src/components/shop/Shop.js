import { Button } from "react-bootstrap";
import "./Shop.css";
import React from "react";
import useTranslation from "../../custom/useTranslation/useTranslation";

const Shop = ({ products }) => {
  const translate = useTranslation();
  return (
    <div id="divProduct">
      {products.map((product) => (
        <div className="cardProduct" key={product.id}>
          <h4>{product.name}</h4>
          {/* <h4>Producto: {product.type}</h4> */}
          <p>
            {translate("price")}: ${product.price}
          </p>
          <p>
            {translate("size")}: {product.size}
          </p>
          <p>
            {translate("color")}: {product.color}
          </p>
          <p>
            {product.amount !== 0 ? (
              <p>
                {translate("stock")}
                {product.amount}
              </p>
            ) : (
              <b>{translate("no_stock")}</b>
            )}
          </p>
          {product.amount !== 0 && <Button>{translate("add_to_cart")}</Button>}
        </div>
      ))}
    </div>
  );
};

export default Shop;
