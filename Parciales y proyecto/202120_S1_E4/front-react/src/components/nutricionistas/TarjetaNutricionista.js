import "./tarjetaNutricionista.css";
import { FormattedMessage } from "react-intl";

function TarjetaNutricionista(props) {

    let calificacion = <p id="cardNutricionist1"><FormattedMessage id="calificacion"/> {props.nutricionista.calificacion}</p>;
    if(props.review) {
        calificacion = <p id="cardNutricionist1"> <FormattedMessage id="horaDeRaitear"/></p>
    }
    
    return (
        <div className="tarjeta-nutricionista card col-6">
            <div className="titulo-tarjeta">
                <h4 className="card-title">{props.nutricionista.nombre}</h4>
            </div>
            <img
                className="card-img-top"
                src={props.nutricionista.foto}
                alt={`Foto de ${props.nutricionista.nombre}`}
            />
            <div className="card-body">
                <p id="cardNutricionist2" style={{fontSize:"5px"}}>
                <FormattedMessage id="especializacion"/> <br/>
                    {props.nutricionista.especializacion != null ? 
                    props.nutricionista.especializacion : "Sin especialización"}
                </p>
                <p id="cardNutricionist3"><FormattedMessage id="aniosExp"/> {props.nutricionista.experiencia}</p>
                {calificacion}
                <button><FormattedMessage id="contactale"/></button>
            </div>
        </div>
    );
}

export default TarjetaNutricionista;