import './Header.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { serverUrl } from '../../utils/urls';
import logo from '../../media/images/logo.png'
import { NavLink } from 'react-router-dom';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (props: any) => {

  
  let lastScrollTop = 0;

//Init
  useEffect(() => {
    let handler = function () {
      let header = document.getElementById("header");
      if (header !== null) {
        let scrollTop = window.pageYOffset;
        if (lastScrollTop < scrollTop) {
          header.classList.remove('show-header');
          header.classList.add('hide-header');
        } else {
          header.classList.remove('hide-header');
          header.classList.add('show-header');
        }
        lastScrollTop = scrollTop;

      } else {
        return;
      }
    }
    document.addEventListener("scroll", handler, true);

    return () => {
      document.removeEventListener("scroll", handler);
    }
  }, []);

  return ( 
    <div id="header">
    
      <div className="banner-container">
        <img src={logo} height={"70%"}/>
        <div className="banner-text">
          <h1>
            Image Analyzer
          </h1>
        </div>
      </div>

      <Navbar/>

    </div>
  );
}

export default Header;



const Navbar = ()  => {
  return (
    <nav className="navbar">

      <div className="menuoptions">

        <NavLink className="navlink" to="/">Home</NavLink>
        <NavLink className="navlink" to="/docs">Docs</NavLink>
        <NavLink className="navlink" to="/about">About</NavLink>

      </div>
    </nav>
  )
 
}