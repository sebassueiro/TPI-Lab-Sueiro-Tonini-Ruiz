import React, { useEffect, useState } from "react";
import ShopFilter from "../shopFilter/ShopFilter";
import Shop from "../shop/Shop";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import ComboLanguage from "../ui/comboLanguage/ComboLanguage";
import useTranslation from "../../custom/useTranslation/useTranslation";

const MainPage = () => {
  const [typeSelected, setTypeSelected] = useState("Todos");
  const [colorSelected, setColorSelected] = useState("Todos");
  const [sizeSelected, setSizeSelected] = useState("Todos");

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
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

  return (
    <div>
      <Row>
        <Col className="d-flex justify-content-end mx-4 py-2">
          <button
            className="m-2 btn btn-outline-dark"
            onClick={manageProductHandler}
          >
            {translate("administer_products")}
          </button>
        </Col>
        <Col>
          <ComboLanguage />
        </Col>

        <Col className="d-flex justify-content-end mx-4 py-2">
          <button
            className="m-2 btn btn-outline-dark"
            onClick={manageUserHandler}
          >
            {translate("administer_users")}
          </button>
        </Col>

        <Col className="d-flex justify-content-end mx-4 py-2">
          <button className="m-2 btn btn-outline-dark" onClick={LoginHandler}>
            {translate("login")}
          </button>
        </Col>
      </Row>

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
        <Shop products={productsFiltered} />
      )}
    </div>
  );
};

export default MainPage;
