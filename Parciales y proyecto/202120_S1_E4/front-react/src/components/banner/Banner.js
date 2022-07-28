import "./banner.css";
import carouselImg1 from "../../assets/healthy_food.jpg";
import carouselImg2 from "../../assets/goals.jpg";
import carouselImg3 from "../../assets/doctor_and_patient.jpg";
import {useAuth0} from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl"


function Banner(props) { 
    const {loginWithRedirect} = useAuth0();
    
    return (    
    <div id="bannerContainer" className="container-fluid p-0">
          <div id="contenedorHome" className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <div className="carousel slide" id="carousel-248002">
                            <ol className="carousel-indicators">
                                <li data-slide-to="0" data-target="#carousel-248002"></li>
                                <li
                                    data-slide-to="1"
                                    data-target="#carousel-248002"
                                    className="active"
                                ></li>
                                <li data-slide-to="2" data-target="#carousel-248002"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                    id="banner1"
                                    className="d-block w-100"
                                    alt="Carousel Bootstrap First"
                                    src={carouselImg1}
                                    />
                                    <div id="captionButton1" className="carousel-caption">
                                            <button
                                                id="btnDef1"
                                                type="button"
                                                className="btn btn-default"
                                                onClick={() => loginWithRedirect({redirect_uri: window.location.origin, screen_hint:"signup"})}
                                                >
                                                {<FormattedMessage id="unete"></FormattedMessage>}
                                            </button>
                                    </div>
                                    <div id="cap1" className="carousel-caption">
                                        <div className="row">
                                            <div id="textoBaner1" className="col-md-12">
                                                <h2 className="capTitle"> {<FormattedMessage id="comeBien"></FormattedMessage>}</h2>
                                                <p className="capDesc">
                                                    {<FormattedMessage id="caption1"></FormattedMessage>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                    id="banner2"
                                    className="d-block w-100"
                                    alt="Carousel Bootstrap Second"
                                    src={carouselImg2}
                                    />
                                    <div id="captionButton2" className="carousel-caption">
                                            <button
                                                id="btnDef2"
                                                type="button"
                                                className="btn btn-default"
                                                onClick={() => loginWithRedirect({redirect_uri: window.location.origin, screen_hint:"signup"})}
                                            >
                                                {<FormattedMessage id="unete"></FormattedMessage>}
                                            </button>
                                    </div>
                                    <div id="cap2" className="carousel-caption">
                                        <div className="row">
                                            <div id="textoBaner2" className="col-md-12">
                                                <h2 className="capTitle">{<FormattedMessage id="ponteMetas"></FormattedMessage>}</h2>
                                                <p className="capDesc">
                                                    {<FormattedMessage id="caption2"></FormattedMessage>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                    id="banner3"
                                    className="d-block w-100"
                                    alt="Carousel Bootstrap Third"
                                    src={carouselImg3}
                                    />
                                    <div id="captionButton3" className="carousel-caption">
                                            <button
                                                id="btnDef3"
                                                type="button"
                                                className="btn btn-default"
                                                onClick={() => loginWithRedirect({redirect_uri: window.location.origin, screen_hint:"signup"})}
                                            >
                                                {<FormattedMessage id="unete"></FormattedMessage>}
                                            </button>
                                    </div>
                                    <div id="cap3" className="carousel-caption">
                                        <div className="row">
                                            <div id="textoBaner3" className="col-md-12">
                                                <h2 className="capTitle">{<FormattedMessage id="hablaConUnEspecialista"></FormattedMessage>}</h2>
                                                <p className="capDesc">
                                                    {<FormattedMessage id="caption3"></FormattedMessage>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                            id="izquierda"
                            className="carousel-control-prev"
                            href="#carousel-248002"
                            data-slide="prev"
                            >
                                <span className="carousel-control-prev-icon"></span>
                                <span className="sr-only"></span>
                            </a>
                            <a
                            id="derecha"
                            className="carousel-control-next"
                            href="#carousel-248002"
                            data-slide="next"
                            >
                                <span className="carousel-control-next-icon"></span>
                                <span className="sr-only"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default Banner;
