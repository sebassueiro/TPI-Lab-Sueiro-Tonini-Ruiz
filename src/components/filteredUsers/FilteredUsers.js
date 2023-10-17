import React from "react";
import { Button, Col, Row } from "react-bootstrap";

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
    <div>
      <Row>
        <Col className="col-3">
          <label>Seleccione tipo de usuario: </label>
          <select onChange={typeHandler} value={typeUserSelected}>
            <option value="Todos">Todos los usuarios</option>
            <option value="admin">Admins</option>
            <option value="client">Clientes</option>
          </select>
        </Col>
        <Col>
          <Button onClick={selectHandler}>Filtrar</Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilteredUsers;
