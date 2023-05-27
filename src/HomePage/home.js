import React from 'react';
import Navbar from '../NavBar/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioHome from '../Portfolio/PortfolioHome';
import MarketData from '../MarketData/MarketData';
import Home from '../home';
  
export default function HomePage() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/PortfolioHome' element={<PortfolioHome/>}></Route>
        <Route path='/MarketData' element={<MarketData/>}></Route>
      </Routes>
    </Router>
    </>
  );
}
  