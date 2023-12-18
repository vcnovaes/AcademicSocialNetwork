// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import ConfirmationForm from './components/EmailConfirmationForm'
import LoginForm from './components/LoginForm'

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleUserSignUp = (email: string) => {
    // Set the user's email in the state when signing up
    setUserEmail(email);
  };
  const handleUserLogin = (email: string, password: string) => {
    // Handle login logic here
    console.log(`User logged in with email: ${email}, password: ${password}`);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <SignUpForm onSignUp={handleUserSignUp} />
            <LoginForm onLogin={handleUserLogin} />
          </div>} />
          {/* Pass handleUserSignUp as a callback to SignUpForm */}
        <Route path="/confirmation" element= {userEmail && <ConfirmationForm userEmail={userEmail}/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
