import React, {useState, useEffect} from "react";
import {FormattedMessage} from "react-intl"

import "./foro.css";


function Foro(props) {

    const [titulo, setTitulo] = useState();
    const [descripcion, setDescripcion] = useState();
    const [dieta, setDieta] = useState(false);
    const [foros, setForos] = useState([]);
    const [errorTitulo, setErrorTitulo] = useState(null);
    const [errorDescripcion, setErrorDescripcion] = useState(null);
    const [estadoT, setEstadoT] = useState("nada");
    const [estadoD, setEstadoD] = useState("nada");

    function poblarForo(){
      fetch("http://localhost:3001/entradas",{
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer " + props.token["token"],
            Accept: "application/json",
        },
      }).then((res) => {
          return res.json();

      }).then( res => {
          setForos(res);
      });

    }

    function checkTitle(valor){
      setTitulo(valor);
      if(!valor.replace(/\s/g, '')){
        setErrorTitulo("Invalid");
      } else {
        setErrorTitulo(null)
        setEstadoT("correcto");
      }

    }

    function checkDescription(valor){
      setDescripcion(valor);
      if(!valor.replace(/\s/g, '')){
        setErrorDescripcion("Invalid");
      } else {
        setErrorDescripcion(null);
        setEstadoD("correcto");
      }

    }



    useEffect(() => {
      if (!navigator.onLine) {
        if (localStorage.getItem("foros") === null){
          setForos("Cargando entradas del foro ...");
        } else {setForos(JSON.parse(localStorage.getItem("foros")));
            }
      }
      else{
        fetch("http://localhost:3001/entradas",{
          method: "GET",
          headers: {
              "Content-Type":"application/json",
              Authorization: "Bearer " + props.token["token"],
              Accept: "application/json",
          },
      }).then((res) => {
          return res.json();
      }).then( res => {
          setForos(res);
          localStorage.setItem("foros", JSON.stringify(res));
      });
      }


      }, [props.token]);

    let contenidoForos;

    if(!foros || foros.length === 0) {
        contenidoForos = (
            <div>
            </div>
        );
    }
    else if(typeof foros === 'string'){
      contenidoForos = (<div>
        <h3><FormattedMessage id={foros}></FormattedMessage></h3>
      </div>);
    }
    else {
        contenidoForos = (
            <div>
                {
                    foros.map((foro) =>(
                        
                        <div className="card mb-2" key = {foro.id}>
                            <div className="card-body p-2 p-sm-3">
                                <div className="media forum-item">
                                    <h5>{foro.autor}</h5>
                                    <h6>{<FormattedMessage id={renderElement(foro)}></FormattedMessage>}</h6>
                                    <div className="media-body">
                                        <h4>{foro.titulo}</h4>
                                        <p className="text-secondary">
                                            {foro.descripcion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    )
                }
                
            </div>
        );

    }

    function renderElement(el){
        if(el.dieta)
           return "dieta";
        return "publicacion";
    }

    async function createEntrada(titulo, autor, descripcion, dieta){
        
      return fetch("http://localhost:3001/entradas", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token["token"],
          },
          body: JSON.stringify({titulo, autor, descripcion, dieta})
        })
        .then(data => data.json())
      }

    async function asociarEntrada(id1, id2){
        return fetch("http://localhost:3001/entradas/"+id1+"/usuarios/"+id2, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token["token"],
          },
        })
        .then(data => data.json())
      }

    function updateStateDieta1() {
        
        document.getElementById("check1").checked  = true;
        document.getElementById("check2").checked  = false;
        setDieta(false);       
    }

    function updateStateDieta2() {     
        document.getElementById("check2").checked  = true;
        document.getElementById("check1").checked  = false;
        setDieta(true);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (navigator.onLine) {
          const entrada = await createEntrada(
              titulo,
              props.usuario["nombre"],
              descripcion,
              dieta
          ).catch(e);
          await asociarEntrada(
              entrada["id"], 
              props.usuario["id"]
          );
          poblarForo()
        }
        
    }

    function cerrarModal(){
        document.getElementById("btnCancelarEntrada").click();
    }

    return (
        <div id="contenedorForo" className="container-fluid p-0">
            <div className="main-body p-0">  
    <div className="inner-wrapper">
        <div id="inner" className="inner-sidebar">
            <div className="inner-sidebar-body p-0">
                <div className="p-3 h-100" data-simplebar="init">
                    <div className="simplebar-wrapper" id="style1" >
                        <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div>
                        
                        <div className="simplebar-mask" id="style2" >
                                <div className="inner-sidebar-header justify-content-center"> 
                                    <button id="style3" className="btn" type="button" data-toggle="modal" data-target=".modal">
                                        <FormattedMessage id="nuevaDiscucion"></FormattedMessage>
                                    </button>
                                </div>
                        </div>  
                        <div className="simplebar-mask">
                            <div className="simplebar-offset" id="style4" >
                                <div className="simplebar-content-wrapper" id="style5" >
                                    <div className="simplebar-content" id="style6" >
                                        <nav className="nav nav-pills nav-gap-y-1 flex-column">
                                            <button className="nav-link nav-link-faded has-icon" ><FormattedMessage id="publicaciones"></FormattedMessage></button>
                                        </nav>
                                    </div>
                                    <div className="simplebar-placeholder" id="style7" ></div>
                                </div>
                            </div>
                        </div>

                        <div className="simplebar-placeholder" id="style7" ></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="inner-main">
            <div className="inner-main-body p-2 p-sm-3 collapse forum-content show" id="style12">
                {contenidoForos}
            </div>
        </div>
    </div>
  
</div>
<div
        id="myModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
            <h3 id="hazPublicacion"><FormattedMessage id="hazUnaPublicacion"></FormattedMessage></h3>
              <button
                id="cerrarModal"
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div className="col-md-12">
              <div id="regisForm" className="registration-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <h5><FormattedMessage id="tituloPublicacion"></FormattedMessage></h5>
                    <input
                      type="text"
                      className="form-control item"
                      id="titulo"
                      onChange={e=>checkTitle(e.target.value)}
                    />
                    {errorTitulo !==null? <p style={{color: "red"}}> <FormattedMessage id={errorTitulo}></FormattedMessage></p>: <p style={{color: "green"}}> <FormattedMessage id={estadoT}></FormattedMessage></p>}
                  </div>
                  <div className="form-group">
                    <h5><FormattedMessage id="descripcionPublicacion"></FormattedMessage></h5>
                    <textarea
                      type="text"
                      className="form-control item"
                      id="descripcion"
                      onChange={e=>checkDescription(e.target.value)}
                    />
                    {errorDescripcion !==null? <p style={{color: "red"}}> <FormattedMessage id={errorDescripcion}></FormattedMessage></p>: <p style={{color: "green"}}> <FormattedMessage id={estadoD}></FormattedMessage></p>}
                  </div>
                  <div id="checkBoxes" className="form-group">
                  <div>
                    <input type="checkbox" id="check1" name="publicaciones" defaultChecked onClick={updateStateDieta1}/>
                    <label htmlFor="publicaciones"><FormattedMessage id="publicaciones"></FormattedMessage></label>
                  </div>
                  <div>
                    <input type="checkbox" id="check2" name="dietas" onClick={updateStateDieta2}/>
                    <label htmlFor="dietas"><FormattedMessage id="dietas"></FormattedMessage></label>
                  </div>
                  </div>

                  
                  <div className="form-group">
                    <button type="submit" id="btnCrearEntrada" className="btn" onClick={cerrarModal}>
                    <FormattedMessage id="crear"></FormattedMessage>
                    </button>
                    <button id="btnCancelarEntrada" className="btn" data-dismiss="modal" aria-label="Close">
                    <FormattedMessage id="cancelar"></FormattedMessage>
                    </button>
                   

                  </div>
                </form>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default Foro;