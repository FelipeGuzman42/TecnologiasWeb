import React, {useState} from "react";

import "./login.css";

import foodImage from "../../assets/regFood.jfif";

async function loginUser(credentials){
  return fetch("http://localhost:3001/api/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

async function getUser(correo, token){
  return fetch("http://localhost:3001/usuarios/correo", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token["token"],
    },
    body: JSON.stringify(correo)
  })
  .then(data => data.json())
}

function Login({setToken, setUser}) {

  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      correo,
      password
    }); // respuesta de la petición post del login
    setToken(token);
    const user = await getUser(
      {correo},
      token
    );
    setUser(user); 
  }

    return (
        <div id="loginContainer" className="container-fluid p-0">
            <div className="row">
            <div className="col-md-12">
              <img id="regImage" src={foodImage} alt="regFood" />
            </div>
          </div>
           <div className="col-md-12" id="containerForm">
              <div className="registration-form">
                <form onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <h3 id="creaTuCuenta">Ingresa a tu cuenta</h3>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control item"
                      id="email"
                      placeholder="Correo"
                      onChange={e=>setCorreo(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control item"
                      id="password"
                      placeholder="Contraseña"
                      onChange={e=>setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" id="buttonRegister" className="btn">
                      Ingresa
                    </button>
                  </div>
                </form>
              </div>
            </div> 
        </div>
    );
}

export default Login;