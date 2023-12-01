import React from 'react';
import Logout from './Logout'; // Import Logout component

function Welcome() {
    return (
        <div>
            <h1>Welcome</h1>
            <Logout /> {/* Include the Logout button */}
        </div>
    );
}

export default Welcome;
