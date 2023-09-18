import React from 'react'
import { Button } from 'react-bootstrap'

const Login = () => {
  return (
    <div>
      <div>
        <label>Mail:</label>
        <input/>
      </div>
      <div>
        <label>Contrseña:</label>
        <input/>
      </div>
      <div>
        <Button>Iniciar sesion</Button>
        <Button>Registrarse</Button>
      </div>
    </div>
  )
}

export default Login