import React from 'react'

const EditProduct = () => {
  return (
    <div>
      {/* <h3>
        {translate("edit")} {editProduct.type} id: {editProduct.id}
      </h3>
      <form>
        <label>
          {translate("price")}:
          <input
            type="number"
            value={editProduct.price}
            onChange={(event) => {
              const inputValue = parseInt(event.target.value);
              if (inputValue <= 0) {
                alert("Ingrese una cantidad mayor a cero");
              } else {
                setEditProduct({
                  ...editProduct,
                  price: inputValue,
                });
              }
            }}
          />
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
      </form> */}
    </div>
  );
}

export default EditProduct
