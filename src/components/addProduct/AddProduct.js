import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const translate = useTranslation();

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
      toast.error(translate("alert_empty_fields"));
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

      toast.success(translate("alert_success"));
    }
  };

  return (
    <div>
      <Row className="d-flex justify-content pb-4 pt-2">
        <Col className="d-flex justify-content pb-4 pt-2">
          <h1>{translate("add_product")}</h1>
        </Col>

        <Col className="d-flex justify-content-end mx-3 py-2">
          <Button
            onClick={() => {
              navigate("/manageProducts");
            }}
          >
            {translate("back_to_product_management")}
          </Button>
        </Col>
      </Row>
      <form>
        <Col className="d-flex justify-content-center mx-3 py-4">
          <label>{translate("name_garments")}</label>
          <input
            type="text"
            onChange={changeNameHandler}
            placeholder="Nombre"
            ref={nameRef}
          />

          <label>{translate("type_of_garments")}</label>
          <select onChange={changeTypeHandler} value={type} ref={typeRef}>
            <option value="">{translate("select_type_garments")}</option>
            <option value="Remera">{translate("t-shirt")}</option>
            <option value="Buzo">{translate("hoodie")}</option>
            <option value="Pantalon">{translate("pants")}</option>
            <option value="Campera">{translate("jackets")}</option>
          </select>

          <label>{translate("unit_price")}</label>
          <input
            type="number"
            onChange={changePriceHandler}
            placeholder={translate("price")}
            ref={priceRef}
          />

          <label>{translate("color")}:</label>
          <select onChange={changeColorHandler} value={color} ref={colorRef}>
            <option value="">{translate("select_color")}</option>
            <option value="Azul">{translate("color_blue")}</option>
            <option value="Rojo">{translate("color_red")}</option>
            <option value="Amarillo">{translate("color_yellow")}</option>
            <option value="Naranja">{translate("color_orange")}</option>
            <option value="Verde">{translate("color_green")}</option>
            <option value="Blanco">{translate("color_white")}</option>
            <option value="Negro">{translate("color_black")}</option>
            <option value="Gris">{translate("color_gris")}</option>
          </select>

          <label>{translate("size")}:</label>
          <select onChange={changeSizeHandler} value={size} ref={sizeRef}>
            <option value="">{translate("select_size")}</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <label>{translate("amount_garments")}</label>
          <input
            type="number"
            onChange={changeAmountHandler}
            placeholder={translate("amount")}
            ref={amountRef}
          />
        </Col>
        <Col className="d-flex justify-content-center mx-3 py-4">
          <Button onClick={addProductsHandler}>
            {translate("add_product")}
          </Button>
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
