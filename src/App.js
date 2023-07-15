import LoginPage from './LoginAndRegister/loginPage/LoginPage';
import React from 'react';
import { TemporaryModelProvider } from './TempModel/TempModelContext';


function App() {
  return (
    <div>
      <TemporaryModelProvider>
        <LoginPage />
      </TemporaryModelProvider>
    </div>
  )
}

// test

export default App;
