import React, { useEffect, useState } from "react";
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
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsersFiltered(updatedUsers);
        } else {
          throw new Error("No se pudo eliminar el usuario.");
        }
      })
      .catch((error) => console.error(error));
  };

  const createAdminHandler = () => {
    navigate("/createAdmin");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100  p-4">
      <FilteredUsers
        typeUserSelected={typeUserSelected}
        setTypeUserSelected={setTypeUserSelected}
        users={users}
        setUsersFiltered={setUsersFiltered}
      />

      <ListUsers users={usersFiltered} deleteUserHandler={deleteUserHandler} /> 

      <div className="d-flex mt-3">
        <button className="m-2 btn btn-outline-dark" onClick={createAdminHandler} >Crear Admin</button>
        <button className="m-2 btn btn-outline-dark" onClick={() => {navigate("/");}}>Volver al menu</button> 
      </div>
    </div> 
  );
};

export default ManageUser;
