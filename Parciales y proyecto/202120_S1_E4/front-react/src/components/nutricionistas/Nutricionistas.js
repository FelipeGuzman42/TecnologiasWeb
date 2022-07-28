import React, { useState, useEffect } from "react";
import "./nutricionistas.css";
import Buscador from "./Buscador";
import TarjetaNutricionista from "./TarjetaNutricionista";
import { FormattedMessage } from "react-intl";

function Nutricionistas(props) {

  // Sugeridos está para que nunca esté vacía la parte de buscados.
  const [sugeridos, setSugeridos] = useState([]);
  // Buscados son las repuestas a las búsquedas o los que hay por defecto (sugeridos).
  const [buscados, setBuscados] = useState([]);
  // Últimos son los especialistas a los que ha asistido el cliente en citas médicas.
  const [ultimos, setUltimos] = useState([]);
  // Título del panel del medio.
  const [tituloBusqueda, setTituloBusqueda] = useState("Sugeridos");

  function filtrarNutricionistas(filtrado, valores){
    if(filtrado === true){
      let {nombre, experiencia, calificacion, especializacion, ordenar} = valores;
      if(ordenar === undefined) ordenar = 'sin'

      if(typeof sugeridos === "string"){
        setBuscados("Cargando nutricionistas...");
      }

      function filtros(sugerido) {
        let resultado = true;
        if(nombre) {
          resultado &= false;
          let nombres = nombre.toLowerCase().split(" ");
          nombres.forEach(n => {
            resultado |= sugerido.nombre.toLowerCase().includes(n);
          });
        }
        if(experiencia) resultado &= sugerido.experiencia >= parseInt(experiencia);
        if(calificacion) resultado &= sugerido.calificacion >= parseInt(calificacion);
        if(especializacion) resultado &= sugerido.especializacion !== null;
        return resultado;
      }

      const encontrados = sugeridos.filter(filtros);
      if(ordenar !== 'sin') {
        encontrados.sort((first, sec) => {
          if(first[ordenar] > sec[ordenar]) return -1;
          else if(first[ordenar] < sec[ordenar]) return 1;
          else {return -0};
        })
      }
      setTituloBusqueda(encontrados.length === 0 ? 'No se encontraron nutricionistas': 'Resultado de búsqueda');
      setBuscados(encontrados);
    }
    else{
      return sugeridos;
    }

  }

  /*
  Función que se activa cuando el usuario cancela la búsqueda de nutricinoistas, hace que buscados 
  adopte su valor por defecto, sugeridos.
  */
  function borrarBuscados() {
    setBuscados(sugeridos);
    setTituloBusqueda("Sugeridos");
  }

  useEffect(() => {
    // Parte encargada de inicializar últimos.
    if (!navigator.onLine) {
      if (localStorage.getItem("ultimos") === null){
        setUltimos("Cargando ...");
      } else {setUltimos(JSON.parse(localStorage.getItem("ultimos")));
          }

      if (localStorage.getItem("sugeridos") === null){
        setSugeridos("Cargando nutricionistas ...");
      } else {setSugeridos(JSON.parse(localStorage.getItem("sugeridos")));
          }

      if (localStorage.getItem("buscados") === null){
        setBuscados("Cargando nutricionistas ...");
      } else {setBuscados(JSON.parse(localStorage.getItem("buscados")));
          }
    }
    else{
      fetch(`http://localhost:3001/usuarios/${props.usuario["id"]}/nutricionistas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token["token"],
          Accept: "application/json",
        },
      }).then((res) => res.json()).then(res => {
        setUltimos(res);
        localStorage.setItem("ultimos", JSON.stringify(res));

      });

      fetch('http://localhost:3001/nutricionistas', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token["token"],
          Accept: "application/json",
        },
      }).then((res) => res.json()).then(res => {
        setSugeridos(res);
        localStorage.setItem("sugeridos", JSON.stringify(res));
        setBuscados(res);
        localStorage.setItem("buscados", JSON.stringify(res));
      });
    }
  }, [props.token, props.usuario]);

  return (
    <div className="nutricionistas">
      <div className="banner">
          <h1><FormattedMessage id="nutricionistas"/></h1>
      </div>
      <main className="container">
        <div className="contenido-principal row">
          <Buscador
            borrarBuscados={borrarBuscados}
            filtrarNutricionistas={filtrarNutricionistas}
            className="col-3 mt-3"
          />
          <div className="buscados col-6 mt-3 p-0">
            <div className="contenido">
              <h2><FormattedMessage id={tituloBusqueda}/></h2>
              <div className="cartas">
                { typeof buscados === 'string'? <div> <h3><FormattedMessage id={buscados}/> </h3></div>:
                  buscados.slice(0, 6).map(nutricionista => (<TarjetaNutricionista nutricionista={nutricionista} key={nutricionista.id} />))
                }
              </div>
            </div>
          </div >
          <div className="ultimos col-3 mt-3 p-0">
            <div className="contenido">
              <h2><FormattedMessage id="historial"/></h2> 
              <div className="cartas">
                { typeof ultimos === 'string'? <div> <h3><FormattedMessage id={ultimos}/></h3> </div>:
                  ultimos.map(nutricionista => (<TarjetaNutricionista nutricionista={nutricionista} key={nutricionista.id} review={true} />))
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Nutricionistas;
