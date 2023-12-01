import React from 'react';
import Logout from './Logout'; // Import Logout component
import styles from './css/Welcome.module.css';

function Welcome() {
    return (
        <div className={styles.welcomeContainer}>
            <h1>Welcome</h1>
            <Logout /> {/* Include the Logout button */}
        </div>
    );
}

export default Welcome;
