import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Navbar = (handleSignOut) => {
  return (
    <div className="navbar-container">
      <div className="nav-container">
        <nav className="nav">
          <div className="nav-menu">
            <NavLink to="/" className="nav-link" activeClassName="active">
              Portfolio
            </NavLink>
            <NavLink to="/MarketData" className="nav-link" activeClassName="active">
              Market Data
            </NavLink>
          </div>
        </nav>
      </div>
      <div className="navbar-title">
        Trade Track
      </div>
      <div className="sign-out-button-container">
        <NavLink to="/" onClick={handleSignOut}>
          <button className='sign-out-button'>
            Sign Out
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
