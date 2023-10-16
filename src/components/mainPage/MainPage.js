import React, { useEffect, useState } from "react";
import ShopFilter from "../shopFilter/ShopFilter";
import Shop from "../shop/Shop";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const MainPage = () => {
  const [colorSelected, setcolorSelected] = useState(false);
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
    navigate("/login");
  };

  const addProductHandler = () => {
    navigate("/addProduct");
  };

  const createAdminHandler = () => {
    navigate("/createAdmin");
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
          <Button onClick={LoginHandler}>Iniciar sesion</Button>
        </Col>
      </Row>
      <ShopFilter colorSelected={colorSelected} colorChange={selectHandler} />
      <Shop products={productsFiltered} />
    </div>
  );
};

export default MainPage;
