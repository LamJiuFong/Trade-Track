import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/PortfolioHome' activeStyle>
            Portfolio
          </NavLink>
          <NavLink to='/MarketData' activeStyle>
            Market Data
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;