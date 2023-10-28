import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const changeFirstNameHandler = (event) => {
    if (firstNameRef.current.value.length > 0) {
      firstNameRef.current.style.borderColor = "";
      firstNameRef.current.style.outline = "";
    }
    setFirstName(event.target.value);
  };
  const changeLastNameHandler = (event) => {
    if (lastNameRef.current.value.length > 0) {
      lastNameRef.current.style.borderColor = "";
      lastNameRef.current.style.outline = "";
    }
    setLastName(event.target.value);
  };
  const changeEmailHandler = (event) => {
    if (emailRef.current.value.length > 0) {
      emailRef.current.style.borderColor = "";
      emailRef.current.style.outline = "";
    }
    setEmail(event.target.value);
  };
  const changePasswordHandler = (event) => {
    if (passwordRef.current.value.length > 0) {
      passwordRef.current.style.borderColor = "";
      passwordRef.current.style.outline = "";
    }
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
      validateEmail(email) === false ||
      password === ""
    ) {
      toast.error("Complete correctamente los campos resaltados en rojo");
      if (firstName === "") {
        firstNameRef.current.style.borderColor = "red";
        firstNameRef.current.style.outline = "none";
      }
      if (lastName === "") {
        lastNameRef.current.style.borderColor = "red";
        lastNameRef.current.style.outline = "none";
      }
      if (validateEmail(email) === false || email === "") {
        emailRef.current.style.borderColor = "red";
        emailRef.current.style.outline = "none";
        // alert("Email invalido");
      }
      if (password === "") {
        passwordRef.current.style.borderColor = "red";
        passwordRef.current.style.outline = "none";
      }
    } else {
      if (users.some((user) => user.email === email)) {
        toast.error("El Email ya está en uso");
        emailRef.current.style.borderColor = "red";
        emailRef.current.style.outline = "none";
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
        navigate("/");
      }
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
            ref={firstNameRef}
          />
        </div>
        <div className="input-group mt-4">
          <input
            onChange={changeLastNameHandler}
            className="form-control bg-light"
            type="text"
            placeholder="Apellido"
            ref={lastNameRef}
          />
        </div>
        <div className="input-group mt-4">
          <input
            onChange={changeEmailHandler}
            className="form-control bg-light"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
        </div>
        <div className="input-group mt-4">
          <input
            onChange={changePasswordHandler}
            className="form-control bg-light"
            type="Password"
            placeholder="Contraseña"
            ref={passwordRef}
          />
        </div>
        <div className="d-grid gap-2 col-12 mx-auto mt-4">
          <button onClick={addUserHandler} className=" btn btn-outline-dark ">
            Registrar
          </button>
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
        <p class="d-flex justify-content-center mt-4">
          <Link
            to="/"
            className="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            Volver a la tienda
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
