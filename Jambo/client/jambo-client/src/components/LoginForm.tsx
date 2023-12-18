// src/components/LoginForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate and handle the login
    onLogin(loginData.email, loginData.password);
  };

  return (
    <div style={{ ...appContainerStyles, ...formRightContainerStyles }}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h2>Login</h2>
        <div style={formGroupStyles}>
          <label>
            Email:
            <input style={inputStyles} type="email" name="email" value={loginData.email} onChange={handleChange} />
          </label>
        </div>
        <br />
        <div style={formGroupStyles}>
          <label>
            Password:
            <input style={inputStyles} type="password" name="password" value={loginData.password} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

const formStyles: React.CSSProperties = {
  borderRadius: '10px',
  padding: '20px',
  maxWidth: '300px',
  margin: 'auto',
};

const formRightContainerStyles: React.CSSProperties = {
  marginRight: '50px', // Adjust the margin as needed
};

const formGroupStyles: React.CSSProperties = {
  marginBottom: '15px',
};

const inputStyles: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};
const appContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
export default LoginForm;
