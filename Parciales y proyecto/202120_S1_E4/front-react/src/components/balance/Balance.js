import "./balanceN.css";
import React, {useState, useEffect} from "react";
import imagenMenuPrincipal from "../../assets/imagenMenuPrincipal.png";
import comida1 from "../../assets/comida1.png";
import comida2 from "../../assets/comida2.png";
import plato1 from "../../assets/plato1.png";
import plato2 from "../../assets/plato2.png";
import reminderOff from "../../assets/reminderOff.jpg";
import reminderOn from "../../assets/reminderOn.jpg";
import Chart from "./Chart.js";
import { FormattedMessage } from "react-intl";

function Balance(props){
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("progreso") === null){
        setData("Cargando balance");
      } else {setData(JSON.parse(localStorage.getItem("progreso")));
          }
    }

    else{
      fetch("http://localhost:3001/progreso",{
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer " + props.token["token"],
            Accept: "application/json",
        },
      }).then(res => res.json()).then(res => {
        setData(res);
        localStorage.setItem("progreso", JSON.stringify(res));
      });
    }
    
  }, [props.token]);

  return (
    <div className="container-fluid">
      <div className="row">
          <img
            id="imagenMenuPrincipal"
            src={imagenMenuPrincipal}
            alt="menuPrincipal"
          />
          <div id="tituloMenuPrincipal"><FormattedMessage id="menuPrincipal"/></div>
        </div>
      <br/>
      <div className="row">
        <div className="col-md-9">
          <div className="card border-light">
            <div className="card-body">
              <h2 className="card-title fw-bold"><FormattedMessage id="balanceNutricional"/></h2>
              <div className="dropdown" id="seleccionarTiempo">
                <a
                  className="btn btn-secondary dropdown-toggle"
                  href="#/"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <FormattedMessage id="tiempo"/>
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a className="dropdown-item" href="/#"><FormattedMessage id="diario"/></a></li>
                  <li><a className="dropdown-item" href="/#"><FormattedMessage id="semanal"/></a></li>
                  <li><a className="dropdown-item" href="/#"><FormattedMessage id="mensual"/></a></li>
                </ul>
              </div>
            </div>
            <div id="ChartProgreso">
              {typeof data === 'string'?(<div>
                <h4 id= "cargandoBalance"><FormattedMessage id="Cargando ..."/></h4>
                </div>):
                <Chart datos={data} usuario={props.usuario}/>
              }
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-light">
            <div className="card-body" id="tuDieta">
              <h5 className="card-title"><FormattedMessage id="tuDieta"/></h5>
              <a href="#/" className="btn btn-secondary" id="tuDietaEdit"><FormattedMessage id="editar"/></a>
            </div>
          </div>
          <br />
          <div className="card border-light">
            <div className="card-body">
              <h5 className="card-title fw-bold"><FormattedMessage id="hoy"/></h5>
              <div className="dropdown" id="seleccionarComida">
                <a
                  className="btn btn-secondary dropdown-toggle"
                  href="#/"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <FormattedMessage id="comida"/>
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a className="dropdown-item" href="#/"><FormattedMessage id="desayuno"/></a></li>
                  <li><a className="dropdown-item" href="#/"><FormattedMessage id="almuerzo"/></a></li>
                  <li><a className="dropdown-item" href="#/"><FormattedMessage id="cena"/></a></li>
                </ul>
              </div>
              <br />
              <div className="card shadow p-3 mb-5 bg-body" id="comida1">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={comida1}
                      className="img-fluid rounded-start"
                      alt="comida 1"
                      id="imagenComida1"
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title"><FormattedMessage id="sushi"/></h5>
                      <p className="card-text">
                        <small className="text-muted"><FormattedMessage id="hoy"/> | 7am</small>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <img
                      src={reminderOff}
                      className="img-fluid rounded-circle"
                      alt="recordatorio apagado"
                      id="recordatorio1"
                    />
                  </div>
                </div>
              </div>
              <div className="card shadow p-3 mb-5 bg-body" id="comida2">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={comida2}
                      className="img-fluid rounded-start"
                      alt="comida 2"
                      id="imagenComida2"
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title"><FormattedMessage id="teVerde"/></h5>
                      <p className="card-text">
                        <small className="text-muted"><FormattedMessage id="hoy"/> | 8am</small>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <img
                      src={reminderOn}
                      className="img-fluid rounded-circle"
                      alt="recordatorio apagado"
                      id="recordatorio2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="card border-light">
            <div className="card-body">
              <h5 className="card-title fw-bold"><FormattedMessage id="platos"/></h5>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card" id="plato1">
                  <img
                    src={plato1}
                    className="card-img-top mx-auto"
                    alt="plato 1"
                    id="imagenPlato1"                    
                  /><br/>
                  <div className="card-body">
                    <h5 className="card-title"><FormattedMessage id="pie"/></h5>
                    <br />
                    <a href="#/" className="btn btn-secondary" id="seleccionarPlato1"><FormattedMessage id="seleccionar"/></a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card" id="plato2">
                  <img
                    src={plato2}
                    className="card-img-top mx-auto"
                    alt="plato 2"
                    id="imagenPlato2"
                  /><br/>
                  <div className="card-body">
                    <h5 className="card-title"><FormattedMessage id="panecook"/></h5>
                    <br/>
                    <a href="#/" className="btn btn-secondary" id="seleccionarPlato2"><FormattedMessage id="seleccionar"/></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Balance;