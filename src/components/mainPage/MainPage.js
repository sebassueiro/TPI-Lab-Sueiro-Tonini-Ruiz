import React, { useEffect, useState } from "react";
import ShopFilter from "../shopFilter/ShopFilter";
import Shop from "../shop/Shop";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const MainPage = () => {
  const [typeSelected, setTypeSelected] = useState("Todos");
  const [colorSelected, setColorSelected] = useState("Todos");
  const [sizeSelected, setSizeSelected] = useState("Todos");

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const navigate = useNavigate();

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

  const addProductHandler = () => {
    navigate("/addProduct");
  };

  const createAdminHandler = () => {
    navigate("/createAdmin");
  };

  const manageUserHandler = () => {
    navigate("/manageUser");
  };

  return (
    <div>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body className="p-4 m-4">PRODUCTOS</Card.Body>
          </Card>
        </Col>

        <Col className="d-flex justify-content-end mx-4 py-2">
          <Button onClick={addProductHandler}>Añadir producto</Button>
        </Col>

        <Col className="d-flex justify-content-end mx-4 py-2">
          <Button onClick={createAdminHandler}>Crear Admin</Button>
        </Col>

        <Col className="d-flex justify-content-end mx-4 py-2">
          <Button onClick={manageUserHandler}>Administrar Usuarios</Button>
        </Col>

        <Col className="d-flex justify-content-end mx-4 py-2">
          <Button onClick={LoginHandler}>Iniciar sesion</Button>
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
          ¡No hay productos con con dichos filtros!
        </h3>
      ) : (
        <Shop products={productsFiltered} />
      )}
    </div>
  );
};

export default MainPage;
