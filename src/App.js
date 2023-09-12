import React, { useState } from "react";
import Shop from "./components/shop/Shop";
import { Card, Col } from "react-bootstrap";
import ShopFilter from "./components/shopFilter/ShopFilter";
const products = [
  { type: "Remera", price: 8000, color: "Azul", size: "M", amount: 3 },
  { type: "Remera", price: 8000, color: "Rojo", size: "L", amount: 3 },
  { type: "Remera", price: 8000, color: "Amarillo", size: "XL", amount: 3 },
  { type: "Remera", price: 8000, color: "Naranja", size: "S", amount: 3 },
  { type: "Remera", price: 8000, color: "Azul", size: "S", amount: 0 },
  { type: "Remera", price: 8000, color: "Verde", size: "M", amount: 3 },
];
const App = () => {
  const [colorSelected, setcolorSelected] = useState(false);
  const [productsFiltered, setProductsFiltered] = useState(products);

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

  return (
    <div>
      <Col md={3}>
        <Card>
          <Card.Body className="p-4 m-4">PRODUCTOS</Card.Body>
        </Card>
      </Col>
      <ShopFilter colorSelected={colorSelected} colorChange={selectHandler} />
      <Shop products={productsFiltered} />
    </div>
  );
};

export default App;
