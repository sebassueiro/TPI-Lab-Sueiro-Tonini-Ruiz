import React, { useEffect, useState } from "react";
import useTranslation from "../../custom/useTranslation/useTranslation";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

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
      <h3>{translate("cart")}</h3>
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
          <h3>
            {translate("total_price")} ${totalPrice}
          </h3>
          <button onClick={clearCart}>{translate("delete_cart")}</button>

          <button onClick={buyCartButtonHandler}>{translate("buy")}</button>
        </div>
      ) : (
        <h1>{translate("cart_empty")}</h1>
      )}
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
