import React from 'react'
import './Login.css'
import login_icon from '../images/login-icon.svg'
import username_icon from '../images/username-icon.svg'
import password_icon from '../images/password-icon.svg'   
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div className="bg-body-secondary d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 pb-3 rounded-5 text-secondary shadow">
        <div className="d-flex justify-content-center">
          <img id='login-icon'
            src={login_icon}
            alt="login-icon"
          />
        </div>
        <div className="text-center fs-1 fw-bold">Ingresa a tu cuenta</div>
        <div className="input-group mt-4">
          <div className="input-group-text bg-dark">
            <img
             id='username-icon'
             src={username_icon}
             alt="username-icon"
            />
          </div>
          <input
            className="form-control bg-light"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="input-group mt-3">
        <div class="input-group-text bg-dark">
          <img
           id='password-icon'
            src={password_icon}
            alt="password-icon"
          />
        </div>
        <input
          class="form-control bg-light"
          type="password"
          placeholder="Contraseña"
        />
      </div>
      <div class=" d-grid gap-2 col-12 mx-auto mt-4">
        <div class=" d-grid">
          <button className=' btn btn-outline-dark '>Iniciar sesion</button>
        </div>
      </div>
      <p class="d-flex justify-content-center mt-4">
        ¿No tienes cuenta?<Link to="/signup" className='ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>Crea tu cuenta!</Link>
      </p>
      <p class="d-flex justify-content-center mt-4"><Link to="/"
            className="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Volver a la tienda</Link>
        </p>
     </div>  
    </div>  
  )
}

export default Login