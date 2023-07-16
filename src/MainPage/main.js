import React, { useEffect } from 'react';
import Navbar from './NavBar/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MarketData from './MarketData/MarketData';
import {auth} from "../config/firebase-config";
import { signOut } from 'firebase/auth';
import "./style.css";
import PortfolioManagement from './Portfolio/main';
import HomePage from './HomePage/HomePage';


export default function MainPage() {

  // handlers
  const handleSignOut = async () => {
    await signOut(auth);
    window.location.reload();
  }

  function RoutesWrapper() {
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
      if (location.pathname !== '/') {
        navigate('/');
      }
    }, []);

    return (
      <Routes>
        <Route exact path='/' element={<HomePage/>}></Route>
        <Route path='/Portfolio' element={<PortfolioManagement />}></Route>
        <Route path='/MarketData' element={<MarketData/>}></Route>
      </Routes>
    );
  }
    
  const renderMainPage = (
    <div className='main-page-container'>
      <Router>
          {Navbar(handleSignOut)}
          <RoutesWrapper />
      </Router>
    </div>
  );

  return (<>{renderMainPage}</>);
}
  