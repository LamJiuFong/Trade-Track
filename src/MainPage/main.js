import React, { useState } from 'react';
import Navbar from './NavBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioHome from './Portfolio/PortfolioHome';
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
    

  return (
    <div className='app'> 
    {
      isSignedOut
      ? <LoginPage />
      : <Router>
          <Navbar />
            <button onClick={handleSignOut} className='signOutButton'>
              Sign Out
            </button>
          <Routes>
            <Route path='/' element={<PortfolioHome/>}></Route>
            <Route path='/MarketData' element={<MarketData/>}></Route>
          </Routes>
        </Router>
    }
    </div>
  );
}
  