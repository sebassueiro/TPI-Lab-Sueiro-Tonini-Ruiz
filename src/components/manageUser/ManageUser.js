import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import ListUsers from "../listUsers/ListUsers";
import FilteredUsers from "../filteredUsers/FilteredUsers";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [typeUserSelected, setTypeUserSelected] = useState("Todos");
  const [usersFiltered, setUsersFiltered] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((usersData) => {
        setUsers(usersData);
        setUsersFiltered(usersData);
        console.log(usersData);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteUserHandler = (id) => {
    alert(id);

    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Usuario con ID ${id} eliminado con éxito.`);
          // Puedes realizar cualquier acción adicional que necesites aquí
        } else {
          throw new Error("No se pudo eliminar el usuario.");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Row className="d-flex justify-content pb-4 pt-2">
        <Col className="d-flex justify-content pb-4 pt-2">
          <h1>Administrar usuarios</h1>
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
      <FilteredUsers
        typeUserSelected={typeUserSelected}
        setTypeUserSelected={setTypeUserSelected}
        users={users}
        setUsersFiltered={setUsersFiltered}
      />
      <ListUsers users={usersFiltered} deleteUserHandler={deleteUserHandler} />
    </div>
  );
};

export default ManageUser;
