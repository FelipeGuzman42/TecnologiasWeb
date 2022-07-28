import "./footer.css";
import {FormattedMessage} from "react-intl"

function Footer(props) {
    return (
        <>
        <footer className="text-center text-lg-start bg-light text-muted">

          <section className=" p-1 padding-top">
            <div className="container text-center text-md-start mt-5">
              
              <div className="row mt-3">
                
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3"></i>Nutrispecialist
                  </h6>
                  <p>
                      <FormattedMessage id="descFoot"/>
                  </p>
                </div>
                
        
               
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  
                  <h6 className="text-uppercase fw-bold mb-4">
                  <FormattedMessage id="redesSociales"/>
                  </h6>
                  <p>
                    <a href="http://www.facebook.com" className="text-reset">Facebook</a>
                  </p>
                  <p>
                    <a href="http://www.twitter.com" className="text-reset">Twitter</a>
                  </p>
                  <p>
                    <a href="http://www.instagram.com" className="text-reset">Instragram</a>
                  </p>
                  <p>
                    <a href="http://www.linkedin.com" className="text-reset">LinkedIn</a>
                  </p>
                </div>
                
        
               
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  
                  <h6 className="text-uppercase fw-bold mb-4">
                  <FormattedMessage id="linksUtiles"/>
                  </h6>
                  <p>
                    <a href="https://www.who.int/es/news-room/fact-sheets/detail/food-safety" className="text-reset"><FormattedMessage id="footAlimentos"/></a>
                  </p>
                  <p>
                    <a href="https://www.who.int/es/news-room/fact-sheets/detail/physical-activity" className="text-reset"><FormattedMessage id="footActividadFisica"/></a>
                  </p>
                  <p>
                    <a href="https://www.who.int/es/news-room/fact-sheets/detail/healthy-diet" className="text-reset"><FormattedMessage id="footDietas"/></a>
                  </p>
                  <p>
                    <a href="https://www.unicef.org/nutrition" className="text-reset"><FormattedMessage id="footNutricion"/></a>
                  </p>
                </div>
                
        
                
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
         
                  <h6 className="text-uppercase fw-bold mb-4">
                  <FormattedMessage id="footContacto"/>
                  </h6>
                  <p><i className="fas fa-home me-3"></i> Bogotá, Cra. 2 # 16a - 38, COL</p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>
                    info@nutrispecialist.com
                  </p>
                  <p><i className="fas fa-phone me-3"></i> + 57 314 299 34 09</p>
                  <p><i className="fas fa-print me-3"></i> + 57 315 923 23 56</p>
                </div>
                
              </div>
              
            </div>
          </section>
          
        
          
          <div className="text-center p-4">
            © 2021 Copyright:
            <a className="text-reset fw-bold" href="https://mdbootstrap.com/">Nutrispecialist.com</a>
          </div>
          
        </footer>
        </>
    );
}

export default Footer;