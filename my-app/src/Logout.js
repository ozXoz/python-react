import React from 'react';
import { useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage or context
        localStorage.removeItem('token');

        // Optionally, add more logic on logout if necessary
        // like redirecting the user or updating the state

        alert('You have been logged out.');
        navigate('/');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
