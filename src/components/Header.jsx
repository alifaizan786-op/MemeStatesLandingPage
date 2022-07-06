import React, { Component } from "react";
import { Link } from "react-router-dom";  
import logoDark from "../assets/images/resources/logo-dark.png";
import logo from "../assets/images/logo/Asset 5@300x.png"

export default function Header() {
  const [navOpen, setNavOpen] = React.useState(false);

  const handleOpenNav = () => {
    const navBtnBarTop = document.querySelector("#navBtnBarTop")
    const navBtnBarBtm = document.querySelector("#navBtnBarBtm")
    const fullscreenNav = document.querySelector(".fullscreenNav") 
    if (navOpen === false) {
      navBtnBarTop.setAttribute("style" , "transform: rotate(45deg) translateY(5.5px);");
      navBtnBarBtm.setAttribute("style" , "transform: rotate(-45deg) translateY(-8px) translateX(2px);");
      fullscreenNav.setAttribute("style", "height:100vh; opacity:1; padding:100px")
      setNavOpen(true)
    }else{
      navBtnBarTop.setAttribute("style" , "transform: none;");
      navBtnBarBtm.setAttribute("style" , "transform: none;");
      fullscreenNav.setAttribute("style", "height:0vh; opacity:0; padding:0px")
      setNavOpen(false)
    }
  };

  return (
    <>
      <header className="header">
        <div className="left">
          <button className="navBtn" onClick={handleOpenNav}>
            <div id="navBtnBarTop"></div>
            <div id="navBtnBarBtm"></div>
          </button>
        </div>
        <div className="center">
          <img src={logo} alt="" srcset="" />
        </div>
        <div className="right">
          {/* Empty Space */}
        </div>
      </header>
      <nav className="fullscreenNav">
        <div className="navLinks">
          <a href="#home">
            <h1>
              Home
            </h1>
          </a>
          <a href="#home">
            <h1>
              About Us
            </h1>
          </a>
          <a href="#home">
            <h1>
              Feature
            </h1>
          </a>
          <a href="#home">
            <h1>
              Why Meme States ?
            </h1>
          </a>
        </div>
      </nav>
    </>
  );
}
