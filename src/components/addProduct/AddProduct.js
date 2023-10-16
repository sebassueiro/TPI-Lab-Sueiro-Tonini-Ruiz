import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
    }
  };

  return (
    <div>
      <form>
        <label>Tipo de prenda:</label>
        <input type="text" onChange={changeTypeHandler}></input>

        <label>Precio:</label>
        <input type="number" onChange={changePriceHandler}></input>

        <label>Color:</label>
        <input type="text" onChange={changeColorHandler}></input>

        <label>Talle:</label>
        <input type="text" onChange={changeSizeHandler}></input>

        <label>Cantidad de la prenda:</label>
        <input type="number" onChange={changeAmountHandler}></input>

        <Button onClick={addProductsHandler}>Añadir producto</Button>
      </form>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Volver al menu
      </Button>
    </div>
  );
};

export default AddProduct;
