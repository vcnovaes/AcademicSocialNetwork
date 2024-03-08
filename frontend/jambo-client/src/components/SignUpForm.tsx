// src/components/SignUpForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignUpFormProps {
  onSignUp: (email: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ( { onSignUp } ) => {
  const navegate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateForm()
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, password } = formData;
    const isFormValid = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && password.trim() !== '';
    setIsFormValid(isFormValid);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form before submitting
    validateForm();

    if (!isFormValid) {
      console.log('Please fill in all fields before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the response status is 200, redirect the user to the email confirmation form
        console.log('User registered successfully!');
        onSignUp(formData.email);
        navegate("/confirmation")
        // Add your redirection logic here
      } else {
        console.error('Failed to register user:', response.statusText);
        // Handle other status codes if needed
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle network errors or other issues
    }
  };

  return (
    <div className="App" style={appContainerStyles}>
      <h2 style={titleStyles}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div style={formGroupStyles}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={inputStyles}
            />
          </label>
        </div>
        <div style={formGroupStyles}>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={inputStyles}
            />
          </label>
        </div>
        <div style={formGroupStyles}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyles}
            />
          </label>
        </div>
        <div style={formGroupStyles}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyles}
            />
          </label>
        </div>
        <div style={formGroupStyles}>
          <button type="submit" style={{ ...submitButtonStyles, cursor :isFormValid ? "auto": "not-allowed" , backgroundColor: isFormValid ? '#4caf50' : '#83d6b8' }} disabled={!isFormValid}>
           Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};


// Styles
const formStyles: React.CSSProperties = {
  borderRadius: '10px',
  padding: '20px',
  maxWidth: '300px',
  margin: 'auto',
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

const submitButtonStyles: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#4caf50',
  color: '#fff',
  cursor: 'pointer',
};
// Styles
const appContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const titleStyles: React.CSSProperties = {
  marginBottom: '20px', // Adjust as needed
};
export default SignUpForm;
