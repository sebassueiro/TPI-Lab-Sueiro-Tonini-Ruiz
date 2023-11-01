import React, { useEffect, useState } from "react";
import useTranslation from "../../custom/useTranslation/useTranslation";
import { useNavigate } from "react-router";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const translate = useTranslation();
  const navigate = useNavigate();

  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.amountInCart * product.price;
  });

  useEffect(() => {
    fetch("http://localhost:8000/products", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        const cartProducts = productsData.map((product) => ({
          ...product,
          amountInCart: cart[product.id] || 0,
        }));

        const filteredProducts = cartProducts.filter(
          (product) => product.amountInCart > 0
        );
        setProducts(filteredProducts);
      })
      .catch((error) => console.log(error));
  }, []);

  const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart && cart[productId]) {
      delete cart[productId];
      localStorage.setItem("cart", JSON.stringify(cart));

      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          product.amountInCart = 0;
        }
        return product;
      });

      const filteredProducts = updatedProducts.filter(
        (product) => product.amountInCart > 0
      );

      setProducts(filteredProducts);
    }

    if (cart.length === undefined) {
      localStorage.removeItem("cart");
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    navigate("/mainPage");
  };

  const increaseButtonHandler = (productId, amountTotal) => {
    if (cart[productId] < amountTotal) {
      cart[productId] += 1;

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      alert("No hay mas stock");
    }
  };

  const decreaseButtonHandler = (productId) => {
    if (cart[productId] > 1) {
      cart[productId] -= 1;

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      alert("No puede decrementar mas");
    }
  };

  //----------------------------------------------------------------

  useEffect(() => {
    fetch("http://localhost:8000/sales", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((salesData) => {
        setSales(salesData);
      })
      .catch((error) => console.log(error));
  }, []);

  const buyCartButtonHandler = () => {
    const newSalesId = sales[sales.length - 1].id + 1;
    const newSale = {
      id: newSalesId,
      cart: products.map((product) => ({
        productId: product.id,
        amountProducts: product.amountInCart,
        subTotalPrice: product.amountInCart * product.price,
      })),
      totalPrice: totalPrice,
    };

    fetch("http://localhost:8000/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSale),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("La respuesta tuvo algunos errores");
        }
      })
      .then((newSaleData) => {
        setSales([...sales, newSaleData]);
        localStorage.removeItem("cart");
        navigate("/mainPage");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Carrito</h3>
      {cart ? (
        <div>
          {products.map((product) => (
            <div className="cardProduct" key={product.id}>
              <img id="imagen" src={product.url} alt={product.name} />
              <h4>{product.name}</h4>
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
                Cantidad en carrito:
                <button onClick={() => decreaseButtonHandler(product.id)}>
                  -
                </button>
                {product.amountInCart}
                <button
                  onClick={() =>
                    increaseButtonHandler(product.id, product.amount)
                  }
                >
                  +
                </button>
              </p>
              <p>
                Subtotal del producto {product.name}: $
                {product.amountInCart * product.price}
              </p>
              <button onClick={() => removeFromCart(product.id)}>Borrar</button>
            </div>
          ))}
          <h3>Precio total: ${totalPrice}</h3>
          <button onClick={clearCart}>Eliminar carrito</button>

          <button onClick={buyCartButtonHandler}>Comprar</button>
        </div>
      ) : (
        <h1>El carrito esta vacio</h1>
      )}
    </div>
  );
};

export default Cart;
