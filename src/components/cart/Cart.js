import React, { useContext, useEffect, useState } from "react";
import useTranslation from "../../custom/useTranslation/useTranslation";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import "./Cart.css"

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const cart = JSON.parse(localStorage.getItem("cart"));

  const { user } = useContext(AuthenticationContext);
  const translate = useTranslation();
  const navigate = useNavigate();

  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.amountInCart * product.price;
  });

  useEffect(() => {
    fetch("https://ecommercefjsapi.onrender.com/products", {
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
    let updatedCart = { ...cart };

    if (updatedCart && updatedCart[productId]) {
      delete updatedCart[productId];

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
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const cartKeys = Object.keys(updatedCart);
    if (cartKeys.length === 0) {
      localStorage.removeItem("cart");
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    navigate("/mainPage");
  };

  const increaseButtonHandler = (productId, amountTotal) => {
    if (cart[productId] < amountTotal) {
      const updatedCart = { ...cart };
      updatedCart[productId] += 1;

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, amountInCart: updatedCart[productId] };
        }
        return product;
      });

      setProducts(updatedProducts);
    } else {
      toast.warning(translate("alert_increase"));
    }
  };

  const decreaseButtonHandler = (productId) => {
    if (cart[productId] > 1) {
      const updatedCart = { ...cart };
      updatedCart[productId] -= 1;

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, amountInCart: updatedCart[productId] };
        }
        return product;
      });

      setProducts(updatedProducts);
    } else {
      toast.warning(translate("alert_decrease"));
    }
  };

  //----------------------------------------------------------------

  useEffect(() => {
    fetch("https://ecommercefjsapi.onrender.com/sales", {
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
    const newSalesId = sales.length === 0 ? 1 : sales[sales.length - 1].id + 1;
    const newSale = {
      id: newSalesId,
      email: user.email,
      cart: products.map((product) => ({
        productId: product.id,
        amountProducts: product.amountInCart,
        subTotalPrice: product.amountInCart * product.price,
      })),
      totalPrice: totalPrice,
    };

    fetch("https://ecommercefjsapi.onrender.com/sales", {
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

        newSale.cart.forEach((cartProduct) => {
          const productToUpdate = products.find(
            (product) => product.id === cartProduct.productId
          );
          if (productToUpdate) {
            const newAmount =
              productToUpdate.amount - cartProduct.amountProducts;
            // Recupera todos los campos del producto original
            fetch(`https://ecommercefjsapi.onrender.com/products/${cartProduct.productId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...productToUpdate, amount: newAmount }),
            })
              .then((response) => {
                if (response.ok) return response.json();
                else {
                  throw new Error("La respuesta tuvo algunos errores");
                }
              })
              .catch((error) => console.log(error));
          }
        });

        localStorage.removeItem("cart");

        navigate("/mainPage");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="cart-container">
      <h3>{translate("cart")}</h3>
      {cart ? (
        <div>
          {products.map((product) => (
            <div className="cardProduct" key={product.id}>
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
                {translate("amount_cart")}
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
                {translate("subtotal_prod")} {product.name}: $
                {product.amountInCart * product.price}
              </p>
              <button onClick={() => removeFromCart(product.id)}>
                {translate("delete")}
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <h3>{translate("total_price")} ${totalPrice}</h3>
            <button className=" btn btn-outline-dark" onClick={clearCart}>{translate("delete_cart")}</button>
            <button className=" btn btn-outline-dark" onClick={buyCartButtonHandler}>{translate("buy")}</button>
          </div>
        </div>
      ) : (
        <h1>{translate("cart_empty")}</h1>
      )}
      <button
          className="m-2 btn btn-outline-dark"
          onClick={() => {
            navigate("/");
          }}
        >
          {translate("back_to_shop")}
        </button>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Cart;