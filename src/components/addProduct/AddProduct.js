import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const changeTypeHandler = (event) => {
    setType(event.target.value);
  };

  const changePriceHandler = (event) => {
    setPrice(event.target.value);
  };

  const changeColorHandler = (event) => {
    setColor(event.target.value);
  };

  const changeSizeHandler = (event) => {
    setSize(event.target.value);
  };

  const changeAmountHandler = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8000/products", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);
      })
      .catch((error) => console.log(error));
  }, []);

  const addProductsHandler = () => {
    if (
      type === "" ||
      price === "" ||
      color === "" ||
      size === "" ||
      amount === ""
    ) {
      alert("Complete todos los campos");
    } else {
      const newProduct = {
        type,
        price,
        color,
        size,
        amount,
      };
      const newProductId = products[products.length - 1].id + 1;

      fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: newProductId,
          type: newProduct.type,
          price: newProduct.price,
          color: newProduct.color,
          size: newProduct.size,
          amount: newProduct.amount,
        }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else {
            throw new Error("The response had some errors");
          }
        })
        .then(() => {
          const newProductsArray = [
            { ...newProduct, id: newProductId },
            ...products,
          ];
          setProducts(newProductsArray);
        })
        .catch((error) => console.log(error));

      setType("");
      setPrice("");
      setColor("");
      setSize("");
      setAmount("");

      alert("Producto añadido con exito!");
    }
  };

  return (
    <div>
      <Row className="d-flex justify-content pb-4 pt-2">
        <Col className="d-flex justify-content pb-4 pt-2">
          <h1>-Añadir productos-</h1>
        </Col>

        <Col className="d-flex justify-content-end mx-3 py-2">
          <Button
            onClick={() => {
              navigate("/manageProducts");
            }}
          >
            Volver a administrar productos
          </Button>
        </Col>
      </Row>
      <form>
        <Col className="d-flex justify-content-center mx-3 py-4">
          <label>Tipo de prenda:</label>
          <select onChange={changeTypeHandler} value={type}>
            <option value="">Selecione el tipo de prenda</option>
            <option value="Remera">Remera</option>
            <option value="Buzo">Buzo</option>
            <option value="Pantalon">Pantalon</option>
            <option value="Campera">Campera</option>
          </select>

          <label>Precio:</label>
          <input type="number" onChange={changePriceHandler} placeholder="Ingrese Precio unitario"/>

          <label>Color:</label>
          <select onChange={changeColorHandler} value={color}>
            <option value="">Seleccione un color</option>
            <option value="Azul">Azul</option>
            <option value="Rojo">Rojo</option>
            <option value="Amarillo">Amarillo</option>
            <option value="Naranja">Naranja</option>
            <option value="Verde">Verde</option>
            <option value="Blanco">Blanco</option>
            <option value="Negro">Negro</option>
            <option value="Gris">Gris</option>
          </select>

          <label>Talle:</label>
          <select onChange={changeSizeHandler} value={size}>
            <option value="">Seleccione un talle</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <label>Cantidad de la prenda:</label>
          <input type="number" onChange={changeAmountHandler} />
        </Col>
        <Col className="d-flex justify-content-center mx-3 py-4">
          <Button onClick={addProductsHandler}>Añadir producto</Button>
        </Col>
      </form>
    </div>
  );
};

export default AddProduct;
