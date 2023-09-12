import React from "react";
import Shop from "./components/shop/Shop";
import { Card, Col } from "react-bootstrap";
import ShopFilter from "./components/shopFilter/ShopFilter";
const products = [
  { type: "Remera", price: 8000, color: "Azul", size: "M", amount: 3 },
  { type: "Remera", price: 8000, color: "Roja", size: "L", amount: 3 },
  { type: "Remera", price: 8000, color: "Amarilla", size: "XL", amount: 3 },
  { type: "Remera", price: 8000, color: "Naranja", size: "S", amount: 3 },
  { type: "Remera", price: 8000, color: "Azul", size: "S", amount: 0 },
  { type: "Remera", price: 8000, color: "Verde", size: "M", amount: 3 },
];
const App = () => {
  return (
    <div><Col md={3}>
    <Card>
      <Card.Body className="p-4 m-4">PRODUCTOS</Card.Body>
    </Card>
  </Col>
      <Shop products={products} />
      <ShopFilter/>
    </div>
  );
};

export default App;
