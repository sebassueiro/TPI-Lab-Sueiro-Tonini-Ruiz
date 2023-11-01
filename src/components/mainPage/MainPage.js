import React, { useContext, useEffect, useState } from "react";
import ShopFilter from "../shopFilter/ShopFilter";
import Shop from "../shop/Shop";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import ComboLanguage from "../ui/comboLanguage/ComboLanguage";
import useTranslation from "../../custom/useTranslation/useTranslation";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

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

  const cartHandler = () => {
    navigate("/cart");
  };

  const addToCartHandler = (id) => {
    var cart = localStorage.getItem("cart");

    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }
    if (cart.includes(id)) {
      alert("Ya esta");
    } else {
      alert("Agregado");
      cart.push(id);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mx-4">
        <div className="py-2">
          {(userType === "admin" || userType === "superAdmin") && (
            <button className="m-2 btn btn-outline-dark" onClick={manageProductHandler}> {translate("administer_products")} </button>)}
        </div>
        <div className="py-2">
          {userType === "superAdmin" && (
            <button className="m-2 btn btn-outline-dark" onClick={manageUserHandler}>{translate("administer_users")}</button>)}
        </div>
        <div className="py-2">
          <ComboLanguage />
        </div>
        <div className="py-2">
          <button className="m-2 btn btn-outline-dark" onClick={cartHandler}>
            {translate("cart")}
          </button>
        </div>
        <div className="py-2">
          {!user ? ( <button className="btn btn-outline-dark" onClick={LoginHandler}>{translate("login")}
            </button>) : ( <button className="ml-2 btn btn-outline-dark" onClick={handleLogout}>{translate("sign_off")}</button>)}
        </div>
      </div>

      <ShopFilter typeSelected={typeSelected} setTypeSelected={setTypeSelected} colorSelected={colorSelected} setColorSelected={setColorSelected} sizeSelected={sizeSelected} setSizeSelected={setSizeSelected} products={products} setProductsFiltered={setProductsFiltered}/>
      {productsFiltered.length === 0 ? (
        <h3 className="d-flex justify-content-center mx-auto px-4">
          {translate("no_products")}
        </h3> ) : (<Shop products={productsFiltered} addToCartHandler={addToCartHandler} />)}
    </div>
  );
};

export default MainPage;
