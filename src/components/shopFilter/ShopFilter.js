import useTranslation from "../../custom/useTranslation/useTranslation";

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
  const translate = useTranslation();

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
    <div className="w-100">
      <div className="border rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <label>{translate("select_type_garments")}</label>
            <select
              className="me-4 form-select"
              style={{ width: "180px" }}
              onChange={typeHandler}
              value={typeSelected}
            >
              <option value="Todos">{translate("all_garments")}</option>
              <option value="Remera">{translate("t-shirt")}</option>
              <option value="Buzo">{translate("hoodie")}</option>
              <option value="Pantalon">{translate("pants")}</option>
              <option value="Campera">{translate("jackets")}</option>
            </select>
            <label>{translate("select_color")}</label>
            <select
              className="me-4 form-select"
              style={{ width: "170px" }}
              onChange={colorHandler}
              value={colorSelected}
            >
              <option value="Todos">{translate("all_colors")}</option>
              <option value="Azul">{translate("color_blue")}</option>
              <option value="Rojo">{translate("color_red")}</option>
              <option value="Amarillo">{translate("color_yellow")}</option>
              <option value="Naranja">{translate("color_orange")}</option>
              <option value="Verde">{translate("color_green")}</option>
              <option value="Blanco">{translate("color_white")}</option>
              <option value="Negro">{translate("color_black")}</option>
              <option value="Gris">{translate("color_gris")}</option>
            </select>
            <label>{translate("select_size")}</label>
            <select
              className="me-4 form-select"
              style={{ width: "150px" }}
              onChange={sizeHandler}
              value={sizeSelected}
            >
              <option value="Todos">{translate("all_size")}</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <button
              className="ms-5 btn btn-outline-dark"
              onClick={selectHandler}
            >
              {translate("filter")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilter;
