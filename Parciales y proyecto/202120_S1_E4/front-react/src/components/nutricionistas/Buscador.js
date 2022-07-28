import React, { useState, useEffect } from "react";
import "./buscador.css";
import { FormattedMessage, useIntl} from "react-intl";

function Buscador(props) {

    const intl = useIntl();

    const [busqueda, setBusqueda] = useState(false);
    const [botonADesplegar, setBotonADesplegar] = useState();
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroExperiencia, setFiltroExperiencia] = useState(0);
    const [filtroRaiting, setFiltroRaiting] = useState(0);
    const [filtroEspecializacion, setFiltroEspecializacion] = useState(false);
    const [filtroOrdenar, setFiltroOrdenar] = useState();

    useEffect(() => {
        if (busqueda) {
            setBotonADesplegar(
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                        setBusqueda(false);
                        props.borrarBuscados();
                    }
                    }>
                    <FormattedMessage id="borrarBusqueda"/>
                </button>
            );
        } else {
            setBotonADesplegar(
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        setBusqueda(true);
                        props.filtrarNutricionistas(true,{ 
                            nombre: filtroNombre, 
                            experiencia: filtroExperiencia, 
                            calificacion: filtroRaiting,
                            especializacion: filtroEspecializacion,
                            ordenar: filtroOrdenar
                        });
                    }}>
                    <FormattedMessage id="buscar"/>
                </button>
            );
        }
    }, [busqueda, filtroExperiencia, filtroNombre, filtroRaiting, filtroOrdenar, filtroEspecializacion, props]);

    return (
        <div className={"buscador " + props.className}>
            <h2><FormattedMessage id="buscador"/></h2>
            <div className="filtros">
                <div className="filtro filtro-nombre">
                    <label htmlFor="nombre"><FormattedMessage id="nombreOpcional"/></label>
                    <input
                        name="nombre"
                        type="search"
                        placeholder={intl.formatMessage({id: "nombre"})}
                        aria-label="Filtro nombre"
                        onChange={e => setFiltroNombre(e.target.value)}
                    />
                </div>
                <div className="filtro filtro-experiencia">
                    <label htmlFor="experiencia"><FormattedMessage id="experienciaMinima"/></label>
                    <input
                        name="experiencia"
                        type="number"
                        min="0"
                        max="20"
                        placeholder="0"
                        aria-label="Filtro experiencia"
                        onChange={e => {
                            // Hay que validar que el valor no sea vacío.
                            setFiltroExperiencia(e.target.value !== "" ? parseInt(e.target.value) : 0)
                        }}
                    />
                </div>
                <div className="filtro filtro-raiting">
                    <label htmlFor="raiting"><FormattedMessage id="raitingMinimo"/></label>
                    <input
                        name="raiting"
                        type="number"
                        min="0"
                        max="5"
                        placeholder="0"
                        aria-label="Filtro raiting"
                        onChange={e => {
                            // Hay que validar que el valor no sea vacío.
                            setFiltroRaiting(e.target.value !== "" ? parseInt(e.target.value) : 0)
                        }}
                    />
                </div>
                <div className="filtro filtro-especializado">
                    <label htmlFor="especializado"><FormattedMessage id="requerirEspecializacion"/></label>
                    <input
                        name="especializado"
                        type="checkbox"
                        aria-label="Filtro especialización"
                        onChange={e => {
                            setFiltroEspecializacion(e.target.checked)
                        }}
                    />
                </div>
                <div className="filtro filtro-ordenar">
                    <label htmlFor="ordenar"><FormattedMessage id="ordenarNutricionistas"/></label>
                    <select
                        name="ordenar"
                        aria-label="Filtro ordenar"
                        onChange={e => {
                            setFiltroOrdenar(e.target.value)
                        }}
                    >
                        <option value="sin">{intl.formatMessage({id: "opcionTableNombre"})}</option>
                        <option value="experiencia">{intl.formatMessage({id: "opcionTableExperiencia"})}</option>
                        <option value="calificacion">{intl.formatMessage({id: "opcionTableCalificacion"})}</option>
                    </select>
                </div>
                <div className="botones">
                    {botonADesplegar}
                </div>
            </div>
        </div>
    );
}

export default Buscador;