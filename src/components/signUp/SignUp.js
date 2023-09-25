import React, { useState } from 'react'
import { Link } from "react-router-dom";

const SignUp = () => {

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const changeLastNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const changeEmailHandler = (event) => {
    setFirstName(event.target.value);
  };
  const changePasswordHandler = (event) => {
    setFirstName(event.target.value);
  };

  const addUserHandler () => {
    const newUser = {
      firstName,
      lastName,
      email,
      password
    };
  };
  
  return (
    <div className='bg-body-secondary d-flex justify-content-center align-items-center vh-100'>
      <div className="bg-white p-5 rounded-5 text-secondary shadow">
        <div className="text-center fs-1 fw-bold">Crea tu cuenta</div>
        <div className="input-group mt-4">
          <input onChange={changeFirstNameHandler} className="form-control bg-light" type="text" placeholder="Nombre"/>
        </div>
        <div className="input-group mt-4">
          <input onChange={changeLastNameHandler} className="form-control bg-light" type="text" placeholder="Apellido"/>
        </div>
        <div className="input-group mt-4">
          <input onChange={changeEmailHandler} className="form-control bg-light" type="email" placeholder="Email"/>
        </div>
        <div className="input-group mt-4">
          <input onChange={changePasswordHandler} className="form-control bg-light" type="Password" placeholder="Contraseña"/>
        </div>
        <div className="d-grid gap-2 col-12 mx-auto mt-4">
          <button onClick={addUserHandler} className=' btn btn-outline-dark '>Sign Up</button>
        </div>
        <p class="d-flex justify-content-center mt-4">Iniciar seccion <Link to="/login" className='ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>Sign In</Link></p>
      </div>
    </div>
  )
}

export default SignUp