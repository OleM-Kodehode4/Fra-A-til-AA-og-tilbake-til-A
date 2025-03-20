import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const [message, setMessage] = useState('');

  const handleRegistration = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMessage('Registration successful! You can now log in.');
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {message && <p>{message}</p>}
      <RegisterForm onRegister={handleRegistration} />
    </div>
  );
};

export default RegisterPage;