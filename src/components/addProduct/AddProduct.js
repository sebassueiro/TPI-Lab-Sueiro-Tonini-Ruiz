import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTranslation from "../../custom/useTranslation/useTranslation";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState("");
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const translate = useTranslation();

  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const priceRef = useRef(null);
  const colorRef = useRef(null);
  const sizeRef = useRef(null);
  const amountRef = useRef(null);
  const urlRef = useRef(null);

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

  const changeUrlHandler = (event) => {
    if (amountRef.current.value !== "") {
      urlRef.current.style.borderColor = "";
      urlRef.current.style.outline = "";
    }
    setUrl(event.target.value);
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
      amount === 0 ||
      url === ""
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
      if (url === "" || url === 0) {
        urlRef.current.style.borderColor = "red";
        urlRef.current.style.outline = "none";
      }
    } else {
      const newProduct = {
        name,
        type,
        price,
        color,
        size,
        amount,
        url,
      };

      const newProductId =
        products.length === 0 ? 1 : products[products.length - 1].id + 1;

      fetch("https://ecommercefjsapi.onrender.com/products", {
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
          url: newProduct.url,
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
      setUrl("");
      navigate("/manageProducts")

      toast.success(translate("alert_success"));
    }
  };

  return (
    <div className="bg-body-secondary d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-4 rounded-5 text-secondary shadow">
        <div className="text-center fs-1 fw-bold">
          {translate("add_product")}
        </div>
        <div className="input-group mt-4">
          <label class="input-group-text">{translate("name_garments")}</label>
          <input
            className="form-control "
            type="text"
            onChange={changeNameHandler}
            placeholder={translate("name")}
            ref={nameRef}
          />
        </div>
        <div className="input-group mt-3">
          <label class="input-group-text">
            {translate("type_of_garments")}
          </label>
          <select
            className="form-select"
            onChange={changeTypeHandler}
            value={type}
            ref={typeRef}
          >
            <option value="">{translate("select_type_garments")}</option>
            <option value="Remera">{translate("t-shirt")}</option>
            <option value="Buzo">{translate("hoodie")}</option>
            <option value="Pantalon">{translate("pants")}</option>
            <option value="Campera">{translate("jackets")}</option>
          </select>
        </div>
        <div className="input-group mt-3">
          <label class="input-group-text">{translate("unit_price")}</label>
          <input
            className="form-control bg-light"
            type="number"
            onChange={changePriceHandler}
            placeholder={translate("price")}
            ref={priceRef}
          />
        </div>
        <div className="input-group mt-3">
          <label class="input-group-text">{translate("color")}:</label>
          <select
            className="form-select"
            onChange={changeColorHandler}
            value={color}
            ref={colorRef}
          >
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
        </div>
        <div className="input-group mt-3">
          <label class="input-group-text" id="inputGroup-sizing-sm">
            {translate("size")}:
          </label>
          <select
            className="form-select"
            onChange={changeSizeHandler}
            value={size}
            ref={sizeRef}
          >
            <option value="">{translate("select_size")}</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className="input-group mt-3">
          <label class="input-group-text" id="inputGroup-sizing-sm">
            {translate("amount_garments")}
          </label>
          <input
            className="form-control bg-light"
            type="number"
            onChange={changeAmountHandler}
            placeholder={translate("amount")}
            ref={amountRef}
          />
        </div>
        <div className="input-group mt-3">
          <label class="input-group-text" id="inputGroup-sizing-sm">
            {translate("enter_photo_url")}
          </label>
          <input
            className="form-control bg-light"
            type="type"
            onChange={changeUrlHandler}
            placeholder="URL"
            ref={urlRef}
          />
        </div>
        <div className="input-group mt-3">
          <button
            className="m-2 btn btn-outline-dark"
            onClick={addProductsHandler}
          >
            {translate("add_product")}
          </button>
          <button
            className="m-2 btn btn-outline-dark"
            onClick={() => {
              navigate("/manageProducts");
            }}
          >
            {translate("back_to_product_management")}
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default AddProduct;
