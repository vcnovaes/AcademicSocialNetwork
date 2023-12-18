// src/components/ConfirmationForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'

interface ConfirmationFormData {
  email: string;
  confirmationCode: string;
}

const ConfirmationForm: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [confirmationFormData, setConfirmationFormData] = useState<ConfirmationFormData>({
    email: userEmail,
    confirmationCode: '',
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const navigate = useNavigate()
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateForm();
    setConfirmationFormData({
      ...confirmationFormData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { confirmationCode } = confirmationFormData;
    const isFormValid = confirmationCode.trim() !== '';
    setIsFormValid(isFormValid);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form before submitting
    validateForm();

    if (!isFormValid) {
      console.log('Please enter a confirmation code before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmationFormData),
      });

      if (response.ok) {
        // If the response status is 200, handle success
        console.log('User confirmed successfully!');
         setIsSuccessModalOpen(true);
          alert("Registration completed with success")
          navigate( "/" )
        // Add your success handling logic here
      } else {
        console.error('Failed to confirm user:', response.statusText);
        alert("Something went wrong...")
        // Handle other status codes if needed
      }
    } catch (error) {
      console.error('Error during confirmation:', error);
      // Handle network errors or other issues
    }
  };

  return (
    <div className="App" style={appContainerStyles}>
      <h2 style={titleStyles}>Confirm Email</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div style={formGroupStyles}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={confirmationFormData.email}
              readOnly // Prevent user modification, as it's taken from the previous sign-up
              style={inputStyles}
            />
          </label>
        </div>
        <div style={formGroupStyles}>
          <label>
            Confirmation Code:
            <input
              type="text"
              name="confirmationCode"
              value={confirmationFormData.confirmationCode}
              onChange={handleChange}
              style={inputStyles}
            />
          </label>
        </div>
        <div style={formGroupStyles}>
          <button type="submit" style={{ ...submitButtonStyles, backgroundColor: isFormValid ? '#4caf50' : '#ddd' }} disabled={!isFormValid}>
            Confirm
          </button>
        </div>
      </form>
      <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
        <p>Confirmation Successful!</p>
      </Modal>
    </div>
  );
};

// Styles (reuse styles from SignUpForm)
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

// Reuse appContainerStyles and titleStyles from SignUpForm
const appContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const titleStyles: React.CSSProperties = {
  marginBottom: '20px', // Adjust as needed
};

export default ConfirmationForm;
