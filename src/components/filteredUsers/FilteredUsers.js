import React from "react";

const FilteredUsers = ({
  typeUserSelected,
  setTypeUserSelected,
  users,
  setUsersFiltered,
}) => {
  const typeHandler = (event) => {
    setTypeUserSelected(event.target.value);
  };

  const selectHandler = () => {
    const usersFilter = filterUsersByType(users, typeUserSelected);
    setUsersFiltered(usersFilter);
  };

  const filterUsersByType = (users, typeUserSelected) => {
    return typeUserSelected === "Todos"
      ? users
      : users.filter((user) => user.userType === typeUserSelected);
  };
  return (
    <div className="w-100">
      <div className="border rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
         <div className="d-flex align-items-center">
          <label  style={{ width: "330px" }}>Seleccione tipo de usuario:</label>
          <select className="mr-2 form-select" onChange={typeHandler} value={typeUserSelected}>
            <option value="Todos">Todos los usuarios</option>
            <option value="admin">Admins</option>
            <option value="client">Clientes</option>
          </select>
         </div>
         <button onClick={selectHandler} className="ml-3 btn btn-outline-dark">Filtrar</button> 
        </div>
      </div>
    </div>
  );
};

export default FilteredUsers;
