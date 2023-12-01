import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/Signup.module.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', { username, password });
      console.log(response.data);
      // Redirect to login page or show success message
    } catch (error) {
      console.error('Signup error', error.response.data);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSignup} className={styles.form}>
        <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            className={styles.inputField}
        />
        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>Sign Up</button>
    </form>
);
};

export default Signup;
