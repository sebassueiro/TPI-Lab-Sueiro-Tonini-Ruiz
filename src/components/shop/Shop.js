import "./Shop.css";
import React from "react";
import useTranslation from "../../custom/useTranslation/useTranslation";

const Shop = ({ products, addToCartHandler }) => {
  const translate = useTranslation();
  return (
    <div id="divProduct">
      {products.map((product) => (
        <div className="card text-center mb-3" id="cardProduct" key={product.id}>
          <div className="mt-2 mb-3">
          <img id="imagen" src={product.url} alt="Imagen del producto"/>
          <h4 className="card-title">{product.name}</h4>
          <p>{translate("price")}: ${product.price}<p/>
          <p>{translate("size")}: {product.size}</p>
          <p>{translate("color")}: {product.color}</p>
          {product.amount !== 0 ? (<p>{translate("stock")}{product.amount}</p>) : (<b>{translate("no_stock")}</b>)}</p>
          {product.amount !== 0 && <button className="mb-2 mt-0 btn btn-outline-dark" onClick={() => addToCartHandler(product.id)}>{translate("add_to_cart")}</button>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
