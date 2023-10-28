import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const priceRef = useRef(null);
  const colorRef = useRef(null);
  const sizeRef = useRef(null);
  const amountRef = useRef(null);

  const changeNameHandler = (event) => {
    if (nameRef.current.value !== "") {
      nameRef.current.style.borderColor = "";
      nameRef.current.style.outline = "";
    }
    setName(event.target.value);
  };

  const changeTypeHandler = (event) => {
    if (typeRef.current.value !== "") {
      typeRef.current.style.borderColor = "";
      typeRef.current.style.outline = "";
    }
    setType(event.target.value);
  };

  const changePriceHandler = (event) => {
    if (priceRef.current.value !== "") {
      priceRef.current.style.borderColor = "";
      priceRef.current.style.outline = "";
    }
    setPrice(parseInt(event.target.value));
  };

  const changeColorHandler = (event) => {
    if (colorRef.current.value !== "") {
      colorRef.current.style.borderColor = "";
      colorRef.current.style.outline = "";
    }
    setColor(event.target.value);
  };

  const changeSizeHandler = (event) => {
    if (sizeRef.current.value !== "") {
      sizeRef.current.style.borderColor = "";
      sizeRef.current.style.outline = "";
    }
    setSize(event.target.value);
  };

  const changeAmountHandler = (event) => {
    if (amountRef.current.value !== "") {
      amountRef.current.style.borderColor = "";
      amountRef.current.style.outline = "";
    }
    setAmount(parseInt(event.target.value));
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
      name === "" ||
      type === "" ||
      price === "" ||
      price === 0 ||
      color === "" ||
      size === "" ||
      amount === "" ||
      amount === 0
    ) {
      toast.error("Complete correctamente los campos resaltados en rojo");
      if (name === "") {
        nameRef.current.style.borderColor = "red";
        nameRef.current.style.outline = "none";
      }
      if (type === "") {
        typeRef.current.style.borderColor = "red";
        typeRef.current.style.outline = "none";
      }
      if (price === "" || price === 0) {
        priceRef.current.style.borderColor = "red";
        priceRef.current.style.outline = "none";
      }
      if (color === "") {
        colorRef.current.style.borderColor = "red";
        colorRef.current.style.outline = "none";
      }
      if (size === "") {
        sizeRef.current.style.borderColor = "red";
        sizeRef.current.style.outline = "none";
      }
      if (amount === "" || amount === 0) {
        amountRef.current.style.borderColor = "red";
        amountRef.current.style.outline = "none";
      }
    } else {
      const newProduct = {
        name,
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
          name: newProduct.name,
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

      setName("");
      setType("");
      setPrice("");
      setColor("");
      setSize("");
      setAmount("");

      toast.success("Producto añadido con exito!");
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
          <label>Nombre de la prenda:</label>
          <input
            type="text"
            onChange={changeNameHandler}
            placeholder="Nombre"
            ref={nameRef}
          />

          <label>Tipo de prenda:</label>
          <select onChange={changeTypeHandler} value={type} ref={typeRef}>
            <option value="">Selecione el tipo de prenda</option>
            <option value="Remera">Remera</option>
            <option value="Buzo">Buzo</option>
            <option value="Pantalon">Pantalon</option>
            <option value="Campera">Campera</option>
          </select>

          <label>Precio unitario:</label>
          <input
            type="number"
            onChange={changePriceHandler}
            placeholder="Ingrese Precio unitario"
            ref={priceRef}
          />

          <label>Color:</label>
          <select onChange={changeColorHandler} value={color} ref={colorRef}>
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
          <select onChange={changeSizeHandler} value={size} ref={sizeRef}>
            <option value="">Seleccione un talle</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <label>Cantidad de la prenda:</label>
          <input
            type="number"
            onChange={changeAmountHandler}
            placeholder="Ingrese cantidad total"
            ref={amountRef}
          />
        </Col>
        <Col className="d-flex justify-content-center mx-3 py-4">
          <Button onClick={addProductsHandler}>Añadir producto</Button>
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
        </Col>
      </form>
    </div>
  );
};

export default AddProduct;
