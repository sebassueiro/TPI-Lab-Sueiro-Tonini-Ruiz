import React, { useContext, useEffect, useState } from "react";
import ShopFilter from "../shopFilter/ShopFilter";
import Shop from "../shop/Shop";
import { useNavigate } from "react-router";
import ComboLanguage from "../ui/comboLanguage/ComboLanguage";
import useTranslation from "../../custom/useTranslation/useTranslation";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { ToastContainer, toast } from "react-toastify";

const MainPage = () => {
  const [typeSelected, setTypeSelected] = useState("Todos");
  const [colorSelected, setColorSelected] = useState("Todos");
  const [sizeSelected, setSizeSelected] = useState("Todos");

  //const { userType } = useContext(AuthenticationContext);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userType = userData ? userData.userType : null;
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);

  const { handleLogout, user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const translate = useTranslation();

  useEffect(() => {
    fetch("http://localhost:8000/products", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);
        setProductsFiltered(productsData);
        console.log(productsData);
      })
      .catch((error) => console.log(error));
  }, []);

  const LoginHandler = () => {
    navigate("/login");
  };

  const manageUserHandler = () => {
    navigate("/manageUser");
  };

  const manageProductHandler = () => {
    navigate("/manageProducts");
  };

  const manageSalesHandler = () => {
    navigate("/manageSales");
  };

  const cartHandler = () => {
    navigate("/cart");
  };

  const addToCartHandler = (productId, amountProducts) => {
    if (user) {
      // Obtiene el carrito actual del localStorage o crea un nuevo carrito si no existe.
      let cart = JSON.parse(localStorage.getItem("cart")) || {};

      if (cart[productId]) {
        toast.warning(translate("alert_prod_in_cart"));
        //cart[productId] += amountProducts; // Incrementa la cantidad del producto en el carrito.
      } else {
        toast.success(translate("alert_add_prod_cart"));
        cart[productId] = amountProducts; // Inicializa la cantidad del producto en el carrito.
      }

      // Guarda el carrito actualizado en el localStorage.
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mx-4">
        <div className="py-2">
          {(userType === "admin" || userType === "superAdmin") && (
            <button
              className="m-2 btn btn-outline-dark"
              onClick={manageProductHandler}
            >
              {" "}
              {translate("administer_products")}{" "}
            </button>
          )}
        </div>
        <div className="py-2">
          {userType === "superAdmin" && (
            <button
              className="m-2 btn btn-outline-dark"
              onClick={manageUserHandler}
            >
              {translate("administer_users")}
            </button>
          )}
        </div>

        <div className="py-2">
          <ComboLanguage />
        </div>

        <div className="py-2">
          {(userType === "admin" || userType === "superAdmin") && (
            <button
              className="m-2 btn btn-outline-dark"
              onClick={manageSalesHandler}
            >
              {translate("list_sales")}
            </button>
          )}
        </div>

        <div className="py-2">
          <button className="m-2 btn btn-outline-dark" onClick={cartHandler}>
            {translate("cart")}
          </button>
        </div>

        <div className="py-2">
          {!user ? (
            <button className="btn btn-outline-dark" onClick={LoginHandler}>
              {translate("login")}
            </button>
          ) : (
            <button
              className="ml-2 btn btn-outline-dark"
              onClick={handleLogout}
            >
              {translate("sign_off")}
            </button>
          )}
        </div>
      </div>

      <ShopFilter
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
        colorSelected={colorSelected}
        setColorSelected={setColorSelected}
        sizeSelected={sizeSelected}
        setSizeSelected={setSizeSelected}
        products={products}
        setProductsFiltered={setProductsFiltered}
      />
      {productsFiltered.length === 0 ? (
        <h3 className="d-flex justify-content-center mx-auto px-4">
          {translate("no_products")}
        </h3>
      ) : (
        <Shop products={productsFiltered} addToCartHandler={addToCartHandler} />
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

export default MainPage;
