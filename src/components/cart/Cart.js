import React, { useEffect, useState } from "react";
import useTranslation from "../../custom/useTranslation/useTranslation";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const cartIds = JSON.parse(localStorage.getItem("cart"));
  const translate = useTranslation();
  useEffect(() => {
    fetch("http://localhost:8000/products", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        const filteredProducts = productsData.filter((product) =>
          cartIds.includes(product.id)
        );
        setProducts(filteredProducts);
        console.log(filteredProducts);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h3>Carrito</h3>
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
          {/* <p>
            {product.amount !== 0 ? (
              <p>
                {translate("stock")}
                {product.amount}
              </p>
            ) : (
              <b>{translate("no_stock")}</b>
            )}
          </p> */}
         
        </div>
      ))}
    </div>
  );
};

export default Cart;
