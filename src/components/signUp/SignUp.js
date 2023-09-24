import React from 'react'
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className='bg-body-secondary d-flex justify-content-center align-items-center vh-100'>
      <div className="bg-white p-5 rounded-5 text-secondary shadow">
        <div className="text-center fs-1 fw-bold">Crea tu cuenta</div>
        <div className="input-group mt-4">
          <input className="form-control bg-light" type="text" placeholder="Primer Nombre" />
        </div>
        <div className="input-group mt-4">
          <input className="form-control bg-light" type="text" placeholder="Apellido" />
        </div>
        <div className="input-group mt-4">
          <input className="form-control bg-light" type="email" placeholder="Email" />
        </div>
        <div className="input-group mt-4">
          <input className="form-control bg-light" type="Password" placeholder="Contraseña" />
        </div>
        <div className="d-grid gap-2 col-12 mx-auto mt-4">
          <button className=' btn btn-outline-dark '>Sign Up</button>
        </div>
        <p class="d-flex justify-content-center mt-4">Iniciar seccion <Link to="/login" className='ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>Sign In</Link></p>
      </div>
    </div>
  )
}

export default SignUp