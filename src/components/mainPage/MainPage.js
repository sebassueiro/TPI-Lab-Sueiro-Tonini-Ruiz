import React, { useState } from "react";
import ShopFilter from "../shopFilter/ShopFilter";
import Shop from "../shop/Shop";
import Login from "../login/Login";
import { Button, Card, Col, Row } from "react-bootstrap";
import {useNavigate } from "react-router";

const products = [
  { type: "Remera", price: 8000, color: "Azul", size: "M", amount: 3 },
  { type: "Remera", price: 8000, color: "Rojo", size: "L", amount: 3 },
  { type: "Remera", price: 8000, color: "Amarillo", size: "XL", amount: 3 },
  { type: "Remera", price: 8000, color: "Naranja", size: "S", amount: 3 },
  { type: "Remera", price: 8000, color: "Azul", size: "S", amount: 0 },
  { type: "Remera", price: 8000, color: "Verde", size: "M", amount: 3 },
];

const MainPage = () => {
  const [colorSelected, setcolorSelected] = useState(false);
  const [productsFiltered, setProductsFiltered] = useState(products);
  const navigate = useNavigate();

  const selectHandler = (color) => {
    setcolorSelected(color);
    if (color === "Todos") {
      setProductsFiltered(products);
    } else {
      const productsFiltered = products.filter(
        (product) => product.color.toString() === color
      );
      setProductsFiltered(productsFiltered);
    }
  };

  const LoginHandler = () => {
    navigate("/login")
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
          <Button onClick={LoginHandler}>Iniciar seccion</Button>
        </Col>
      </Row>
      
      <ShopFilter colorSelected={colorSelected} colorChange={selectHandler} />
      <Shop products={productsFiltered} />
      <Login />
    </div>
  );
};

export default MainPage;
