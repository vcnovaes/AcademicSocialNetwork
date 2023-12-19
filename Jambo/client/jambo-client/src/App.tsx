// src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import ConfirmationForm from "./components/EmailConfirmationForm";
import LoginForm from "./components/LoginForm";
import Feed from "./components/Feed";
import { Navigate } from "react-router-dom";
import UserProfileForm from "./components/UserDataForm";

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  let isAuthenticated = document.cookie.includes("auth");
  console.log(isAuthenticated);
  const handleUserSignUp = (email: string) => {
    // Set the user's email in the state when signing up
    setUserEmail(email);
  };
  const handleUserLogin = (logged: boolean, navigate: NavigateFunction) => {
    // Handle login logic here
    isAuthenticated = true;
    navigate("/feed");
    console.log("user logged");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <SignUpForm onSignUp={handleUserSignUp} />
              <LoginForm onLogin={handleUserLogin} />
            </div>
          }
        />
        {/* Pass handleUserSignUp as a callback to SignUpForm */}
        <Route
          path="/confirmation"
          element={userEmail && <ConfirmationForm userEmail={userEmail} />}
        />
        <Route
          path="/feed"
          Component={() => (isAuthenticated ? <Feed /> : <Navigate to="/" />)}
        />
        <Route
          path="/user"
          Component={() =>
            isAuthenticated ? <UserProfileForm /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
