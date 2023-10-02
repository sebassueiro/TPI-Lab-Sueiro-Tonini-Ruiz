import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const changeLastNameHandler = (event) => {
    setLastName(event.target.value);
  };
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => console.log(error));
  }, []);

  const addUserHandler = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("Complete todos los campos");
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      const newUserId = users[users.length - 1].id + 1;

      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: newUserId,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password,
          userType: "client",
        }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else {
            throw new Error("The response had some errors");
          }
        })
        .then(() => {
          const newUserArray = [{ ...newUser, id: newUserId }, ...users];
          setUsers(newUserArray);
        })
        .catch((error) => console.log(error));

      //onSaveUser(newUser);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      navigate ("/")
    }
  };
  return (
    <div className="bg-body-secondary d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 pb-2 rounded-5 text-secondary shadow">
        <div className="text-center fs-1 fw-bold">Crea tu cuenta</div>
        <div className="input-group mt-4">
          <input
            onChange={changeFirstNameHandler}
            className="form-control bg-light"
            type="text"
            placeholder="Nombre"
          />
        </div>
        <div className="input-group mt-4">
          <input
            onChange={changeLastNameHandler}
            className="form-control bg-light"
            type="text"
            placeholder="Apellido"
          />
        </div>
        <div className="input-group mt-4">
          <input
            onChange={changeEmailHandler}
            className="form-control bg-light"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="input-group mt-4">
          <input
            onChange={changePasswordHandler}
            className="form-control bg-light"
            type="Password"
            placeholder="Contraseña"
          />
        </div>
        <div className="d-grid gap-2 col-12 mx-auto mt-4">
          <button onClick={addUserHandler} className=" btn btn-outline-dark ">
            Registrar
          </button>
        </div>
        <p class="d-flex justify-content-center mt-4">
          Iniciar sesion{" "}
          <Link
            to="/login"
            className="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            Click aqui!
          </Link>
        </p>
        <p class="d-flex justify-content-center mt-4"><Link to="/"
            className="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Volver a la tienda</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
