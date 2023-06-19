import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="bars"></div>
      <div className="nav-menu">
        <NavLink to="/" className="nav-link" activeClassName="active">
          Portfolio
        </NavLink>
        <NavLink to="/MarketData" className="nav-link" activeClassName="active">
          Market Data
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
