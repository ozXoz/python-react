import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/Login.module.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.access_token);
            alert('Login successful');
            navigate('/welcome');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage('Error: Could not connect to the server');
            }
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
}

export default Login;
