// src/components/LoginForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface LoginFormProps {
  onLogin: (loggedIn: boolean, navigate: NavigateFunction) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make a POST request to the login route
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        // Handle authentication failure (e.g., show an error message)
        console.error("Authentication failed");
        return;
      }
      console.log(response);
      // Extract the cookie from the response headers
      const cookieHeader = await response.text();
      console.log(cookieHeader);
      if (cookieHeader) {
        // Store the cookie in the browser
        document.cookie = `auth=${cookieHeader}`;
        onLogin(true, navigate);
      }

      alert("Login successful");
      // navigate("/feed");
      // Handle successful login (e.g., redirect to another page)
      console.log("Login successful");
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
    }
  };

  return (
    <div style={{ ...appContainerStyles, ...formRightContainerStyles }}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h2>Login</h2>
        <div style={formGroupStyles}>
          <label>
            Email:
            <input
              style={inputStyles}
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div style={formGroupStyles}>
          <label>
            Password:
            <input
              style={inputStyles}
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

const formStyles: React.CSSProperties = {
  borderRadius: "10px",
  padding: "20px",
  maxWidth: "300px",
  margin: "auto",
};

const formRightContainerStyles: React.CSSProperties = {
  marginRight: "50px", // Adjust the margin as needed
};

const formGroupStyles: React.CSSProperties = {
  marginBottom: "15px",
};

const inputStyles: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
const appContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
export default LoginForm;
