import React, {useState} from "react";
import "./register.css";
import foodImage from "../../assets/regFood.jfif";

async function registerUser(credentials){
  return fetch("http://localhost:3001/usuarios", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

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

function Register({setToken, setUser}) {
    

  const [nombre, setNombre] = useState();
  const [edad, setEdad] = useState();
  const [estatura, setEstatura] = useState();
  const [peso, setPeso] = useState();
  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();
  
  
  const handleSubmit = async e => {
    e.preventDefault();
    await registerUser({
      nombre,
      edad,
      estatura,
      peso,
      correo,
      password
    });
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
        <div id="registrationContainer" className="container-fluid p-0">
             <div className="row">
            <div className="col-md-12">
              <img id="regImage" src={foodImage} alt="regFood" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div id="regForm" className="registration-form">
                <form id="form" onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <h3 id="creaTuCuenta">Crea tu cuenta</h3>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control item"
                      id="nombre"
                      placeholder="Nombre"
                      onChange={e=>setNombre(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control item"
                      id="edad"
                      placeholder="Edad"
                      onChange={e=>setEdad(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control item"
                      id="estatura"
                      placeholder="Estatura"
                      onChange={e=>setEstatura(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control item"
                      id="peso"
                      placeholder="Peso"
                      onChange={e=>setPeso(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control item"
                      id="correo"
                      placeholder="Correo"
                      onChange={e=>setCorreo(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control item"
                      id="contrasena"
                      placeholder="Contraseña"
                      onChange={e=>setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" id="buttonRegister" className="btn">
                      Registrate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Register;