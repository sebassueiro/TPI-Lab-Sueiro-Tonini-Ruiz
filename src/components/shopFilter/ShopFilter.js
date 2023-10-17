import { Button, Col, Row } from "react-bootstrap";

const ShopFilter = ({
  typeSelected,
  setTypeSelected,
  colorSelected,
  setColorSelected,
  sizeSelected,
  setSizeSelected,
  products,
  setProductsFiltered,
}) => {
  const typeHandler = (event) => {
    setTypeSelected(event.target.value);
  };

  const colorHandler = (event) => {
    setColorSelected(event.target.value);
  };

  const sizeHandler = (event) => {
    setSizeSelected(event.target.value);
  };

  const selectHandler = () => {
    const productsFilteredByColor = filterProductsByColor(
      products,
      colorSelected
    );
    const productsFilterBySize = filterProductsBySize(
      productsFilteredByColor,
      sizeSelected
    );
    const productsFilter = filterProductsByType(
      productsFilterBySize,
      typeSelected
    );
    setProductsFiltered(productsFilter);
  };

  const filterProductsByType = (products, typeSelected) => {
    return typeSelected === "Todos"
      ? products
      : products.filter((product) => product.type === typeSelected);
  };

  const filterProductsByColor = (products, colorSelected) => {
    return colorSelected === "Todos"
      ? products
      : products.filter((product) => product.color === colorSelected);
  };

  const filterProductsBySize = (products, sizeSelected) => {
    return sizeSelected === "Todos"
      ? products
      : products.filter((product) => product.size === sizeSelected);
  };

  return (
    <Row>
      <Col className="col-3">
        <label>Selecione el tipo de prendas: </label>
        <select onChange={typeHandler} value={typeSelected}>
          <option value="Todos">Todas las prendas</option>
          <option value="Remera">Remeras</option>
          <option value="Buzo">Buzos</option>
          <option value="Pantalon">Pantalones</option>
          <option value="Campera">Camperas</option>
        </select>
      </Col>

      <Col>
        <label>Seleccione un color: </label>
        <select onChange={colorHandler} value={colorSelected}>
          <option value="Todos">Todos los colores</option>
          <option value="Azul">Azul</option>
          <option value="Rojo">Rojo</option>
          <option value="Amarillo">Amarillo</option>
          <option value="Naranja">Naranja</option>
          <option value="Verde">Verde</option>
          <option value="Blanco">Blanco</option>
          <option value="Negro">Negro</option>
          <option value="Gris">Gris</option>
        </select>
      </Col>

      <Col>
        <label>Seleccione un talle: </label>
        <select onChange={sizeHandler} value={sizeSelected}>
          <option value="Todos">Todos los talles</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </Col>

      <Col>
        <Button onClick={selectHandler}>Filtrar</Button>
      </Col>
    </Row>
  );
};

export default ShopFilter;
