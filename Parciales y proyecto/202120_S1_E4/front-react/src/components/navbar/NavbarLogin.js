import "./navbarlogin.css";
import Logo from "../../assets/LogoNutrispecialist.png";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl"


function NavbarLogin(props) {
  const {loginWithRedirect} = useAuth0();

  function bold(e) {
    e.target.style.color = 'white';
  }

  function normal(e) { 
    e.target.style.color = '#6F6D69';  
  }
   
  return (
        
        <div id="contenedorHome1" className="container-fluid p-0">
            <nav id="homepageTop" className="navbar navbar-expand">
            <div className="navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/">
                      <img
                        id="logoLogin"
                        src={Logo}
                        alt="Logo"
                      />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="navbar-collapse">
              <ul id="homeLogin" className="navbar-nav ms-auto">
                <li className="nav-item">
                    <button id="login" onMouseOver={bold} onMouseLeave={normal} style={{color: "#6F6D69"}} onClick={() => loginWithRedirect({redirect_uri: window.location.origin})}>
                      <FormattedMessage id="iniciaSesion"></FormattedMessage>
                      </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
    );
}

export default NavbarLogin;