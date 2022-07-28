import "./navbar.css";
import logo from "../../assets/LogoNutrispecialist.png";
import {useAuth0} from "@auth0/auth0-react";
import { FormattedMessage } from "react-intl";
import {useEffect } from "react";



function Navbar({removeCookies}) {
    const {logout} = useAuth0();

    function onClick() {
        logout({returnTo: window.location.origin});
        removeCookies();
    }

    function bold(e) {
        e.target.style.color = 'white';
    }
    function normal(e) {
        
        if(window.location.pathname === "/nutricionistas"){
            console.log(e.target.id)
            if(!e.target.id.toLowerCase().includes("especialista")){
                e.target.style.color = '#6F6D69';  
            }
        }
        else{
            if(!e.target.id.toLowerCase().includes(window.location.pathname.substring(1))){
                e.target.style.color = '#6F6D69';  
            }
        }
    }

    useEffect(() => {
        let location = window.location.pathname

        if(location.includes("balance")){
            document.getElementById("opcionBalance").style.color = "white";
        }
        else if(location.includes("nutricionistas")){
            document.getElementById("opcionEspecialista").style.color = "white";
        }
        else if(location.includes("foro")){
            document.getElementById("opcionForo").style.color = "white"
        }
        
      }, []);

    
    return (
        <div>
            <nav id="navHomePage" className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/#">
                    <img
                        id="logo"
                        src={logo}
                        alt="Logo"
                    />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav nav-fill w-100">
                    <li className="nav-item">
                            <a id="opcionBalance" className="nav-link active" href="/balance" onMouseOver={bold} onMouseLeave={normal} style={{color: "#6F6D69"}}>
                                <FormattedMessage id="balanceNutricional"/>
                            </a>
                    </li>
                    <li className="nav-item">
                                <a
                                id="opcionEspecialista"
                                className="nav-link"
                                href="/nutricionistas" onMouseOver={bold} onMouseLeave={normal} style={{color: "#6F6D69"}}>
                                    <FormattedMessage id="nutricionistas"/>
                                </a>
                    </li>
                    <li className="nav-item">
                            <a id="opcionForo" className="nav-link" href="/foro" onMouseOver={bold} onMouseLeave={normal} style={{color: "#6F6D69"}}>
                            <FormattedMessage id="foro"/>
                            </a>
                    </li>
                    <li className="nav-item">
                            <a id="opcionAlimento" className="nav-link" href="/alimento" onMouseOver={bold} onMouseLeave={normal} style={{color: "#6F6D69"}}>
                            <FormattedMessage id="alimento"/>
                            </a>
                    </li>
                    <li className="nav-item">
                            <a id="opcionSalir" className="nav-link" href="/" 
                            onClick={onClick} onMouseOver={bold} onMouseLeave={normal} style={{color: "#6F6D69"}}>
                                <FormattedMessage id="salir"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;