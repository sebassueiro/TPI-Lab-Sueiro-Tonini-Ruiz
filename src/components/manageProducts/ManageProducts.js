import React, { useEffect, useState } from "react";
import ListProducts from "../listProducts/ListProducts";
import { useNavigate } from "react-router";
import ShopFilter from "../shopFilter/ShopFilter";
import { Button, Col, Row } from "react-bootstrap";

const ManageProducts = () => {
  const [typeSelected, setTypeSelected] = useState("Todos");
  const [colorSelected, setColorSelected] = useState("Todos");
  const [sizeSelected, setSizeSelected] = useState("Todos");

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [productsFiltered, setProductsFiltered] = useState([]);

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
    alert(id);

    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert(`Producto con ID ${id} eliminado con éxito.`);
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

  return (
    <div>
      <Row className="d-flex justify-content pb-4 pt-2">
        <Col className="d-flex justify-content pb-4 pt-2">
          <h1>Administrar productos</h1>
        </Col>

        <Col className="d-flex justify-content-end mx-4 py-2">
          <Button onClick={addProductHandler}>Añadir producto</Button>
        </Col>

        <Col className="d-flex justify-content-end mx-3 py-2">
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Volver al menu
          </Button>
        </Col>
      </Row>

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
          ¡No hay productos con dichos filtros!
        </h3>
      ) : (
        <ListProducts
          products={productsFiltered}
          deleteProductHandler={deleteProductHandler}
        />
      )}
    </div>
  );
};

export default ManageProducts;
