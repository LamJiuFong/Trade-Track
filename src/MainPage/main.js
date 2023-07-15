import React, { useState } from 'react';
import Navbar from './NavBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketData from './MarketData/MarketData';
import {auth} from "../config/firebase-config";
import { signOut } from 'firebase/auth';
import LoginPage from '../LoginAndRegister/loginPage/LoginPage';
import "./style.css";


export default function MainPage() {

  // states
  const [isSignedOut, setIsSignedOut] = useState(false);

  // handlers
  const handleSignOut = async () => {
    await signOut(auth);
    setIsSignedOut(true);
  }
    
  const renderMainPage = (
    <div className='main-page-container'>
      <Router>
          {Navbar(handleSignOut)}
          <Routes>
            <Route exact path='/' element={<HomePage/>}></Route>
            <Route path='/Portfolio' element={<PortfolioManagement />}></Route>
            <Route path='/MarketData' element={<MarketData/>}></Route>
          </Routes>
      </Router>
    </div>
  );

  return (
    <div> { isSignedOut
          ? <LoginPage />
          : <>{renderMainPage}</>
        }
    </div>
  );
}
  