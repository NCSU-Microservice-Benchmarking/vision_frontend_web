import './Header.mobile.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../media/images/logo.png'

import MountDisplay from './tools/MountDisplay';


const HeaderMobile = (props: any) => {

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  var navmenu = document.getElementById("nav-menu-mobile");
  var navbtn = document.querySelector(".nav-dropbtn-mobile");
  var footer = document.getElementById("footer");

  useEffect(() => {
    MountDisplay(true, undefined);
  }, []);


  const openMenu = () => {
    var body = document.getElementById("page-content");
    navbtn!.classList.remove('menu-closed');
    navbtn!.classList.add('menu-open');
    navmenu!.classList.remove("slide-out-menu");
    navmenu!.classList.add("slide-in-menu");
    navmenu!.classList.remove('hide-element');
    navmenu!.classList.add('show-blockelement');
    body!.classList.add("blur-effect");
    footer!.classList.add("blur-effect");
    body!.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
    setIsMenuOpen(true);
  }

  const closeMenu = () => {
    var body = document.getElementById("page-content");
    navbtn!.classList.remove('menu-open');
    navbtn!.classList.add('menu-closed');
    navmenu!.classList.remove("slide-in-menu");
    navmenu!.classList.add("slide-out-menu");
    setTimeout(function(){
      navmenu!.classList.remove('show-blockelement');
      navmenu!.classList.add("hide-element");
    }, 200); 
    body!.classList.remove("blur-effect");
    footer!.classList.remove("blur-effect");
    body!.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
    setIsMenuOpen(false);
  }

  const showNavigation = () => {
    if (!isMenuOpen){
      openMenu();
    } else {
      closeMenu();
    }
  }


  return (

    <div className="header-bar-mobile">

      <div className="logo-mobile" 
        onClick={() => {navigate('/'); closeMenu()}}
      >
        <img src={logo} height={"70%"}/>
        <div className="banner-text">
        </div>
      </div>

      <button className="nav-dropbtn-mobile menu-closed"
        onClick={showNavigation}
      ></button>

      <div id="nav-menu-mobile" className="hide-element slide-in-menu">

        <div id="small-seperator" style={{width: "100%", padding: "0"}}></div>

        <div className="menu-options-mobile">
          <ul style={{listStyleType: "none", padding: "0 0 0 2vh", marginTop: '20px', textAlign: "center"}}>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/" >Home</NavLink></li>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/docs">Docs</NavLink></li>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/about">About</NavLink></li>
          </ul>
        </div>

        <div className="bottom-panel-mobile">

        </div>

      </div>

    </div>
  );
}
 
export default HeaderMobile;