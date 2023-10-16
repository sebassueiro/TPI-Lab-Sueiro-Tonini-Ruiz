const ShopFilter = ({ colorSelected, colorChange }) => {
  const colorHandler = (event) => {
    colorChange(event.target.value);
  };

  return (
    <div>
      <label>Seleccione un color: </label>
      <select onChange={colorHandler} value={colorSelected}>
        <option value="Todos">Todos los colores</option>
        <option value="Azul">Azul</option>
        <option value="Rojo">Rojo</option>
        <option value="Amarillo">Amarillo</option>
        <option value="Naranja">Naranja</option>
        <option value="Verde">Verde</option>
      </select>
    </div>
  );
};

export default ShopFilter;
