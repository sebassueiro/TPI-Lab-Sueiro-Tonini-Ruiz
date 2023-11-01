import React, { useEffect, useState } from "react";
import ListProducts from "../listProducts/ListProducts";
import { useNavigate } from "react-router";
import ShopFilter from "../shopFilter/ShopFilter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const ManageProducts = () => {
  const [typeSelected, setTypeSelected] = useState("Todos");
  const [colorSelected, setColorSelected] = useState("Todos");
  const [sizeSelected, setSizeSelected] = useState("Todos");

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const navigate = useNavigate();
  const translate = useTranslation();

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

  const deleteProductHandler = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast.success(`Producto con ID ${id} eliminado con éxito.`);
          const updatedProducts = products.filter(
            (product) => product.id !== id
          );
          setProductsFiltered(updatedProducts);
        } else {
          throw new Error("No se pudo eliminar el usuario.");
        }
      })
      .catch((error) => console.error(error));
  };

  const addProductHandler = () => {
    navigate("/addProduct");
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = () => {
    if (editProduct) {
      const updatedProduct = { ...editProduct };

      fetch(`http://localhost:8000/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No se pudo actualizar el producto.");
          }
        })
        .then((updatedProductData) => {
          const updatedProducts = products.map((product) =>
            product.id === updatedProductData.id ? updatedProductData : product
          );

          setProducts(updatedProducts);
          setProductsFiltered(updatedProducts);

          setEditProduct(null);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100  p-4">
      {editProduct && (
        <div>
          <h3>
            {translate("edit")} {editProduct.type} id: {editProduct.id}
          </h3>
          <form>
            <label>
              {translate("price")}:
              <input type="number"value={editProduct.price}onChange={(event) => {
                  const inputValue = parseInt(event.target.value);
                  if (inputValue <= 0) {
                    alert("Ingrese una cantidad mayor a cero");
                  } else {
                    setEditProduct({
                      ...editProduct,
                      price: inputValue,
                      });}}}/>
            </label>
            <label>
              {translate("amount")}:
              <input
                type="number"
                value={editProduct.amount}
                onChange={(event) => {
                  const inputValue = parseInt(event.target.value);
                  if (inputValue < 0) {
                    alert("Ingrese una cantidad mayor o igual a cero");
                  } else {
                    setEditProduct({
                      ...editProduct,
                      amount: inputValue,
                    });
                  }
                }}
              />
            </label>

            <button
              onClick={() => {
                handleUpdateProduct(editProduct);
              }}
            >
              {translate("save_changes")}
            </button>
          </form>
        </div>
      )}
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
          {translate("no_products")}
        </h3>
      ) : (
        <ListProducts
          products={productsFiltered}
          deleteProductHandler={deleteProductHandler}
          handleEditProduct={handleEditProduct}
         />
      )}
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

      <div className="d-flex mt-3">
        <button
          className="m-2 btn btn-outline-dark"
          onClick={addProductHandler}
        >
          {translate("add_product")}
        </button>
        <button
          className="m-2 btn btn-outline-dark"
          onClick={() => {
            navigate("/");
          }}
        >
          {translate("back_to_shop")}
        </button>
      </div>
    </div>
  );
};

export default ManageProducts;
