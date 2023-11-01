import React, { useContext, useEffect, useRef, useState } from "react";
import "./Login.css";
import login_icon from "../images/login-icon.svg";
import username_icon from "../images/username-icon.svg";
import password_icon from "../images/password-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTranslation from "../../custom/useTranslation/useTranslation";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const { handleLogin } = useContext(AuthenticationContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
      })
      .catch((error) => console.log(error));
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
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

  const userFilter = users.filter((user) => {
    return user.email === email && user.password === password;
  });
  const loginButtonHandler = () => {
    if (email === "" || validateEmail(email) === false || password === "") {
      toast.error(translate("alert_empty_fields"));
      if (email === "" || validateEmail(email) === false) {
        emailRef.current.style.borderColor = "red";
        emailRef.current.style.outline = "none";
      }
      if (password === "") {
        passwordRef.current.style.borderColor = "red";
        passwordRef.current.style.outline = "none";
      }
    }
    if (userFilter.length === 0) {
      toast.error("Usuario no encontrado");
    } else {
      var userType = "";
      userFilter.map((user) => (userType = user.userType));
      handleLogin(email, userType);
      navigate("/");
    }
  };

  return (
    <div className="bg-body-secondary d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 pb-3 rounded-5 text-secondary shadow">
        <div className="d-flex justify-content-center">
          <img id="login-icon" src={login_icon} alt="login-icon" />
        </div>
        <div className="text-center fs-1 fw-bold">
          {translate("log_in_account")}
        </div>
        <div className="input-group mt-4">
          <div className="input-group-text bg-dark">
            <img id="username-icon" src={username_icon} alt="username-icon" />
          </div>
          <input
            className="form-control bg-light"
            type="email"
            placeholder="Email"
            ref={emailRef}
            onChange={changeEmailHandler}
          />
        </div>
        <div class="input-group mt-3">
          <div class="input-group-text bg-dark">
            <img id="password-icon" src={password_icon} alt="password-icon" />
          </div>
          <input
            class="form-control bg-light"
            type="password"
            placeholder={translate("password")}
            ref={passwordRef}
            onChange={changePasswordHandler}
          />
        </div>
        <div class=" d-grid gap-2 col-12 mx-auto mt-4">
          <div class=" d-grid">
            <button
              className=" btn btn-outline-dark"
              onClick={loginButtonHandler}
            >
              {translate("login")}
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
        </div>
        <p class="d-flex justify-content-center mt-4">
          {translate("dont_account")}
          <Link
            to="/signup"
            className="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            {translate("create_account")}
          </Link>
        </p>
        <p class="d-flex justify-content-center mt-4">
          <Link
            to="/"
            className="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            {translate("back_to_shop")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
