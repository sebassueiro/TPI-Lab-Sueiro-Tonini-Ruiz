import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListUsers from "../listUsers/ListUsers";
import FilteredUsers from "../filteredUsers/FilteredUsers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [typeUserSelected, setTypeUserSelected] = useState("Todos");
  const [usersFiltered, setUsersFiltered] = useState([]);

  const navigate = useNavigate();
  const translate = useTranslation();

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
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast.success(translate("alert_delete_user"));
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsersFiltered(updatedUsers);
        } else {
          toast.error(translate("alert_delete_user_error"));
          throw new Error(translate("alert_delete_user_error"));
        }
      })
      .catch((error) => console.error(error));
  };

  const createUserHandler = () => {
    navigate("/createUser");
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
          onClick={createUserHandler}
        >
          {translate("create_admin")}
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

export default ManageUser;
