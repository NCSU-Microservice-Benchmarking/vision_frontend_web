import './Footer.css';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import ncsu from '../../media/images/ncsu.png';

const Footer = () => {

  return (
    <div id="footer">

      <div id="seperator" style={{height: '1px'}}></div>
      
      <div id="footer-container"> 

        <div className="footer-links">
          <li><NavLink to="/mission/">Collaborats</NavLink></li>
          <li><NavLink to="/partners">NCSU CSC</NavLink></li>
        </div>

        <div className="footer-text"> 
          <h1>This was built at North Carolina State University.</h1>
          <hr/>
          <div id="footer-credits">
            <h2>powered by</h2>
            {<img className="sponsor-logo" alt="CauseClosed" style={{borderRadius: '5px', margin: '0 6px 0px 6px'}} height="100%" src={ncsu} />}
          </div>
        </div>
        
      
       

        <div className="footer-icons">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" className="fa fa-facebook"/> 
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" className="fa fa-facebook"/> 
          </a>
          <a href="https://www.instagram.com/kagwave" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x"  className="fa fa-instagram"/> 
          </a>
        </div>

      </div>
    </div>
  );
}
 
export default Footer;